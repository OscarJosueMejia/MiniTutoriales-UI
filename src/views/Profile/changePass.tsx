import {useState, useEffect} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFeedItems, setUserFeedItems, selectUserFeedDetails} from "@store/Slices/userFeedSlice";
import { useLazyByUserQuery } from "@store/Services/Feed";
//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import { useLocation } from 'react-router-dom';
import { selectCommUserData, selectCommUserItems, setCommUserItems } from '@store/Slices/commUserSlice';
import FormChangePass from '@components/Profile/formChange';

const ChangeView = () => {
    

    return (
    <>
      <Header title="Mi Perfil" />
      <ProfileInfo userData={{name:"Angel Lagos", email:"oj_mejias@unicah.edu"}} uploadCount={1} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
      </Container> 
      <FormChangePass userData={{
          email: ''
        }}></FormChangePass>     
    </>
    );
}

export default ChangeView;

