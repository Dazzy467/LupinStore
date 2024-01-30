import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from "react-table";
import LupinNavbar from "@/Layouts/LupinNavbar";
import jQuery from "jquery";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PaginatedTable from "@/Components/PaginatedTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Edit from "../Profile/Edit";

export default function Dashboard({ auth, kategori, barang, success }) {
    console.log(barang);
    const [showAddModal, setShowAddModal] = useState(false);
    const [EditModal, setShowEditModal] = useState({ show: false, rowData: null });
    const [DeleteModal,setShowDelModal] = useState({ show:false,rowID:1});

    const { data, setData: setDataBrg, post, processing, errors, reset } = useForm({
        namaBarang: '',
        stokBarang: '',
        hargaBarang: '',
        Kategori: 1,
        img: null,
    });

    useEffect(() => {
        reset()
    }, [])

    useEffect(() => {
        if (EditModal.show) {
            console.log("RowData: " + EditModal.rowData);

            setDataBrg((prevData) => ({
                ...prevData,
                namaBarang: EditModal.rowData?.namaBarang,
                stokBarang: EditModal.rowData?.stokBarang,
                hargaBarang: EditModal.rowData?.hargaBarang,
                Kategori: EditModal.rowData?.Kategori,
            }));
        }

    }, [EditModal.show, EditModal.rowData])

    const onAddbarangSubmit = (e) => {
        e.preventDefault();
        console.log(data.namaBarang);
        console.log(data.hargaBarang);
        console.log(data.stokBarang);
        console.log(data.img);
        console.log(data.Kategori);
        post(route('barang.store'), {
            onSuccess: () => {
                console.log(success)
            }
        });
        setShowAddModal(false);
    };

    const onEditBarangSubmit = (e) => {
        e.preventDefault();
        post(route('barang.update', EditModal.rowData.id), {
            onSuccess: () => {
                console.log(success)
            }
        });
        setShowEditModal({ show: false, rowData: null });
    }

    const onDeleteBarang = async () => {
        const token = document.head.querySelector('meta[name="csrf-token"]').content;
        const requestConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify({
                id: DeleteModal.rowID
            })
        }

        // await fetch('barang/del',requestConfig).then(
        //     async response => {
        //         const data = await response.json();
        //         console.log(data);
        //     }
        // )
        await fetch('barang/del',requestConfig);
        setShowDelModal({show:false,rowID:1});
    }

    // Kolom tabel disini
    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, i) => {
                    return i + 1
                },
            },
            {
                Header: 'Gambar',
                accessor: (row) => {
                    return (
                        <div className="flex items-center justify-center w-[100px] h-[100px] overflow-hidden bg-slate-500 text-center rounded">
                            {/* Contoh gambar */}
                            <img src={"/storage/images/" + row.id + "/" + row.img_path} className="object-cover object-center h-[100%]" alt="" />

                        </div>
                    )
                }
            },
            {
                Header: 'Barang',
                accessor: 'namaBarang',
            },
            {
                Header: 'Kategori',
                accessor: (row) => {
                    const category = kategori.find((item) => item.id === row.Kategori);
                    return category ? category.Kategori : '';
                },
            },
            {
                Header: 'Harga',
                accessor: 'hargaBarang',

            },
            {
                Header: 'Stok',
                accessor: 'stokBarang',
            },
            {
                Header: 'Aksi',
                accessor: (row) => {
                    return (

                        <div className="flex justify-center gap-5">

                            <button className="text-red-500" onClick={()=> {
                                setShowDelModal({show:true,rowID: row.id});
                            }}><FontAwesomeIcon icon={faTrash} /></button>
                            <button className="text-blue-500" onClick={() => {
                                setShowEditModal({ show: true, rowData: row });
                            }}><FontAwesomeIcon icon={faPen} /></button>
                        </div>
                    )
                }
            }
        ],
        []
    );

    return (
        <div className="h-[100vh]">
            <Head title="Admin dashboard" />
            <LupinNavbar className={"bg-blue-400"}>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Dashboard
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Manajemen barang
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Manajemen user
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Profile
                </Link>
                <Link method="post" href={route('admin.logout')} className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Logout
                </Link>
            </LupinNavbar>
            <div className="pt-[6rem] pb-[2rem] bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    Selamat datang {
                        auth.user.name

                    }
                    <div className="rounded bg-slate-300 p-2">
                        <PaginatedTable columns={columns} data={barang} />
                        <Modal show={showAddModal} maxWidth="md" onClose={() => setShowAddModal(false)}>
                            {/* Exit button */}
                            <div className="flex justify-end p-2 border-b-[1px]">
                                <button onClick={() => setShowAddModal(false)} className="rounded-[100%] w-[1.5rem] h-[1.5rem] flex items-center justify-center shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-gray-200">
                                    x
                                </button>
                            </div>
                            {/* Title */}
                            <div className="font-sans font-extrabold text-center text-2xl">
                                Tambah item
                            </div>
                            {/* Content */}
                            <form method="post" onSubmit={onAddbarangSubmit}>
                                <div className="flex flex-col gap-5 p-5 border-b-[1px]">
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="namaBarang" className="w-1/2" value={"Nama barang:"} />
                                        <TextInput
                                            required
                                            id="namaBarang"
                                            name="namaBarang"
                                            type="text"
                                            className="w-2/3"
                                            onChange={(e) => setDataBrg('namaBarang', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="hargaBarang" className="w-1/2" value={"Harga barang:"} />
                                        <TextInput
                                            required
                                            id="hargaBarang"
                                            name="hargaBarang"
                                            type="number"
                                            className="w-2/3"
                                            onChange={(e) => setDataBrg('hargaBarang', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="stokBarang" className="w-1/2" value={"Stok barang:"} />
                                        <TextInput
                                            required
                                            id="stokBarang"
                                            name="stokBarang"
                                            type="number"
                                            className="w-2/3"
                                            onChange={(e) => setDataBrg('stokBarang', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="kategori" className="w-1/2" value={"Kategori:"} />
                                        <select
                                            id="Kategori"
                                            name="Kategori"
                                            className="rounded-lg w-2/3 border-slate-300"
                                            onChange={(e) => setDataBrg('Kategori', e.target.value)}
                                        >
                                            {
                                                kategori.map((item) =>
                                                    <option key={item.id} value={item.id}>
                                                        {item.Kategori}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <InputLabel htmlFor="img" className="w-1/2" value={"Gambar:"} />

                                        <input onChange={(e) =>
                                            setDataBrg('img', e.target.files[0])
                                        } required id="img" name="img" type="file" className="border border-slate-300 p-2 rounded-lg focus:outline-none w-2/3" />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end p-2">
                                    <div className="flex gap-5 pe-3">
                                        <button className="p-2 w-[100px] rounded-lg text-blue-400 shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-slate-200 font-extrabold" type="submit">
                                            Tambah
                                        </button>
                                        <button type="button" className="bg-red-400 hover:bg-red-500/90 p-2 w-[100px] rounded-lg text-white font-extrabold" onClick={() => {
                                            setShowAddModal((b) => b = !b)
                                        }}>
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </Modal>
                        {
                            EditModal.show && (
                                <Modal show={EditModal.show} maxWidth="md" onClose={() => setShowEditModal({ show: false, rowData: null })}>
                                    {/* Exit button */}
                                    <div className="flex justify-end p-2 border-b-[1px]">
                                        <button onClick={() => setShowEditModal({ show: false, rowData: null })} className="rounded-[100%] w-[1.5rem] h-[1.5rem] flex items-center justify-center shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-gray-200">
                                            x
                                        </button>
                                    </div>
                                    {/* Title */}
                                    <div className="font-sans font-extrabold text-center text-2xl">
                                        Edit item
                                    </div>
                                    {/* Content */}
                                    <form method="post" onSubmit={onEditBarangSubmit}>
                                        <div className="flex flex-col gap-5 p-5 border-b-[1px]">
                                            <div className="flex items-center">
                                                <InputLabel htmlFor="namaBarang" className="w-1/2" value={"Nama barang:"} />
                                                <TextInput
                                                    required
                                                    id="namaBarang"
                                                    name="namaBarang"
                                                    type="text"
                                                    className="w-2/3"
                                                    value={data.namaBarang || ''}
                                                    onChange={(e) => setDataBrg('namaBarang', e.target.value || '')}
                                                />
                                            </div>

                                            <div className="flex items-center">
                                                <InputLabel htmlFor="hargaBarang" className="w-1/2" value={"Harga barang:"} />
                                                <TextInput
                                                    required
                                                    id="hargaBarang"
                                                    name="hargaBarang"
                                                    type="number"
                                                    className="w-2/3"
                                                    value={data.hargaBarang || ''}
                                                    onChange={(e) => setDataBrg('hargaBarang', e.target.value)}
                                                />
                                            </div>

                                            <div className="flex items-center">
                                                <InputLabel htmlFor="stokBarang" className="w-1/2" value={"Stok barang:"} />
                                                <TextInput
                                                    required
                                                    id="stokBarang"
                                                    name="stokBarang"
                                                    type="number"
                                                    className="w-2/3"
                                                    value={data.stokBarang || ''}
                                                    onChange={(e) => setDataBrg('stokBarang', e.target.value)}
                                                />
                                            </div>

                                            <div className="flex items-center">
                                                <InputLabel htmlFor="kategori" className="w-1/2" value={"Kategori:"} />
                                                <select
                                                    id="Kategori"
                                                    name="Kategori"
                                                    className="rounded-lg w-2/3 border-slate-300"
                                                    value={data.Kategori}
                                                    onChange={(e) => setDataBrg('Kategori', e.target.value)}
                                                >
                                                    {
                                                        kategori.map((item) =>
                                                            <option key={item.id} value={item.id}>
                                                                {item.Kategori}
                                                            </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            {/* <div className="flex items-center">
                                                <InputLabel htmlFor="img" className="w-1/2" value={"Gambar:"} />

                                                <input onChange={(e) =>
                                                    setDataBrg('img', e.target.files[0])
                                                } required id="img" name="img" type="file" className="border border-slate-300 p-2 rounded-lg focus:outline-none w-2/3" />
                                            </div> */}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex justify-end p-2">
                                            <div className="flex gap-5 pe-3">
                                                <button className="p-2 w-[100px] rounded-lg text-blue-400 shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-slate-200 font-extrabold" type="submit">
                                                    Edit
                                                </button>
                                                <button type="button" className="bg-red-400 hover:bg-red-500/90 p-2 w-[100px] rounded-lg text-white font-extrabold" onClick={() => {
                                                    setShowEditModal({ show: false, rowData: null })
                                                }}>
                                                    Batal
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </Modal>
                            )
                        }
                        {
                            DeleteModal.show && (
                                <Modal show={DeleteModal.show} maxWidth="md" onClose={()=>setShowDelModal({show:false,rowID:1})}>
                                    {/* Exit button */}
                                    <div className="flex justify-end p-2 border-b-[1px]">
                                        <button onClick={()=>setShowDelModal({show:false,rowID:1})} className="rounded-[100%] w-[1.5rem] h-[1.5rem] flex items-center justify-center shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-gray-200">
                                            x
                                        </button>
                                    </div>
                                    {/* Title */}
                                    <div className="font-sans font-extrabold text-center text-2xl">
                                        Apakah anda yakin untuk menghapus item ini?
                                    </div>
                                    <div className="flex flex-row justify-center gap-5 p-5 border-b-[1px]">
                                        <button onClick={onDeleteBarang} className="bg-red-500/95 hover:bg-red-500 text-white w-[100px] rounded-lg p-2">Hapus <FontAwesomeIcon icon={faTrash}/></button>
                                        <button onClick={()=>setShowDelModal({show:false,rowID:1})} className="p-2 w-[100px] rounded-lg text-blue-400 shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-slate-200 font-extrabold">
                                            Batal
                                        </button>
                                    </div>
                                </Modal>
                            )
                        }
                        <button className="mt-5 bg-blue-500 hover:bg-blue-600 p-2 rounded text-white font-extrabold" onClick={() => {
                            setShowAddModal((b) => b = !b)
                        }}>
                            Tambah barang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}