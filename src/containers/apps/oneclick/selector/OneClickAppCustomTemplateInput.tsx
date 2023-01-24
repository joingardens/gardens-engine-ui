import { Alert, Button, Row } from "antd"
import { useState } from "react"
import { RouteComponentProps } from "react-router"
import { UrlDictionary } from "../../../../core/dictionaries/url.dictionary"
import InputJsonifier from "../../../global/InputJsonifier"
import NewTabLink from "../../../global/NewTabLink"


export const TEMPLATE_ONE_CLICK_APP = 'TEMPLATE_ONE_CLICK_APP'
export const ONE_CLICK_APP_STRINGIFIED_KEY = 'oneClickAppStringifiedData'
interface OneClickAppCustomTemplateInputProps {
    isCustomTemplateSelected: boolean,

    history: RouteComponentProps["history"]
}

export const OneClickAppCustomTemplateInput: React.FC<OneClickAppCustomTemplateInputProps> = (
    { isCustomTemplateSelected, history }
) => {
    const [templateOneClickAppData, setTemplateOneClickAppData] = useState<string>("")
    const isOneClickJsonValid = () => {
        try {
            JSON.parse(templateOneClickAppData)
            return true
        } catch (error) {
            return false
        }
    }
    return (
        <div
            className={
                isCustomTemplateSelected ? '' : 'hide-on-demand'
            }
        >
            <div>
                <p>
                    This is mainly for testing. You can copy and paste your
                    custom One-Click app template here. See{' '}
                    <NewTabLink url={UrlDictionary.ONE_CLICK_APPS_REPO}>
                        the main one click apps GitHub repository
                    </NewTabLink>{' '}
                    for samples and ideas.
                </p>
            </div>

            <InputJsonifier
                placeholder={`YAML or JSON # use captainVersion 4
                    {
                    "captainVersion": "4",
                    "version": "3.3"
                    "services": {
                    "$$cap_appname": {
                        "image": "adminer:$$cap_adminer_version",
                        "containerHttpPort": "8080",
                        "environment": {
                            "ADMINER_DESIGN": "$$cap_adminer_design"
                        }
                    }
                    }
                    }`}
                onChange={(stringified) => {
                    setTemplateOneClickAppData(stringified)
                }}
            />
            <div style={{ height: 10 }} />
            {!isOneClickJsonValid() ? (
                <Alert
                    message="One Click data that you've entered is not a valid JSON."
                    type="error"
                />
            ) : (
                <div />
            )}
            <div style={{ height: 30 }} />
            <Row justify="space-between" align="middle">
                <Button
                    onClick={() =>
                        history.push(
                            `/apps/oneclick/${TEMPLATE_ONE_CLICK_APP}` +
                            (`?${ONE_CLICK_APP_STRINGIFIED_KEY}=` +
                                encodeURIComponent(
                                    templateOneClickAppData
                                ))
                        )
                    }
                    disabled={
                        !!templateOneClickAppData ||
                        !isOneClickJsonValid()
                    }
                    style={{ minWidth: 150 }}
                    type="primary"
                >
                    Next
                </Button>
            </Row>
        </div>
    )
}