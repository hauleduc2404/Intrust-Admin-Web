import React, { useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { Box, CssBaseline, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Button, Container, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import "./news.css"
import EditNews from './EditNews';
const defaultTheme = createTheme();
export default function NewsPage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [news, setNews] = React.useState();
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('accessToken'));
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify(
    {
      "body": {
        "pageNumber": 0,
        "pageSize": 10,
        "criteriaRequest": {

        }
      }
    }
  );
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders,
    body: raw
  };
  useEffect(() => {
    fetch(`https://intrustca.vn/api/v1/get-news`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setNews(result.body.page.content);
      })
      .catch(error => console.error('error', error));
  }, []);
  const handleDeleteNews = (id) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      },
    };
    fetch('https://intrustca.vn/api/admin/delete-news/' + id, requestOptions)
      .then(response => {
        console.log(response);
        alert('xóa thành công')
        window.location.reload();
      })
      .catch(error => console.error(error))
  }
  const [isPopupEdit, setIsPopupEdit] = React.useState(false);
  const [selectNews, setSelectNews] = React.useState();
  const handleOpenPopupEdit = () => {
    setIsPopupEdit(true);
  }
  const handleSelectNews = (u) => {
    handleOpenPopupEdit();
    setSelectNews(u);
  }
  const handleClosePopupEdit = () => {
    setIsPopupEdit(false);
    setSelectNews();
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        <Header toggleDrawer={toggleDrawer} open={open} />
        <Sidebar toggleDrawer={toggleDrawer} open={open} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Tiêu đề bài đăng</StyledTableCell>
                    <StyledTableCell>Mô tả ngắn</StyledTableCell>
                    <StyledTableCell>Người đăng</StyledTableCell>
                    <StyledTableCell>Thời gian đăng</StyledTableCell>
                    <StyledTableCell>Thao tác</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {news != null && news.map((a) => (
                    <TableRow key={a.id} >
                      <TableCell>{a.newsTitle}</TableCell>
                      <TableCell>{a.shortDescription}</TableCell>
                      <TableCell>{a.createdBy} </TableCell>
                      <TableCell>{a.createdTime} </TableCell>
                      <TableCell>
                        <DeleteIcon className='deleteIcon' onClick={() => handleDeleteNews(a.id)} />
                        <EditIcon className='editIcon' onClick={() => handleEditNews(a)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}