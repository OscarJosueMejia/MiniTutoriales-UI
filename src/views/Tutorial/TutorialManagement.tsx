//Logic
import {useState} from 'react';
import { useUploadContentMutation } from '@store/Services/Creator';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '@utils/firebase';
import { IStep } from '@components/Steps/StepContainer';
//Components
import { Container } from "@mui/material";
import { AlertDialog, ModalLoadingIndicator } from "@components/Misc";
import Header from "@components/Header";
import TutorialForm from "@components/TutorialForm";
//Form
import { useFormik } from "formik";
import * as Yup from 'yup';

import './tutorial.css';

interface IFormValues {
  title:string;
  description:string;
  steps:Array<IStep>;
  requirements:Array<string>;
  tags:Array<{tagDescription: string}>;
}

const TutorialManagement = () => {
    const Navigator = useNavigate();
    const [uploadContent, { isLoading, status, error }] = useUploadContentMutation();

    const initialValues:IFormValues = {title:"", description:"", steps:[], requirements:[], tags:[]}

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema:Yup.object(validationSchema()),
      onSubmit: async (formValues) => {
          await uploadContent({userId:'6355bf4a972277413bb7ddca', 
          title:formValues.title,
          description:formValues.description, 
          categoryId:1, 
          requirements:formValues.requirements, 
          steps:formValues.steps, 
          tags:formValues.tags});
          Navigator('/home/')
      } 
    })

    const uploadImages = async () => {
      // let imgURI = await uploadImage(acceptedFiles[0]);
      // alert(imgURI);
    }

    return (
        <>
          <Header title="Crear un Tutorial" showActionBtn={true} btnTitle="Publicar" btnAction={()=>{formik.handleSubmit()}} />
          <Container className="tutorialViewContainer"  >
            <TutorialForm  
              formik={formik}
            />
          </Container>
          <ModalLoadingIndicator show={isLoading} />
        </>
    );
}

export default TutorialManagement;

function validationSchema(){
  return {
      title: Yup.string().required("Campo Requerido"),
      description: Yup.string().required("Campo requerido"),
      steps: Yup.array().min(1, 'Agregue al menos 1 paso.'),
      requirements: Yup.array().min(1, 'Agregue al menos 1 requerimiento.'),
      tags: Yup.array().min(1, 'Agregue al menos una etiqueta.'),
  }
}