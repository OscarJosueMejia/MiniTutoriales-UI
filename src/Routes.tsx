import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import Admin from '@layouts/Admin/index';
import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';
import {CategoryList, CategoryManagement} from '@views/Categorias/index';

const Routes = () => {
  return (
    <Router >
      <Switch>
        <Route path='/login' element={<SignIn />} />
        <Route path="/home*" element={
          <Switch>
            <Route index element={<><Feed/><TabNavigator /></>}/>
            <Route path="tutorial" element={<><Tutorial/><TabNavigator/></>}/>
          </Switch>
        }/>

        <Route path="/creator*" element={
          <Switch>
            <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/>
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
      </Switch>
      
    </Router>
  );
}

export default Routes;