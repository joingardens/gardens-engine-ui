import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useState } from "react";

interface CategorySelectorProps {
    categories: Record<string, string[]>
    catsState: string[],
    toggleCats: (arg: string) => any
}


export const OneClickAppCategorySelector: React.FC<CategorySelectorProps> = ({ categories, catsState, toggleCats }) => {



    return (
        <div className={`grid grid-cols-4 gap-2`}>
            {Object.entries(categories).map(([category, subcats]) => {
                return (
                    <OneClickAppDropdown
                        category={category}
                        subcats={subcats}
                        catsState={catsState}
                        toggleCats={toggleCats}
                    />
                )
            })}
        </div>
    )
}

type OneClickAppDropdownProps = {
    category: keyof CategorySelectorProps["categories"],
    subcats: CategorySelectorProps["categories"][keyof CategorySelectorProps["categories"]]
    catsState: string[],
    toggleCats: (arg: string) => any

}

const DropdownStates = {
    OPEN: true,
    CLOSED: false
} as const


export const OneClickAppDropdown: React.FC<OneClickAppDropdownProps> = ({ category, subcats, catsState, toggleCats }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [parent, enableAnimations] = useAutoAnimate<HTMLDivElement>(/* optional config */)

    const toggleDropdown = () => {
        return setIsOpen(!isOpen)
    }

    if (subcats.length > 1) {
        return (
            <div >
                <div
                    onClick={() => {
                        console.log(`click ${subcats}`)
                        toggleDropdown()
                    }}
                    className={`p-4 w-full bg-green-300 font-bold`}>
                    {category}
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