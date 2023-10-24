import { Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import React from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import './Sidebar.css';
import { Link } from 'react-router-dom';
const drawerWidth = 240;
const Url = process.env.REACT_APP_API_URL;
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);
export default function Sidebar ({ toggleDrawer, open }) {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0 10px 20px',
          px: [1]
        }}
      >
        <img src='assets/img/ICON-INTRUSTCA.png' className='logoImg' />
        <span className='logoName'>Intrust Admin</span>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon className='iconHeader' />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <Link to={'/news'} className="linkTo">
          <ListItemButton sx={{ display: 'block' }}>
            <div className="list">
              <ListItemIcon >
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý tin tức" />
            </div>

          </ListItemButton>
        </Link>
        <Link to={'/banner'} className="linkTo">
          <ListItemButton sx={{ display: 'block' }}>
            <div className="list">
              <ListItemIcon >
                <ViewCarouselIcon />
              </ListItemIcon>
              <ListItemText primary="Quản trị banner" />
            </div>

          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
}
