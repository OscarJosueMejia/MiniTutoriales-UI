//Logic
import {useState} from 'react';
import { useUploadContentMutation } from '@store/Services/Creator';
import { useNavigate, useLocation } from 'react-router-dom';
import { uploadImage } from '@utils/firebase';
import { IStep } from '@components/Steps/StepContainer';
import { IFeedItem } from '@store/Slices/feedSlice';
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
  requirements:unknown;
  tags:Array<{tagDescription: string}>;
}

const TutorialManagement = () => {
    const Location = useLocation();
    const Navigator = useNavigate();

    const isUpdate = Location.state.isUpdate;
    const itemData = Location.state.itemData as IFeedItem;

    const [uploadingImgs, setUploadingImgs] = useState(false);
    const [uploadContent, { isLoading, status, error }] = useUploadContentMutation();

    let initialValues:IFormValues = {title:"", description:"", steps:[], requirements:[], tags:[]}

    if (isUpdate && itemData !== undefined) {
      initialValues = {
        title:itemData.title, 
        description:itemData.description,
        steps:itemData.steps,
        requirements:itemData.requirements as unknown,
        tags:itemData.tags as Array<{tagDescription: string}>
      }
    }

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema:Yup.object(validationSchema()),
      onSubmit: async (formValues) => {
          await uploadContent({userId:'6355bf4a972277413bb7ddca', 
          title:formValues.title,
          description:formValues.description, 
          categoryId:1, 
          requirements:formValues.requirements, 
          steps:await uploadImagesFB(formValues.steps), 
          tags:formValues.tags});
          Navigator('/home/')
      } 
    })

    return (
        <>
          <Header title={!isUpdate ? "Crear un Tutorial" : "Editar Tutorial"} showActionBtn={true} btnTitle={!isUpdate ? "Publicar" : " Aplicar Cambios"} btnAction={()=>{formik.handleSubmit()}} />
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

async function uploadImagesFB(steps:Array<IStep>){
  const stepsWithURL = steps.map(async (o) => {
    if (o.imgURL !== undefined && typeof o.imgURL !== 'string') {
      o.imgURL = await uploadImage(o.imgURL as File, 'StepImages');
    }
    return o;
  });

  return Promise.all(stepsWithURL);
}

//{{HOST}}/tutorial/update/:id