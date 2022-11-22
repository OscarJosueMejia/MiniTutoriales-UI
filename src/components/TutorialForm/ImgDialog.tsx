import {Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

export default function ImgDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Imagen de Referencia</DialogTitle>
        <List sx={{ pt: 0 }}>

          <ListItem autoFocus button onClick={() => handleListItemClick('pickImg')}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Seleccionar otra Imagen" />
          </ListItem>

          <ListItem autoFocus button onClick={() => handleListItemClick('deleteImg')}>
            <ListItemAvatar>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Eliminar Imagen" />
          </ListItem>

        </List>
      </Dialog>
    );
  }
