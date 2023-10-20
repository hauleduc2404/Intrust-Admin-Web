import React, { useEffect } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar/Sidebar';
import { Box, Button, Modal, Container, Typography, Toolbar, CssBaseline, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
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

const defaultTheme = createTheme();
export default function Banner () {
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
  const handleSelectAPIEdit = (u) => {
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
    fetch('http://localhost:8081/api/admin/banner/get-all-banner', requestOptions)
      .then(response => response.json())
      .then(result => {
        setBanner(result.body);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }, []);
  console.log(banner);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [status, setStatus] = React.useState('');

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

      fetch(`http://localhost:8081/api/admin/banner/delete-banner/${id}`, requestOption)
        .then(response => response.json())
        .then(result => {
        })
        .catch(error => console.log('error', error));
      window.location.reload();
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12}>
                            <Toolbar className= "toolbarFlex">
           <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={status}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>ALL STATUS</em>
          </MenuItem>
          <MenuItem>NEW</MenuItem>
          <MenuItem>ACTIVED</MenuItem>
          <MenuItem>EXPIRED</MenuItem>
        </Select>
      </FormControl>
      <Button style={{
        marginTop: '20px',
        marginLeft: '20px',
        fontSize: '15px'
      }}
      variant="contained" color="success" onClick={togglePopup}>
        Thêm banner
      </Button>
      {isPopupOpen && <Modal
  open={open}
  onClose={ () => setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
 <CreateBanner onClose={togglePopup}/>
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
                                                    <TableRow key = {a.id} >
                                                        <TableCell>{a.bannerTitle}</TableCell>
                                                        <TableCell>{a.bannerImageUrl}</TableCell>
                                                        <TableCell>{a.createdBy}</TableCell>
                                                        <TableCell>{a.createdTime}</TableCell>
                                                        <TableCell>{a.shortDescription}</TableCell>
                                                        <TableCell>{a.status}</TableCell>
                                                        <TableCell>
                                                            <DeleteIcon className='deleteIcon' onClick={() => handleDeleteBanner(a.id)}/>
                                                            <EditIcon className='editIcon' />
                                                            {/* <EditIcon className='editIcon' onClick={() => handleSelectAPIEdit(a)} />
                                                            <InfoIcon className='infoIcon' onClick={() => handleSelectAPI(a)} /> */}
                                                        </TableCell>
                                                    </TableRow>
                                            ))}

                                                {/* {selectAPI && isPopupOpenInfo && <ShowAPIInfo id={selectAPI.apiId} onClose={closeInfo} />}
                                                {selectAPI && isPopupEdit && <EditAPI id={selectAPI.apiId} onClose={handleClosePopupEdit} currentAPI={selectAPI} />} */}
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
}
