import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import EjemploAdmin from '@views/EjemploAdmin';
import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';
import RecoveryPassword from '@views/Auth/RecoveryPassword';


const Routes = () => {
  return (
    <Router >
      <Switch>
        <Route path='/login' element={<SignIn />} />
        <Route path='/recovery-password' element={<RecoveryPassword />} />
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

        <Route path="/admin*" element={
          <Switch>
            <Route index element={<PrivateRoute allowedRoles={["admin"]} ><EjemploAdmin/></PrivateRoute>}/>
          </Switch>
        }/>

        <Route path="*" element={<PageNotFound/>}/>
      </Switch>
      
    </Router>
  );
}

export default Routes;