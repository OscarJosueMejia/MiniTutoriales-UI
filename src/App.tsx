import "./App.css";
//import Home from '@views/Home';
//import Cards from '@views/Cards';
import Feed from "@views/Feed";
import { Tutorial } from "@views/Tutorial";
import TabNavigator from "@components/TabNavigator";
import TutorialManagement from "@views/Tutorial/TutorialManagement";
import SignIn from "@views/Auth/SignIn";
import SignUp from "@views/Auth/SignUp";
import EjemploAdmin from "@views/EjemploAdmin/index";

function App() {
  return (
    <>
      <EjemploAdmin />
    </>
  );
}

export default App;
