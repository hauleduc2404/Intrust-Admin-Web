import React, { useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { Box, CssBaseline, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const defaultTheme = createTheme();
export default function NewsPage () {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [news, setNews] = React.useState();
  const [isPopupOpenInfo, setIsPopupOpenInfo] = React.useState(false);
  const [selectAPI, setSelectAPI] = React.useState();
  const handleSelectAPI = (a) => {
    openInfo();
    setSelectAPI(a);
  };
  const openInfo = () => {
    setIsPopupOpenInfo(true);
  };
  const closeInfo = () => {
    setIsPopupOpenInfo(false);
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const [isPopupEdit, setIsPopupEdit] = React.useState(false);
  const handleOpenPopupEdit = () => {
    setIsPopupEdit(true);
  };
  const handleEditNews = (u) => {
    handleOpenPopupEdit();
    setSelectAPI(u);
  };
  const handleClosePopupEdit = () => {
    setIsPopupEdit(false);
    setSelectAPI();
  };
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  const requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders
  };
  useEffect(() => {
    fetch('http://localhost:8081/api/v1/get-all-news', requestOptions)
      .then(response => response.json())
      .then(result => {
        setNews(result.body);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }, []);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleDeleteNews = (id) => {
    const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa tin?');
    if (confirmDelete) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const requestOption = {
        method: 'DELETE',
        redirect: 'follow',
        headers: myHeaders
      };

      fetch(`http://localhost:8081/api/admin/delete/${id}`, requestOption)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
      window.location.reload();
      console.log(news);
    }
  };
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
              overflow: 'auto',
              marginTop: '100px'
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
                                                    <TableRow key = {a.id} >
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
