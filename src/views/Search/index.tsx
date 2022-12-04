//Logic
import {useState, ChangeEvent} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { useSearchQuery } from "@store/Services/Feed";
import { RootState, store } from '@store/store';
//Components
import Header from "@components/Header";
import { Container } from '@mui/material';
import { IFeedItem } from '@store/Slices/feedSlice';
import { ContentLoadingIndicator, SearchInput} from "@components/Misc";

const SearchView = () => {
    const userId = (store.getState() as RootState).sec._id;
    const [ currentPage, setCurrentPage ] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const {data, isLoading, isFetching, error, isError} = useSearchQuery({search:searchValue, userId}, {refetchOnFocus:false});

    const HandleSearch = async (e:ChangeEvent<HTMLInputElement>) =>{
      setSearchValue(e.target.value);
    }

    return (
    <>
      <Header title="Buscar Tutoriales" />
      <Container sx={{display:'flex', justifyContent:'center', mt:'8vh'}}> 
          <SearchInput handleSearchChange={HandleSearch} />
      </Container>

      {isLoading || isFetching ?<ContentLoadingIndicator mt={6}/>
      :<FeedLoader viewMode="MAIN"
          data={(searchValue.length > 0) ? (data as Array<IFeedItem>) : []}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isError={isError}
          error={error}
          hidePagination={true}
          disableErrors={true}
        />
      }
    </>
    );
}

export default SearchView;

