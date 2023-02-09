import { useQuery } from "@tanstack/react-query";
import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import ApiManager from "../../../../api/ApiManager";
import { IOneClickAppIdentifier } from "../../../../models/IOneClickAppModels";
import Logger from "../../../../utils/Logger";
import Toaster from "../../../../utils/Toaster";

export interface OneClickContextValue {
    /** 
     * List of the one click apps
     */
    oneClickAppList?: IOneClickAppIdentifier[]

    isLoading: boolean,

    categories: Record<string, string[]>,
    /** Current selected categories */
    catsState: string[]
    handleCategoryToggle: (subcat: string) => void
}

export const OneClickContext = React.createContext<OneClickContextValue | null>(null);

const OneClickAppsQueryKey = "ONE_CLICK_APPS_QUERY"

const apiManager = new ApiManager()

export const OneClickContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const oneClickAppsQuery = useQuery({
        queryKey: [OneClickAppsQueryKey],
        queryFn: () => apiManager.getAllOneClickApps(),
        onError(err) {
            Toaster.toast(err)
        },
    })

    const [catsState, setCatsState] = useState<string[]>([])

    const categories = useMemo(() => {
        if (oneClickAppsQuery.data) {
            const apps = oneClickAppsQuery.data.oneClickApps
            const obj: Record<string, string[]> = {}
            apps.map(a => obj[a.category] = [...obj[a.category] ? obj[a.category] : [], a.subcategory])
            for (let key of Object.keys(obj)) {
                obj[key] = Array.from(new Set(obj[key]))
            }
            return obj
        }
        return {}
    }, [oneClickAppsQuery.data])

    const handleCategoryToggle = useCallback((subcat: string) => {
        let newCats: string[] = []
        if (catsState.includes(subcat)) {
            newCats = catsState.filter(a => a !== subcat)
        }
        else {
            newCats = [...catsState, subcat]
        }
        return setCatsState(newCats)
    }, [catsState])




    return (
        <OneClickContext.Provider value={{
            isLoading: oneClickAppsQuery.isLoading,
            oneClickAppList: oneClickAppsQuery.data?.oneClickApps,
            categories,
            catsState,
            handleCategoryToggle
        }}>
            {children}
        </OneClickContext.Provider>
    );
}

export const useOneClickAppsContext = () => {
    const context = useContext(OneClickContext)

    if (!context) {
        Logger.error("Context not initialized")
        throw new Error("Context not initialized")
    }

    return context
}