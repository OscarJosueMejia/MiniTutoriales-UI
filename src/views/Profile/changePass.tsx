import {useState, useEffect} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem2 } from "@store/Slices/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFeedItems, setUserFeedItems, selectUserFeedDetails} from "@store/Slices/userFeedSlice";
import { useLazyByUserQuery } from "@store/Services/Feed";
//Components
import Header from "@components/Header";
import {Button, ButtonGroup, Container} from "@mui/material";
import { ProfileInfo } from '@components/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCommUserData, selectCommUserItems, setCommUserItems } from '@store/Slices/commUserSlice';
import FormChangePass from '@components/Profile/formChange';
import { useChangePassMutation } from '@store/Services/Security';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IFormValues {
  email:string;
  oldPasswords:unknown;
  password:string;
}

const ChangeView = () => {
  const Location = useLocation();
  const Navigator = useNavigate();

  const isUpdate = Location.state.isUpdate;
  const itemData = Location.state.itemData as IFeedItem2;

  const [uploadContent, { isLoading, status, error }] = useChangePassMutation();
  const [updateContent, { isLoading:isUpdating}] = useChangePassMutation();

  let initialValues:IFormValues = {email:"", oldPasswords:[], password:""}

  if (isUpdate && itemData !== undefined) {
    initialValues = {
      email:itemData.email as string,
      oldPasswords:itemData.oldPasswords,
      password:itemData.password as string,
    }

  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:Yup.object(validationSchema()),
    
    onSubmit: async (formValues) => {
        const dataPreparation = {
          email: formValues.email,
          oldPasswords: formValues.oldPasswords, 
          password: formValues.password,
      }

      if (isUpdate) {
        await updateContent(dataPreparation);
        Navigator('/user/');
      }else{
        await uploadContent(dataPreparation);
        Navigator('/user/password');
      }
    } 
  })

    return (
    <>
      <Header title={!isUpdate ? "Crear un Tutorial" : "Editar Tutorial"} showActionBtn={true} btnTitle={!isUpdate ? "Publicar" : " Aplicar Cambios"} btnIconType='CHECK' btnAction={()=>{formik.handleSubmit()}} />
      <ProfileInfo userData={{name:"Angel Lagos", email:"oj_mejias@unicah.edu"}} uploadCount={1} />
      <Container sx={{display:'flex', justifyContent:'center', mt:'1.2rem'}}>
      </Container> 
      <FormChangePass 
      formik={formik}></FormChangePass>     
    </>
    );
}

export default ChangeView;

function validationSchema(){
  return {
      email: Yup.string().required("Campo Requerido"),
      password: Yup.string().required("Campo requerido"),
      oldPasswords: Yup.array().min(1, 'Campo requerido'),
  }
}

