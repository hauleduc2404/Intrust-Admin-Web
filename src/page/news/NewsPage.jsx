import React, { useEffect } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import "./news.css"
import EditNews from './EditNews';
import Login from '../login/Login';
const defaultTheme = createTheme();
export default function NewsPage() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('accessToken') != null);
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
  if(isLoggedIn){
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                  <Toolbar className="toolbarFlex">
                    <h1 className="headerList">Danh sách các tin tức</h1>
                    <Link to={'/createNews'}>
                      <Button variant='contained'>Create News</Button>
                    </Link>
                  </Toolbar>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Tiêu đề bài đăng</TableCell>
                            <TableCell>Mô tả ngắn</TableCell>
                            <TableCell>Người đăng</TableCell>
                            <TableCell>Thời gian đăng</TableCell>
                            <TableCell>Thao tác</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {news != null && news.map((n) => (
                            <TableRow key={n.id}>
                              <TableCell>{n.newsTitle}</TableCell>
                              <TableCell>{n.shortDescription}</TableCell>
                              <TableCell>{n.createdBy}</TableCell>
                              <TableCell>{n.createdTime}</TableCell>
                              <TableCell>
                                <DeleteIcon className='deleteIcon' onClick={() => handleDeleteNews(n.id)} />
                                <EditIcon className='editIcon' onClick={() => handleSelectNews(n)} />
                              </TableCell>
                            </TableRow>
                          ))}
                          {selectNews && isPopupEdit && <EditNews id={selectNews.id} onClose={handleClosePopupEdit} />}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }else{
    return <Login />
  }
}