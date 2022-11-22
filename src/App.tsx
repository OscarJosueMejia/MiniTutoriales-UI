import './App.css';
//import Home from '@views/Home';
//import Cards from '@views/Cards';
import Feed from '@views/Feed';
import Tutorial from '@views/Tutorial';
import TabNavigator from '@components/TabNavigator';
import TutorialManagement from '@views/Tutorial/TutorialManagement';
import SignIn from '@views/Auth/SignIn';

function App() {
  return (
    <>
      <TutorialManagement />
      <TabNavigator/>
    </>
  );
}

export default App;
