import { PropsWithChildren } from "react";
import TabNavigator from "@components/TabNavigator";

interface IUserLayoutProps {
    hideNavigator?:boolean
}

const UserLayout = ({children, hideNavigator}: PropsWithChildren<IUserLayoutProps>) => {
    let currentRoute = window.location.pathname.substring(
        window.location.pathname.indexOf("/") , 
        window.location.pathname.lastIndexOf("/")+1);

    return(
        <>
        {children}
        {!hideNavigator && <TabNavigator tab={currentRoute} />}
        </>
    )
}

export default UserLayout;