import { useCallback, useState } from 'react';
import { Container, Button } from '@mui/material';
import {useDropzone, FileWithPath} from 'react-dropzone';

import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface ImgPickerProps {
    buttonTitle:string;
    setFile: (value: File) => void;
}

const ImgPicker = ({buttonTitle, setFile}:ImgPickerProps) => {

    const [imgPicked, setImgPicked] = useState<File>()

    const onDrop = useCallback((acceptedFiles:Array<File>) => {
        setImgPicked(acceptedFiles[0]);
        setFile(acceptedFiles[0]);
      }, [])

    const {getRootProps, getInputProps, open} = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        noClick: true,
        noKeyboard: true,
        multiple:false,
        onDrop
      });
    return(
        <Container sx={{mt:2.5, mb:2}} style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}} {...getRootProps({className: 'dropzone'})}>
            <input accept="image/jpeg,image/png" type="file" {...getInputProps()} />
            <Button variant="contained" type='button' onClick={open}  endIcon={<CameraAltIcon sx={{mb:0.3}} />}>{buttonTitle}</Button>
        </Container>
    )
}

export default ImgPicker;