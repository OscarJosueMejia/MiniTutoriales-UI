import { BrowserRouter as Router, Route, Routes as Switch, Navigate } from 'react-router-dom';
import PrivateRoute from '@components/PrivateRoute';
import { PageNotFound } from '@components/Misc';

import Feed from '@views/Feed';
import { Tutorial, TutorialManagement } from '@views/Tutorial';
import TabNavigator from '@components/TabNavigator';
import SignIn from '@views/Auth/SignIn';

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
      </Switch>
      
    </Router>
  );
}

export default Routes;