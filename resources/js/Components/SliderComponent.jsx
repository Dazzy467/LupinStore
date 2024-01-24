import { useEffect, useState } from "react"
import React from "react";
export default function SliderComponent({children, className = '',stateSelect,LBtnClass,RBtnClass,ContentClass, ...props}) {
    const [index, setIndex] = useState(0);
    useEffect(() => stateSelect(React.Children.toArray(children)[index].props.children),[index]);
    const handleNext = () => {
        setIndex((prevIndex) => prevIndex + 1 < React.Children.count(children) ? prevIndex + 1 : 0);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => prevIndex - 1 >= 0 ? prevIndex - 1 : React.Children.count(children) - 1);
    };

    return (
        
        <div {...props} className={"flex " + className}>
            <button onClick={handlePrev} className={"p-1 rounded-s " + LBtnClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-chevron-left"} viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </button>

            <div className={"p-1 text-center w-[100%] " + ContentClass}>
                {React.Children.toArray(children)[index]}
            </div>

            <button onClick={handleNext} className={"p-1 rounded-e " + RBtnClass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        </div>

        
    )
}
