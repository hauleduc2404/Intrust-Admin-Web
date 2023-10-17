import React from 'react';
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
export default function CreateBanner ({ onClose }) {
  const [bannerTitle, setBannerTitle] = React.useState();
  const [shortDescription, setShortDescription] = React.useState();
  const [bannerImageUrl, setBannerUrl] = React.useState();
  const [status, setStatus] = React.useState();
  const handleInputChangeTitle = (e) => {
    setBannerTitle(e.target.value);
  };
  const handleInputChangeDes = (e) => {
    setShortDescription(e.target.value);
  };
  const handleInputChangeUrl = (e) => {
    setBannerUrl(e.target.value);
  };
  const handleInputChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleCreateBanner = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const raw = JSON.stringify(
      {
        body: {
          bannerTitle,
          shortDescription,
          bannerImageUrl,
          status
        }
      }
    );
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(raw);
    fetch('http://localhost:8081/api/admin/banner/create-banner', requestOptions)
      .then(response => response.json())
      .then(result => { })
      .catch(error => console.log('error', error));
    onClose();
    alert('Tạo banner thành công');
    window.location.reload();
  };
  return (
    <div className="popupTable">
    <div className="popupTable-content">
        <div className="popupTable-header">
            Create API
        </div>
        {/* <div className="popupTable-center">
            <div className="apiRequest">
                <div className="apiHeader">API Url:</div>
                <input type="text" value={url} onChange={handleInputUrl} />
            </div> */}
            {/* <div className="apiRequest">
                <div className="apiHeader">Request:</div>
                <div className="apiRequestBody">
                    <div className="requestHeader">
                        <div className="requestHeader-top">RequestHeader:</div>
                        <textarea cols="15" rows="5" value={requestHeader} onChange={handleInputRequestHeaders}></textarea>
                    </div>
                    <div className="requestHeader">
                        <div className="requestHeader-top">RequestBody:</div>
                        <textarea cols="15" rows="5" value={requestBody} onChange={handleInoutRequestBody}></textarea>
                    </div>
                </div>
            </div> */}
            <div className="apiRequest">
                <div className="apiHeader">Response:</div>
                <textarea name="" id="" cols="20" rows="7" className="responseText"></textarea>
            </div>
            <div className="apiRequest">
                <Search>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder="Search..."
                        // value={searchText}
                        // onChange={handleSearchChange}
                    />
                </Search>
                <div className="apiHeader">Error:</div>
                <div className="errorBodyEdit">
                    <Paper className="tableSelectError">
                        <TableContainer>
                            <Table aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>ErrorCode</TableCell>
                                        <TableCell>ErrorName</TableCell>
                                        <TableCell>ErrorDescription</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {searchText != null ? (
                                        filteredError != null && filteredError.map((error) => (
                                            <TableRow key={error.errorId}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={checkboxState[error.errorId] || false}
                                                        onChange={(event) => handleCheckboxChange(event, error.errorId)}
                                                    />
                                                </TableCell>
                                                <TableCell>{error.errorCode}</TableCell>
                                                <TableCell>{error.errorName}</TableCell>
                                                <TableCell>{error.errorDescription}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        errorAll != null && errorAll.listError.map((error) => (
                                            <TableRow key={error.errorId}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={checkboxState[error.errorId] || false}
                                                        onChange={(event) => handleCheckboxChange(event, error.errorId)}
                                                    />
                                                </TableCell>
                                                <TableCell>{error.errorCode}</TableCell>
                                                <TableCell>{error.errorName}</TableCell>
                                                <TableCell>{error.errorDescription}</TableCell>
                                            </TableRow>
                                        ))
                                    )} */}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            </div>
        </div>
        <div className="closeEdit">
            <Button variant="contained">Create</Button>
            <Button variant="contained" onClick={onClose}>Close</Button>
        </div>
    </div>
  );
}
