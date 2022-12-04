import { ChangeEvent } from 'react';
import { Container, styled, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchInputProps {
    handleSearchChange:(e: ChangeEvent<HTMLInputElement>) => void
}

const SearchInput = ({handleSearchChange}:ISearchInputProps) => {
    return(
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'Buscar' }}
            onChange={handleSearchChange}
          />
        </Search>
    )
}

export default SearchInput;


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
  