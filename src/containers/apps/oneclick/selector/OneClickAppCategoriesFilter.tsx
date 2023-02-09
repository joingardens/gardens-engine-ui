import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useState } from "react";
import { OneClickContextValue, useOneClickAppsContext } from '../context/OneClickContext';



export const OneClickAppCategorySelector: React.FC = () => {

    const { categories, catsState, handleCategoryToggle } = useOneClickAppsContext()

    return (
        <div className={`flex flex-col`}>
            {Object.entries(categories).map(([category, subcats]) => {
                return (
                    <OneClickAppDropdown
                        category={category}
                        subcats={subcats}
                        catsState={catsState}
                        toggleCats={handleCategoryToggle}
                    />
                )
            })}
        </div>
    )
}

type OneClickAppDropdownProps = {
    category: keyof OneClickContextValue["categories"],
    subcats: OneClickContextValue["categories"][keyof OneClickContextValue["categories"]]
    catsState: string[],
    toggleCats: (arg: string) => any

}



export const OneClickAppDropdown: React.FC<OneClickAppDropdownProps> = ({ category, subcats, catsState, toggleCats }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */)

    const toggleDropdown = () => {
        return setIsOpen(!isOpen)
    }

    if (subcats.length > 1) {
        return (
            <div>
                <div>
                    <div className="py-2 flex w-full shadow border 
        rounded-full hover:bg-green-100 cursor-pointer my-2"
                        onClick={() => toggleDropdown()}>
                        <div className="w-1/4 text-center">
                            <span className="text-sm">{isOpen ? ("▽") : ("▷")}</span>
                        </div>
                        <div className="w-3/4">
                            <span>{category}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`
                                transform-gpu duration-500 origin-top-left
                                ${isOpen ? "opacity-100" : "opacity-0 h-0"}
                                `}
                    ref={parent} >
                    {isOpen ? subcats.map(subcat => {
                        return (
                            <div
                                onClick={() => {
                                    toggleCats(subcat)
                                }}
                                className={`
                            p-0.5 pl-2 cursor-pointer w-full 
                            ${catsState.includes(subcat) ? "font-bold text-blue-400" : "hover:text-blue-300"}
                            `}
                            >
                                {subcat}
                            </div>
                        )
                    }) : <></>}
                </div>
            </div>
        )
    }
    return <></>

}