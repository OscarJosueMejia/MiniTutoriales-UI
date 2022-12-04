import { useState, ChangeEvent } from "react";
import { AccessManagerTable } from "@components/Profile";
import AdminLayout from "@layouts/Admin/index";
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from "@store/Services/Security";
import { ContentLoadingIndicator } from "@components/Misc";
import { Container, Pagination, Stack, TextField, Typography, InputAdornment} from "@mui/material";
import { AlertDialog, SearchInput } from '@components/Misc';

export interface IUserInList {
    _id:string;
    name:string;
    email:string;
    status:"ACT"|"INA"|"BLQ";
    updated:string;
    rol:string;
}

interface IUsersData {
    items:Array<IUserInList>;
    itemsPerPage:number;
    page:number;
    total:number;
    totalPages:number;
}

const AccessManager = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const {data, isLoading, isError, isFetching, error, refetch} = useGetAllUsersQuery({page:currentPage, search},{refetchOnMountOrArgChange:true});
    const [updateUserStatus, {isError:isErrorUpdate, isLoading:loadingStatus, error:errorDesc}] = useUpdateUserStatusMutation();

    const HandleStatusUpd = async (currentStatus:'ACT'|'INA'|'BLQ', userId:string)  => {
        await updateUserStatus({userId, status:currentStatus});
        refetch();
    }

    const HandleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
      };

    return(
        <>
        <AdminLayout>
            <Typography variant="h6" sx={{ml:1, mb:'2vh'}}>Acceso de Usuarios</Typography>
            <Container sx={{display:'flex', justifyContent:'flex-end', my:1}} style={{paddingRight:0}}>
                <SearchInput handleSearchChange={HandleSearch} />
            </Container>

            {( (isLoading && data === undefined) || isFetching)
                ? <ContentLoadingIndicator mt={4} mb={4}/>
                :<>
                <AccessManagerTable usersList={(data as IUsersData).items} handleUpd={HandleStatusUpd} />
                <Container sx={{mt:'2vh', display:'flex', justifyContent:'center'}}>
                    <Stack spacing={2}>
                    <Pagination count={(data as IUsersData).totalPages} page={currentPage} shape="rounded" onChange={handleChange} />
                    </Stack>
                </Container>
                </> 
            }
            {isError  && <AlertDialog isOpen={isError} type='ERROR' title="Ups!" description={JSON.stringify(error)} />}

        </AdminLayout>
        </>
    )
}

export default AccessManager;