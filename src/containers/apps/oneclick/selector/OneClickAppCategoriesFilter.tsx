import React from "react";

interface CategorySelectorProps {
    categories: Record<string, string[]>
}
export const OneClickAppCategorySelector: React.FC<CategorySelectorProps> = ({ categories }) =>  {
    return (
        <div className={`grid grid-cols-4`}>
        {Object.entries(categories).map(categoryTuple => {
            return (
                <div >
                    {categoryTuple[0]}
                    <div>
                        {categoryTuple[1].map(subcat => {return (
                            <div>
                                {subcat}
                            </div>
                        )})}
                    </div>
                </div>
            )
            })}
        </div>
    )
}