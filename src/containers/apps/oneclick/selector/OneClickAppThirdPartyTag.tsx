import {
    FlagTwoTone,
    SafetyCertificateTwoTone
} from '@ant-design/icons'
import { Row, Tooltip } from "antd"
import { IOneClickAppIdentifier } from "../../../../models/IOneClickAppModels"

interface OneClickAppThirdPartyTagProps {
    app: IOneClickAppIdentifier
}
export const OneClickAppThirdPartyTag: React.FC<OneClickAppThirdPartyTagProps> = ({ app }) => {
    const MAIN_REPO = process.env.REACT_APP_ONECLICKAPPS_URL

    const isFromMainRepository = app.baseUrl === MAIN_REPO || !app.baseUrl
    const isUsingOfficialImage = !!app.isOfficial

    return (
        <div style={{ marginTop: 20 }}>
            <Row align="middle" justify="space-between">
                {isFromMainRepository ? undefined : (
                    <Tooltip title={`From: ${app.baseUrl}`}>
                        <FlagTwoTone />
                    </Tooltip>
                )}
                {!isUsingOfficialImage ? undefined : (
                    <Tooltip
                        title={`Uses the official image provided by the application developer, or a trusted source like Bitnami or LinuxServer`}
                    >
                        <SafetyCertificateTwoTone />
                    </Tooltip>
                )}
            </Row>
        </div>
    )
}