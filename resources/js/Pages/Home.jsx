import { Head,Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect, useState } from "react";
import SliderComponent from "@/Components/SliderComponent";
import LupinNavbar from "@/Layouts/LupinNavbar";
import ItemComponent from "@/Components/ItemComponent";


export default function Home({auth,kategori})
{

    const category = kategori.map(
        (el) => el.Kategori
    );
    const [selectedCat,setSelectedCat] = useState()
    const catSelect = (child) => {
        setSelectedCat(child)
    };
    return (
        <>
            <Head title="Home" />
            <LupinNavbar/>
            <div className="pt-[6rem] pb-[6rem]">
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
                Selected: {selectedCat}

                <div id="items-container" className="flex flex-wrap p-5 bg-slate-300 rounded">
                    {
                        Array.from({length: 20}, (_,i) => <ItemComponent/>)
                    }
                </div>

                </div>
            </div>
        </>
    )

}