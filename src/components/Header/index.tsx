import { Box, AppBar, Container, Toolbar, Typography, InputBase, Button} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

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
  btnIconType?:'CHECK'|'ADD'|'UPD';
  showSearchBar?:boolean;
  searchBarOnChange?:(e:unknown)=>void;
}


const Header = (props:IHeaderOptions) => {
    const {showActionBtn, showSearchBar, title, btnAction, btnTitle, btnIconType, searchBarOnChange} = props;
    let iconForButton;
    switch (btnIconType){
      case 'CHECK':
        iconForButton=<CheckIcon sx={{mt:-0.4}}/>
      break;
      case 'ADD':
        iconForButton=<AddIcon sx={{mt:-0.4}}/>
      break;
      case 'UPD':
        iconForButton=<EditIcon sx={{mt:-0.4}}/>
      break;
      default:
        iconForButton=<></>
      ;
    }

    return(
        <Box sx={{ flexGrow: 1, marginBottom:4 }}>
        <AppBar position="fixed">
          <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: {display:'flex', alignItems:'center' } }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/3176/3176369.png" alt="mini.png" width='30px' style={{marginRight:'0.5rem'}} />
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
              showActionBtn ?  <Button color="inherit" onClick={btnAction} endIcon={iconForButton}>{btnTitle}</Button>
              :null
            }
           
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Header;