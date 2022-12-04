import {useState} from 'react'
import { IUserInList } from '@views/UserAdmin/AccessManager';
import {Paper , Switch, TableRow, TableCell, TableContainer, TableBody , TableHead, Table, Typography } from '@mui/material';
import { AlertDialog } from '@components/Misc';

interface IAMTable{
    usersList:Array<IUserInList>;
    handleUpd:(currentStatus:'ACT'|'INA'|'BLQ', userId:string) => void;
}

const AccessManagerTable = ({usersList, handleUpd}:IAMTable) => {
    const [showDialog, setShowDialog] = useState(false);
    const [userUpd, setUserUpd] = useState<{userId:string, checked:boolean}>();

    const handleChange = () => {
        if(userUpd !== undefined){
            if(userUpd.checked){
                handleUpd('ACT', userUpd.userId);
            }else{
                handleUpd('INA', userUpd.userId);
            }
        }
        setShowDialog(false);
    };


    return (
        <>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell> Email </TableCell>
              <TableCell> Nombre </TableCell>
              <TableCell> Ultima Modificación </TableCell>
              <TableCell> Rol </TableCell>
              <TableCell> Estado </TableCell>
              <TableCell> Acción </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersList.map(user=>{
                const updDate = `${new Date(user.updated).toLocaleDateString('es-ES',{day:'2-digit', month:"2-digit", year:'numeric'})} ${new Date(user.updated).toLocaleString('es-ES',{hour:'2-digit', minute:'2-digit'})}`
                const rol = user.rol === 'public' ? 'Público' : 'Administrador';
                const status = user.status === 'ACT' ? 'Activo' : user.status === 'INA' ? 'Inactivo' : 'Bloqueado';
                return(
                    <TableRow key={user._id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{updDate}</TableCell>
                        <TableCell>{rol}</TableCell>
                        <TableCell>{status}</TableCell>
                        <TableCell>
                            <Switch 
                                checked={user.status === 'ACT'}
                                onChange={(e)=>{ setUserUpd({userId:user._id, checked:e.target.checked}); setShowDialog(true);}} 
                                defaultChecked color="success"  
                                />
                        </TableCell>
                    </TableRow>
                )
            })
        }
          </TableBody>
        </Table>
        { showDialog && <AlertDialog isOpen={showDialog} type='DIALOG' title="Actualizar Usuario" description={`El Estado del Usuario será modificado`} onDialogCancel={setShowDialog} onDialogAccept={()=>{handleChange()}} /> }
      </TableContainer>
    </>
      );
}

export default AccessManagerTable;

