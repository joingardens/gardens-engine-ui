import {
    InfoCircleOutlined
} from '@ant-design/icons'
import { Empty, Input } from 'antd'
import React, { useMemo, useState } from 'react'
import { IHashMapGeneric } from '../../../../models/IHashMapGeneric'
import { IOneClickAppIdentifier } from '../../../../models/IOneClickAppModels'
import StringSimilarity from '../../../../utils/StringSimilarity'
import NewTabLink from '../../../global/NewTabLink'
import { useOneClickAppsContext } from '../context/OneClickContext'
import { OneClickAppCard } from './OneClickAppCard'

interface OneClickGridState { sortScores: IHashMapGeneric<number>; selectedApp?: string | undefined }

export const OneClickGrid: React.FC = () => {
    const { oneClickAppList } = useOneClickAppsContext()
    const [state, setState] = useState<OneClickGridState>({ sortScores: {} })
    const apps = useMemo(() => {
        let apps: IOneClickAppIdentifier[] = []
        if (oneClickAppList) {
            if (Object.keys(state.sortScores).length > 0) {
                const appsSorted = oneClickAppList.concat().sort((a, b) => {
                    return (
                        (state.sortScores[b.name] || 0) -
                        (state.sortScores[a.name] || 0)
                    )
                })

                apps = appsSorted.filter((it) => {
                    return state.sortScores[it.name] > 0.5
                })
            }
            apps = oneClickAppList.sort((x, y) => {
                console.log(Number(y.isFeatured) - Number(x.isOfficial))
                return Number(y.isFeatured) - Number(x.isOfficial)
            })
        }
        return apps
    }, [oneClickAppList, state.sortScores])

    return (
        <>
            <div style={{ height: 40 }} />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                <Input.Search
                    style={{ maxWidth: 200, marginBottom: 30 }}
                    placeholder="Search for an app..."
                    onChange={({ currentTarget }) => {
                        const searchTerm = (currentTarget.value || '')
                            .trim()
                            .toLowerCase()
                        if (searchTerm && oneClickAppList) {
                            const sortScores: IHashMapGeneric<number> = getSortScores(
                                oneClickAppList,
                                searchTerm
                            )
                            setState({ ...state, sortScores })
                        }
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {apps?.length ? (
                    apps.length &&
                    apps.map((app) => <OneClickAppCard key={app.name} app={app} />)
                ) : (
                    <div>
                        <Empty description="No matching App" />
                        <div style={{ paddingTop: 30 }}>
                            What if the app/database I want is not listed
                            here? &nbsp;
                            <NewTabLink url="https://caprover.com/docs/one-click-apps.html#what-about-other-apps">
                                <InfoCircleOutlined />
                            </NewTabLink>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}


const getSortScores = (appArray: IOneClickAppIdentifier[], searchTerm: string) => {
    const sortScores: IHashMapGeneric<number> = {}
    appArray?.forEach((app) => {
        let score = 0

        const appNameForSearch = (
            (app.displayName || '').trim() ||
            app.name
        )
            .toLowerCase()
            .trim()

        if (
            appNameForSearch
                .toLowerCase()
                .includes(searchTerm)
        ) {
            score = 1
        } else if (
            app.description &&
            app.description
                .toLowerCase()
                .includes(searchTerm)
        ) {
            score = 0.99
        } else {
            score =
                StringSimilarity.compareTwoStrings(
                    searchTerm,
                    appNameForSearch
                )
        }

        sortScores[app.name] = score || 0
    })
    return sortScores

}

