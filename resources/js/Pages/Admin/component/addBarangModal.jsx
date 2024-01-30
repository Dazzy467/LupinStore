import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
export default function addBarangModal({show,maxWidth,onClose}) {
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

    return (
        <Modal show={show} maxWidth={maxWidth} onClose={onClose}>
            {/* Exit button */}
            <div className="flex justify-end p-2 border-b-[1px]">
                <button onClick={onClose} className="rounded-[100%] w-[1.5rem] h-[1.5rem] flex items-center justify-center shadow-[0_1px_5px_0_rgba(0,0,0,0.3)] hover:bg-gray-200">
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
                            setShowModal((b) => b = !b)
                        }}>
                            Batal
                        </button>
                    </div>
                </div>
            </form>

        </Modal>
    )
}