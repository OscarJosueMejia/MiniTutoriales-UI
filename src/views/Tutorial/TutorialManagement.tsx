import { Container } from "@mui/material";
import Header from "@components/Header";
import TutorialBody from "@components/TutorialBody";
import TutorialForm from "@components/TutorialForm";

import './tutorial.css';

const TutorialManagement = () => {
    return (
        <>
          <Header/>
          <Container className="tutorialViewContainer"  >
            <TutorialForm/>
          </Container>
        </>
      );
}

export default TutorialManagement;