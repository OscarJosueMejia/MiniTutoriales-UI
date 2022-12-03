//Logic
import {useState} from 'react';
import { ICategories } from '@store/Slices/categorySlice';
import { useGetByStatusQuery } from '@store/Services/Category';
import { useByCategoryQuery } from '@store/Services/Feed';
import { RootState, store } from '@store/store';
//Components
import { Typography, Container, IconButton } from "@mui/material";
import Header from "@components/Header";
import { FeedLoader } from '@views/Feed/FeedLoader';
import { CategoryCard } from "@components/Feed";
import { ContentLoadingIndicator } from '@components/Misc';
import ReplayIcon from '@mui/icons-material/Replay';
import { FeedData } from '@store/Slices/feedSlice';

const FeedByCategory = () => { 
    const userId = (store.getState() as RootState).sec._id;
    const [ currentPage, setCurrentPage ] = useState(1);

    const [categorySelected, setCategorySelected] = useState<string|number>();
    const [categoryDescription, setCategoryDescription] = useState<string>("Selecciona una Categoría");

    const {data:dataForCategories, isLoading:loadingCategories, refetch} = useGetByStatusQuery({status:'ACT'});
    const {data:dataForFeed, isLoading:loadingFeed, isError, error, refetch:refetchFeed} = useByCategoryQuery({categoryId:categorySelected as string, page:currentPage, currentUserLogged:userId});
    
    const handleCategoryChange = (id:string|number, description:string) => {
        setCategorySelected(id);
        setCategoryDescription(description);
        refetchFeed();
    }
    
    return(
        <>
            <Header title="Categorías"  />
            {loadingCategories && dataForCategories === undefined ?  <ContentLoadingIndicator/>
                :<><Container style={{display:'flex', flexDirection:'row', justifyContent:"center",  flexWrap:'wrap', marginTop:'8vh'}}>
                        {(dataForCategories as Array<ICategories>).map(category =>{
                            if(category.status === 'ACT'){
                                return (
                                    <CategoryCard title={category.title} 
                                    description={category.description}
                                    _id={category._id} 
                                    status="ACT" 
                                    handleClick={handleCategoryChange} 
                                    selected={categorySelected === category._id}/>
                                )
                            }
                            })
                        }
                        <IconButton sx={{position:'relative', alignSelf:'center'}} onClick={()=>{refetch();}} ><ReplayIcon/></IconButton>
                    </Container>
                    <Container><Typography sx={{textAlign:'center', mt:2}}>{categoryDescription}</Typography></Container>
                    {dataForFeed !== undefined &&
                        <FeedLoader viewMode="MAIN"
                            data={(dataForFeed as FeedData).items}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            isLoading={loadingFeed}
                            isError={isError}
                            error={error}
                        />
                    }
                </>
            }
        </>
    )
}

export default FeedByCategory;