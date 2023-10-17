import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
const defaultTheme = createTheme();
export default function Header ({ toggleDrawer, open }) {
  const handleLogout = () => {
    const shouldLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
    if (shouldLogout) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshExpiredTime');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessExpiredToken');
      localStorage.removeItem('time');
      window.location.href = '/';
    }
  };
  return (
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                  pr: '24px'
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                      marginRight: '36px',
                      ...(open && { display: 'none' })
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Home
                </Typography>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    onClick={() => handleLogout()}
                    className="logout"
                >
                    Logout
                </Typography>
            </Toolbar>
        </AppBar>
  );
}
