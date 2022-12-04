import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import { useSelector } from 'react-redux';
import { selectAuth } from '@store/Slices/securitySlice';

import Admin from '@layouts/Admin/index';
import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import {ProfileView, CommonProfileView, ChangeView} from '@views/Profile';
import AccessManager from '@views/UserAdmin/AccessManager';
import UserLayout from '@layouts/User';
import SignIn from '@views/Auth/SignIn';
import SignUp from '@views/Auth/SignUp';
import ValidateAccount from '@views/Auth/ValidateAccount';
import SearchView from '@views/Search';
import RecoveryPassword from '@views/Auth/RecoveryPassword';
import {CategoryList, CategoryManagement, FeedByCategory} from '@views/Categorias/index';
import TabNavigator from '@components/TabNavigator';


const Routes = () => {

  const user = useSelector(selectAuth);
  if (user) {
    const { token } = user;
    if (token && window.location.pathname === "/auth") {
      window.location.replace("/home");
    }
  }


  return (
    <Router >
      <Switch>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth/*" index element={
          <Switch>
            <Route index element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path='recovery-password' element={<RecoveryPassword />} />
            <Route path="validate" element={<ValidateAccount/>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/home/*" element={
          <Switch>
            <Route index element={<UserLayout><Feed/></UserLayout>}/>
            <Route path="tutorial" element={<UserLayout><Tutorial/></UserLayout>}/>
            <Route path="profile" element={<UserLayout><CommonProfileView/></UserLayout>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/categories/*" element={
          <Switch>
            <Route index element={<UserLayout><FeedByCategory/></UserLayout>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>
        
        <Route path="/find/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<><SearchView/><TabNavigator tab="/find/" /></>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/admin/*" element={
          <Switch>
            <Route index element={<PrivateRoute allowedRoles={["admin"]} ><EjemploAdmin/></PrivateRoute>}/>
          </Switch>
        }/>

        <Route path="/*" element={<PageNotFound/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/admin/*" element={
          <Switch>
            <Route path='categorias/*' element={
              <Switch>
                <Route index path='list' element={<PrivateRoute allowedRoles={["admin"]}><Admin><CategoryList/></Admin></PrivateRoute>}/>
                <Route path='management' element={<PrivateRoute allowedRoles={["admin"]}><Admin><CategoryManagement/></Admin></PrivateRoute>}/>
                <Route path="*" element={<PageNotFound/>}/>
              </Switch>
              }/>
            <Route index path="accesslist" element={<PrivateRoute allowedRoles={["admin"]}><AccessManager/></PrivateRoute>}/>
            <Route path="*" element={<PageNotFound/>}/>

          </Switch>
        }/>

        <Route path="/creator/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<UserLayout><TutorialManagement/></UserLayout>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>
        
        <Route path="/find/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<UserLayout><SearchView/></UserLayout>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/user/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<UserLayout><ProfileView/></UserLayout>}/>
            <Route path="changePassword" element={<><ChangeView/><TabNavigator tab="/user/changePassword" /></>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="*" element={<PageNotFound/>}/>

      </Switch>
      
    </Router>
  );
}

export default Routes;