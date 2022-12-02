//Logic
import {useState} from 'react';
import { FeedLoader } from '@views/Feed/FeedLoader';
import { IFeedItem } from "@store/Slices/feedSlice";
import { useDispatch } from "react-redux";
import { useLazySearchQuery } from "@store/Services/Feed";
import { selectSearchFeedItems, setSearchFeedItems } from '@store/Slices/searchFeed';
import { RootState, store } from '@store/store';
//Components
import Header from "@components/Header";
import { Container, styled, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchView = () => {
    const userId = (store.getState() as RootState).sec._id;
  
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ TriggerFeedBySearch, {isLoading, isError, error}] = useLazySearchQuery()
    const dispatch = useDispatch();

    const HandleSearch = async (e:unknown) =>{
      (e as {preventDefault: Function}).preventDefault();
      (e as {stopPropagation: Function}).stopPropagation();
      const { value } = (e as {target:{value:string}}).target;

      if (value !== ""){
        const { data:newData } = await TriggerFeedBySearch({search:value, userId});
        dispatch(setSearchFeedItems({
          items: newData as Array<IFeedItem>,
        }));
      }else{
        dispatch(setSearchFeedItems({
          items: [],
        }));
      }
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
      <FeedLoader viewMode="MAIN"
        hideLoaderBtn={ true }
        querySelector={selectSearchFeedItems}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
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
