import { Head,Link,useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState} from "react";
import { useTable,useFilters, useGlobalFilter } from "react-table";
import LupinNavbar from "@/Layouts/LupinNavbar";
import jQuery from "jquery";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

export default function Dashboard({auth,kategori,barang,success})
{
    console.log(barang)
    const [showModal,setShowModal] = useState(false);
    const { data, setData:setDataBrg, post, processing, errors, reset } = useForm({
        namaBarang: '',
        stokBarang: '',
        hargaBarang: '',
        Kategori: 1,
        img: null,
    });

    const onAddbarangSubmit = (e) => {
        e.preventDefault();
        console.log(data.namaBarang);
        console.log(data.hargaBarang);
        console.log(data.stokBarang);
        console.log(data.img);
        console.log(data.Kategori);
        post(route('barang.store'),{
            onSuccess:()=>{
                console.log(success)
            }
        });

    };
      // Use react-table and react-table useFilters hooks

      const columns = useMemo(
        () => [
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
          }
        ],
        []
      );
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        } = useTable(
        {   
            columns,
            data: barang,
        },
        useFilters, // Enable filters
        useGlobalFilter
    );
    const {globalFilter} = state;
    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    //     { columns, data: barang },
    //     useFilters
    //   );

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
                        {/* Use the react-table props */}
                                    {/* Global search input */}
                        <input
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Cari"
                        className="p-2 mb-2 rounded-lg border border-slate-300 focus:outline-none"
                        />
                        <table {...getTableProps()} className="w-[100%]">
                            <thead className="bg-slate-700">
                                {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} className="font-sans font-bold text-left text-white ps-2">
                                        {column.render('Header')}
                                        {/* {column.canFilter ? <div>{column.render('Filter')}</div> : null} */}
                                    </th>
                                    ))}
                                </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="odd:bg-white even:bg-slate-300">
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()} className="ps-2">
                                        {cell.render('Cell')}
                                        </td>
                                    ))}
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                        <Modal show={showModal} maxWidth="md" onClose={() => setShowModal(false)}>
                            {/* Exit button */}
                            <div className="flex justify-end p-2 border-b-[1px]">
                                <button onClick={() => setShowModal(false)} className="rounded-[100%] w-[1.5rem] h-[1.5rem] flex items-center justify-center shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-gray-200">
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
                                        <InputLabel htmlFor="namaBarang" className="w-1/2" value={"Nama barang:"}/>
                                        <TextInput
                                            required 
                                            id="namaBarang"
                                            name="namaBarang"
                                            type="text"
                                            className="w-2/3"
                                            onChange={(e)=>setDataBrg('namaBarang',e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="hargaBarang" className="w-1/2" value={"Harga barang:"}/>
                                        <TextInput
                                            required 
                                            id="hargaBarang"
                                            name="hargaBarang"
                                            type="number"
                                            className="w-2/3"
                                            onChange={(e)=>setDataBrg('hargaBarang',e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="stokBarang" className="w-1/2" value={"Stok barang:"}/>
                                        <TextInput 
                                            required
                                            id="stokBarang"
                                            name="stokBarang"
                                            type="number"
                                            className="w-2/3"
                                            onChange={(e)=>setDataBrg('stokBarang',e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <InputLabel htmlFor="kategori" className="w-1/2" value={"Kategori:"}/>
                                        <select 
                                            id="Kategori"
                                            name="Kategori"
                                            className="rounded-lg w-2/3 border-slate-300"
                                            onChange={(e)=>setDataBrg('Kategori',e.target.value)}
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
                                        <InputLabel htmlFor="img" className="w-1/2" value={"Gambar:"}/>

                                        <input onChange={(e)=>
                                            setDataBrg('img',e.target.files[0])
                                        } required id="img" name="img" type="file" className="border border-slate-300 p-2 rounded-lg focus:outline-none w-2/3"/>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end p-2">
                                    <div className="flex gap-5 pe-3">
                                    <button className="p-2 w-[100px] rounded-lg text-blue-400 shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-slate-200 font-extrabold" type="submit">
                                        Tambah
                                    </button>
                                    <button type="button" className="bg-red-400 hover:bg-red-500/90 p-2 w-[100px] rounded-lg text-white font-extrabold" onClick={() => {
                                        setShowModal((b) => b = !b)}}>
                                        Batal
                                    </button>
                                    </div>
                                </div>
                            </form>

                        </Modal>
                        <button className="mt-5 bg-blue-400 p-2 rounded text-white font-extrabold" onClick={() => {
                            setShowModal((b) => b = !b)}}>
                            Tambah barang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}