import { PropsWithChildren } from "react";
import TabNavigator from "@components/TabNavigator";
import PrivateRoute from "@components/PrivateRoute";

interface IUserLayoutProps {
    hideNavigator?:boolean
}

const UserLayout = ({children, hideNavigator}: PropsWithChildren<IUserLayoutProps>) => {
    let currentRoute = window.location.pathname.substring(
        window.location.pathname.indexOf("/") , 
        window.location.pathname.lastIndexOf("/")+1);

    return(
        <PrivateRoute allowedRoles={['public']}>
        {children}
        {!hideNavigator && <TabNavigator tab={currentRoute} />}
        </PrivateRoute>
    )
}

export default UserLayout;