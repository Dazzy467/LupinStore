import { Head,Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from "react";
import SliderComponent from "@/Components/SliderComponent";
import LupinNavbar from "@/Layouts/LupinNavbar";
import ItemComponent from "@/Components/ItemComponent";
import LupinFooter from "@/Layouts/LupinFooter";


export default function Home({auth,barang,kategori})
{
    const category = kategori.map(
        (el) => el.Kategori
    );
    const [selectedCat,setSelectedCat] = useState('Ganci');
    const catSelect = (child) => {
        setSelectedCat(child)
    };

    const [catIndexSelected, setCatIndex] = useState(1);
    
    useEffect(()=>{
        const tempKat = kategori.find((item)=> item.Kategori === selectedCat)
        setCatIndex(tempKat.id);
    },[selectedCat]);
    return (
        <div className="bg-slate-700 h-[100vh]">
            <Head title="Home" />
            <LupinNavbar className={"bg-blue-400"}>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Home
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Category
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Search
                </Link>
                <Link className="md:hover:text-blue-100 max-md:hover:text-blue-400">
                    Profile
                </Link>
            </LupinNavbar>
            <div className="pt-[6rem] pb-[2rem] bg-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                <SliderComponent id={"Cat-Slider"} stateSelect={catSelect} 
                LBtnClass={"bg-slate-500 hover:bg-slate-600 rounded-s text-white"}
                RBtnClass={"bg-slate-500 hover:bg-slate-600 rounded-e text-white"}
                ContentClass={"bg-blue-400 text-white font-sans font-bold"}
                >
                    {
                        category.map((item) => 
                            <div key={item}>
                                {item}
                            </div>
                        )
                    }
                </SliderComponent>

                <div id="items-container" className="flex flex-wrap p-5 gap-2 bg-slate-300 rounded">
                    {
                        barang.map(
                            (item,i) =>
                            <ItemComponent key={i} item={item} kategori={kategori} className={
                                (catIndexSelected === item.Kategori)? 'visible' : 'hidden'
                            }/>
                        )
                    }
                </div>

                </div>
            </div>
            <LupinFooter className={"bg-slate-700"}/>
        </div>
    )

}