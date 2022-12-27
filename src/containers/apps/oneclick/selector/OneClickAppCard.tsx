import { Card } from "antd"
import { Link } from "react-router-dom"
import { IOneClickAppIdentifier } from "../../../../models/IOneClickAppModels"
import { useOneClickAppsContext } from "../context/OneClickContext"
import { OneClickAppThirdPartyTag } from "./OneClickAppThirdPartyTag"

interface OneClickAppCardProps {
    app: IOneClickAppIdentifier,
}



export const OneClickAppCard: React.FC<OneClickAppCardProps> = ({
    app
}) => {

    const { catsState } = useOneClickAppsContext()

    const url =
        app.name && app.baseUrl
            ? `/apps/oneclick/${app.name}?baseDomain=${encodeURIComponent(
                app.baseUrl
            )}`
            : '#'

    if (!catsState.length || (catsState.length && catsState.includes(app.subcategory))) {
        return (
            <div key={app.name + app.baseUrl} className="one-click-app-card">
                <Link
                    to={url}
                    // onClick={(event) =>
                    //     this.props.onAppSelectionChanged(event, app.name)
                    // }
                    className={`mb-2`}
                >
                    <Card
                        cover={<img src={app.logoUrl} alt="App logo" />}
                        hoverable
                    >
                        <Card.Meta
                            title={app.displayName}
                            description={app.description}
                        />
                        <OneClickAppThirdPartyTag app={app} />
                        <div className={`font-bold`}>
                            {app.isFeatured ? "I'm featured!!" : ""}
                        </div>
                    </Card>
                </Link>
            </div>
        )
    }
    return <></>
}