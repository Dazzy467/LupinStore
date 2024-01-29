export default function ItemComponent({item,kategori,className})
{
    const fKategori = kategori.find((it) => it.id === item.Kategori);
    return (
        <>
            <div className={"rounded bg-white w-[120px] " + className}>
                <div className="flex items-center justify-center w-auto h-[100px] overflow-hidden bg-slate-500 text-center rounded">
                    {/* Contoh gambar */}
                    <img src={"/storage/images/"+item.id+"/"+item.img_path} className="object-cover object-center h-[100%]" alt="" />
                </div>
                <div className="flex flex-col p-1">
                    <div className="font-bold overflow-auto">
                        {item.namaBarang}
                    </div>
                    <div className="" style={{fontSize:"0.8rem"}}>
                        Rp.{item.hargaBarang.toLocaleString()}
                    </div>
                    <div style={{fontSize:"0.8rem"}}>
                        {
                            fKategori? fKategori.Kategori : 'any'
                        }
                    </div>
                </div>

            </div>
        </>
    )
}