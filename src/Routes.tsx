import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import EjemploAdmin from '@views/EjemploAdmin';
import Admin from '@layouts/Admin/index';
import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import {ProfileView, CommonProfileView} from '@views/Profile';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';
import SignUp from '@views/Auth/SignUp';
import ValidateAccount from '@views/Auth/ValidateAccount';
import SearchView from '@views/Search';
import RecoveryPassword from '@views/Auth/RecoveryPassword';
import {CategoryList, CategoryManagement, FeedByCategory} from '@views/Categorias/index';

const Routes = () => {
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
            <Route index element={<><Feed/><TabNavigator tab="/home/" /></>}/>
            <Route path="tutorial" element={<><Tutorial/><TabNavigator tab="/home/"/></>}/>
            <Route path="profile" element={<><CommonProfileView /><TabNavigator tab="/home/" /></>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/categories/*" element={
          <Switch>
            <Route index element={<><FeedByCategory/><TabNavigator tab="/categories/" /></>}/>
            <Route path="/*" element={<PageNotFound/>}/>
          </Switch>
        }/>

        <Route path="/creator/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<><TutorialManagement/><TabNavigator tab="/home/" /></>}/>
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

        <Route path="/user/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<><ProfileView/><TabNavigator tab="/user/" /></>}/>
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
                <Route path='list' element={<Admin><CategoryList/></Admin>}/>
                <Route path='management' element={<Admin><CategoryManagement/></Admin>}/>
              </Switch>
            }/>
          </Switch>
        }/>
      </Switch>
      
    </Router>
  );
}

export default Routes;