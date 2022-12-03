//Logic
import {useState} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { useSearchQuery } from "@store/Services/Feed";
import { RootState, store } from '@store/store';
//Components
import Header from "@components/Header";
import { Container, styled, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IFeedItem } from '@store/Slices/feedSlice';
import { ContentLoadingIndicator } from "@components/Misc";

const SearchView = () => {
    const userId = (store.getState() as RootState).sec._id;
    const [ currentPage, setCurrentPage ] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const {data, isLoading, error, isError} = useSearchQuery({search:searchValue, userId}, {refetchOnFocus:false});

    const HandleSearch = async (e:unknown) =>{
      (e as {preventDefault: Function}).preventDefault();
      (e as {stopPropagation: Function}).stopPropagation();
      const { value } = (e as {target:{value:string}}).target;
      setSearchValue(value);
    }

    return (
    <>
      <Header title="Buscar Tutoriales" />
      <Container sx={{display:'flex', justifyContent:'center', mt:'8vh'}}> 
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={HandleSearch}
          />
        </Search>
      </Container>

      {isLoading?<ContentLoadingIndicator/>
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


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#efefef",
  '&:hover': {
    backgroundColor: "#efefef",
  },
  marginLeft: 0,
  width: '100%',
  alignSelf:'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
