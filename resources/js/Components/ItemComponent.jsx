export default function ItemComponent({item})
{
    return (
        <>
            <div className="mb-2 me-2 rounded bg-white">
                <div className="flex items-center justify-center w-auto h-[100px] bg-slate-500 text-center rounded">
                    Contoh gambar
                </div>
                <div className="flex flex-col p-1">
                    <div className="font-bold">
                        Nama barang
                    </div>
                    <div className="" style={{fontSize:"0.8rem"}}>
                        Rp.50000,00
                    </div>
                    <div className="" style={{fontSize:"0.8rem"}}>
                        ganci
                    </div>
                </div>

            </div>
        </>
    )
}