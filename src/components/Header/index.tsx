import { Box, AppBar, Toolbar, IconButton, Typography, InputBase} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
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

interface IHeaderOptions {
  title?:string;
  showActionBtn?:boolean;
  btnTitle?:string;
  btnLoading?:boolean;
  btnAction?:()=>void;
  showSearchBar?:boolean;
  searchBarOnChange?:(e:unknown)=>void;
}


const Header = (props:IHeaderOptions) => {
    const {showActionBtn, showSearchBar, title, btnAction, btnTitle, btnLoading, searchBarOnChange} = props;

    return(
        <Box sx={{ flexGrow: 1, marginBottom:4 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: {sm: 'block' } }}
            >
              {title}
            </Typography>
            
            {showSearchBar ?
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={searchBarOnChange}
                />
              </Search>
              :null
            }
            {
              showActionBtn ?  <LoadingButton color="inherit" onClick={btnAction} endIcon={<CheckIcon />} loading={btnLoading} loadingPosition='end'>{btnTitle}</LoadingButton>
              :null
            }
           
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header;