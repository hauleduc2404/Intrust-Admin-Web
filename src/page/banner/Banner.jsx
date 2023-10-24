import React, { useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import { Box, Button, Modal, Container, Toolbar, CssBaseline, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../../components/header/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreateBanner from './CreateBanner';
import ShowBannerInfo from './ShowBannerInfo';
import EditBanner from './EditBanner';
import Login from '../login/Login';

const defaultTheme = createTheme();
export default function Banner() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('accessToken') != null);
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
  const [banner, setBanner] = React.useState();
  const [status, setStatus] = React.useState('ALLSTATUS');
  const [selectBanner, setSelectBanner] = React.useState();
  const [isPopupOpenInfo, setIsPopupOpenInfo] = React.useState(false);
  const [isPopupEdit, setIsPopupEdit] = React.useState(false);
  const handleOpenPopupEdit = () => {
    setIsPopupEdit(true);
  };
  const handleSelectBannerEdit = (u) => {
    handleOpenPopupEdit();
    setSelectBanner(u);
  };
  const handleClosePopupEdit = () => {
    setIsPopupEdit(false);
    setSelectBanner();
  };
  const handleSelectBanner = (a) => {
    openInfo();
    setSelectBanner(a);
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
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  useEffect(() => {
    fetch(`https://intrustca.vn/api/admin/banner/search?status=${status}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setBanner(result.body);
      })
      .catch(error => console.log('error', error));
  }, [status]);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const handleDeleteBanner = (id) => {
    const confirmDelete = window.confirm('Bạn chắc chắn muốn xóa banner?');
    if (confirmDelete) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
      const requestOption = {
        method: 'DELETE',
        redirect: 'follow',
        headers: myHeaders
      };

      fetch(`https://intrustca.vn/api/admin/banner/delete-banner/${id}`, requestOption)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
      window.location.reload();
    }
  };
  if (isLoggedIn) {
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
                    <h1 className="headerList">Danh sách banner</h1>
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120, marginTop: 5, marginBottom: 5 }}>
                      <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={status}
                        onChange={handleChange}
                      >
                        <MenuItem value="ALLSTATUS">ALL STATUS</MenuItem>
                        <MenuItem value="NEW">NEW</MenuItem>
                        <MenuItem value="ACTIVED">ACTIVED</MenuItem>
                        <MenuItem value="EXPIRED">EXPIRED</MenuItem>
                      </Select>
                    </FormControl>
                    <Button variant="contained" onClick={togglePopup}>Thêm banner</Button>
                    {isPopupOpen && <Modal
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                      <CreateBanner onClose={togglePopup} />
                    </Modal>}
                  </Toolbar>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Tiêu đề Banner</StyledTableCell>
                            <StyledTableCell>Link</StyledTableCell>
                            <StyledTableCell>Người đăng</StyledTableCell>
                            <StyledTableCell>Thời gian đăng</StyledTableCell>
                            <StyledTableCell>Mô tả ngắn</StyledTableCell>
                            <StyledTableCell>Trạng thái</StyledTableCell>
                            <StyledTableCell>Thao tác</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {banner != null && banner.map((a) => (
                            <TableRow key={a.id} >
                              <TableCell>{a.bannerTitle}</TableCell>
                              <TableCell>{a.bannerImageUrl}</TableCell>
                              <TableCell>{a.createdBy}</TableCell>
                              <TableCell>{a.createdTime}</TableCell>
                              <TableCell>{a.shortDescription}</TableCell>
                              <TableCell>{a.status}</TableCell>
                              <TableCell>
                                <DeleteIcon className='deleteIcon' onClick={() => handleDeleteBanner(a.id)} />
                                <EditIcon className='editIcon' onClick={() => handleSelectBannerEdit(a)} />
                                <InfoIcon className='infoIcon' onClick={() => handleSelectBanner(a)} />
                              </TableCell>
                            </TableRow>
                          ))}
                          {selectBanner && isPopupOpenInfo && <ShowBannerInfo id={selectBanner.id} onClose={closeInfo} />}
                          {selectBanner && isPopupEdit && <EditBanner id={selectBanner.id} onClose={handleClosePopupEdit} currentBanner={selectBanner} />}
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
  } else {
    return <Login />;
  }
};
