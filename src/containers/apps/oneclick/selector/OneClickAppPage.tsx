import { RouteComponentProps } from "react-router"
import { OneClickContextProvider } from "../context/OneClickContext"
import { OneClickAppSelector } from "./OneClickAppSelector"

export const OneClickAppPage: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <OneClickContextProvider>
            <OneClickAppSelector history={history} />
        </OneClickContextProvider>
    )
}