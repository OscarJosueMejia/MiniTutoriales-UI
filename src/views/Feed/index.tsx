import { Container, SpeedDial} from "@mui/material";
import FeedCard from "@components/Card";
import Header from "@components/Header";


import './feed.css';

const Feed = () => {
  return (
    <>
      <Header/>
      <Container className="feedContainer">
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </Container>
      
    </>
  );
}
export default Feed;
