import { Alert, Card, Col, Row } from 'antd'
import { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { UrlDictionary } from '../../../../core/dictionaries/url.dictionary'
import Utils from '../../../../utils/Utils'
import CenteredSpinner from '../../../global/CenteredSpinner'
import NewTabLink from '../../../global/NewTabLink'
import { useOneClickAppsContext } from '../context/OneClickContext'
import { OneClickAppCategorySelector } from './OneClickAppCategoriesFilter'
import { OneClickAppCustomTemplateInput } from './OneClickAppCustomTemplateInput'
import { OneClickGrid } from './OneClickGrid'
import OneClickReposList from './OneClickReposList'

export const TEMPLATE_ONE_CLICK_APP = 'TEMPLATE_ONE_CLICK_APP'
export const ONE_CLICK_APP_STRINGIFIED_KEY = 'oneClickAppStringifiedData'


interface OneClickAppSelectorState {
    isCustomTemplateSelected: boolean
}

export const OneClickAppSelector: React.FC<{
    history: RouteComponentProps["history"]
}> = ({ history }) => {

    const [state] = useState<OneClickAppSelectorState>({
        isCustomTemplateSelected: false,
    })

    const { isLoading } = useOneClickAppsContext()

    return (
        <div>
            <Row justify="center">
                <Col xs={{ span: 23 }} lg={{ span: 23 }}>
                    <Card title="One Click Apps">
                        <div
                            className={
                                state.isCustomTemplateSelected
                                    ? 'hide-on-demand'
                                    : ''
                            }
                        >
                            <p>
                                Choose an app, a database or a bundle
                                (app+database) from the list below. The rest
                                is magic, well... Wizard!
                            </p>
                            <p>
                                One click apps are retrieved from the
                                official{' '}
                                <NewTabLink url={UrlDictionary.ONE_CLICK_APPS_REPO}>
                                    One Click Apps Repository{' '}
                                </NewTabLink>
                                by default. You can add other public/private
                                repositories if you want to.
                            </p>
                            <OneClickAppCategorySelector

                            />

                            {isLoading ? <CenteredSpinner /> : <OneClickGrid />}
                            <div style={{ height: 50 }} />
                            <OneClickReposList />
                        </div>
                        {Utils.isSafari() ? (
                            <Alert
                                message="You seem to be using Safari. Deployment of one-click apps may be unstable on Safari. Using Chrome is recommended"
                                type="warning"
                            />
                        ) : (
                            <div />
                        )}
                        <div style={{ height: 50 }} />
                        <OneClickAppCustomTemplateInput
                            isCustomTemplateSelected={state.isCustomTemplateSelected}
                            history={history}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )

}
