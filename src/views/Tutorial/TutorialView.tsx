import { Container } from "@mui/material";
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";

import './tutorial.css';

const Tutorial = () => {
    return (
        <>
          <Header/>
          <Container className='tutorialViewContainer'>
            <TutorialBody/>
          </Container>
        </>
      );
}

export default Tutorial;