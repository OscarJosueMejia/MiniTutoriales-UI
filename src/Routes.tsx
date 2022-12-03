import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import Admin from '@layouts/Admin/index';
import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import {ProfileView, CommonProfileView} from '@views/Profile';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';
import {CategoryList, CategoryManagement} from '@views/Categorias/index';
import SignUp from '@views/Auth/SignUp';
import ValidateAccount from '@views/Auth/ValidateAccount';
import SearchView from '@views/Search';

const Routes = () => {
  return (
    <Router >
      <Switch>
        <Route path="/" element={<Navigate to="/auth" />} />

        <Route path="/auth/*" index element={
          <Switch>
            <Route index element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
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
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/admin*" element={
          <Switch>
            <Route path='categorias*' element={
              <Switch>
                <Route path='list' element={<Admin><CategoryList/></Admin>}/>
                <Route path='management' element={<Admin><CategoryManagement/></Admin>}/>
              </Switch>
            }/>
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

        <Route path="/*" element={<PageNotFound/>}/>
      </Switch>
      
    </Router>
  );
}

export default Routes;