import * as React from 'react';
import { Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface IAlertDialog {
  isOpen:boolean;
  type:'ERROR'|'ALERT'|'DIALOG';
  title?:string;
  description:string;
  onDialogAccept?:VoidFunction;
}

export default function AlertDialog({isOpen, type, title, description, onDialogAccept}:IAlertDialog) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            type === 'DIALOG' && onDialogAccept !== undefined ? <>
            <Button onClick={handleClose}>Cancelar</Button> 
            <Button onClick={()=>{onDialogAccept(); setOpen(false)}} autoFocus>Aceptar</Button></>
            :<Button onClick={handleClose}>Aceptar</Button>
          }
        </DialogActions>
      </Dialog>
  );
}
