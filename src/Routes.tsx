import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import ProfileView from '@views/Profile';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';
import SignUp from '@views/Auth/SignUp';
const Routes = () => {
  return (
    <Router >
      <Switch>
        <Route path='/login' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path="/home/*" element={
          <Switch>
            <Route index element={<><Feed/><TabNavigator /></>}/>
            <Route path="tutorial" element={<><Tutorial/><TabNavigator/></>}/>
          </Switch>
        }/>

        <Route path="/creator/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<><TutorialManagement/><TabNavigator /></>}/>
          </Switch>
        }/>
        <Route path="/user/*" element={
          <Switch>
            {/* <Route index element={<PrivateRoute><TutorialManagement/><TabNavigator /></PrivateRoute>}/> */}
            <Route index element={<><ProfileView/><TabNavigator /></>}/>
          </Switch>
        }/>
        <Route path="*" element={<PageNotFound/>}/>
      </Switch>
      
    </Router>
  );
}

export default Routes;