/* eslint-disable import/no-absolute-path */
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { InputAdornment, TextField, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import './Sidebar.css';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    color: 'red',
    width: drawerWidth,
    boxSizing: 'border-box'
  }
}));

const SearchBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.typography.body2
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(1)
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  flexGrow: 1
}));

export default function Sidebar () {
  return (
    <StyledDrawer variant="permanent" anchor="left" >
        <a href="#" className="brand-link">
        <img className= "avatar" src={require('../../assets/img/avatar.png')} alt="Intrust Admin Logo" width="32" height="32"></img>
        <span className="brand-text">Intrust Admin</span>
      </a>
      <TextField
        id="search"
        type="search"
        label="Search"
        size="small"
        style={{ marginTop: '20px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
      <List >
      <Link to="/news" className="linkTo">
        <ListItem >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Quản trị bài đăng" />
        </ListItem>
        </Link>
        <Link to="/banner" className="linkTo">
        <ListItem>
          <ListItemIcon>
          <ImageIcon/>
          </ListItemIcon>
          <ListItemText primary="Quản trị banner" />
        </ListItem>
        </Link>
      </List>
    </StyledDrawer>
  );
}
