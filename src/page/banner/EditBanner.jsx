import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@mui/material';
import './banner.css';
import { uploadFileS3 } from './uploadFileS3';

export default function EditBanner ({ id, onClose, currentBanner }) {
  const [bannerTitle, setBannerTitle] = React.useState(currentBanner.bannerTitle);
  const [shortDescription, setShortDescription] = React.useState(currentBanner.shortDescription);
  const [bannerImageUrl, setBannerUrl] = React.useState();
  const [selectStatus, setSelectStatus] = React.useState(currentBanner.status);
  const [selectedFile, setSelectedFile] = useState();
  const [fileDataURL, setFileDataURL] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChangeTitle = (e) => {
    setBannerTitle(e.target.value);
  };

  const handleInputChangeDes = (e) => {
    setShortDescription(e.target.value);
  };

  const handleInputChangeStatus = (e) => {
    setSelectStatus(e.target.value);
  };

  const handleEditBanner = async () => {
    if (!selectedFile) {
      alert('Please first select a file');
      return;
    }
    const imageUrl = await uploadFileS3(selectedFile);
    if (!imageUrl) {
      alert('Cannot upload file image');
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    const raw =
      {
        body: {
          id,
          bannerImageUrl: imageUrl,
          shortDescription,
          bannerTitle,
          status: selectStatus
        }
      };
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };
    fetch('https://intrustca.vn/api/admin/banner/update-banner', requestOptions)
      .then(response => response.json())
      .then(result => { })
      .catch(error => console.log('error', error));
    onClose();
    alert('Sửa banner thành công');
    window.location.reload();
  };

  useEffect(() => {
    let fileReader; let isCancel = false;
    if (selectedFile) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(selectedFile);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [selectedFile]);

  return (
    <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
    <div className="popupTable">
    <div className="popupTable-content">
        <div className="popupTable-header">
            Edit Banner
        </div>
            <div className="bannerRequest">
                <div className="bannerHeader">Tiêu đề banner :</div>
                <input type="email" className="responseText" id="title" placeholder="currentBanner.bannerTitle" value = {bannerTitle} onChange={handleInputChangeTitle}></input>
            </div>
            <div className="bannerRequest">
                <div className="bannerHeader">Mô tả ngắn :</div>
                <input type="email" className="responseText" id="title" placeholder="" value = {shortDescription} onChange={handleInputChangeDes}></input>
            </div>
            <div className="bannerRequest">
                  <label className='bannerHeader'>Trạng thái:</label>
                  <select id="selectStatus" className = "select" value={selectStatus} onChange={handleInputChangeStatus}>
                  <option value="ALLSTATUS">ALL STATUS</option>
                  <option value="NEW">NEW</option>
                  <option value="ACTIVED">ACTIVED</option>
                  <option value="EXPIRED">EXPIRED</option>
                </select>
               </div>
               <div className='bannerRequest'>
      <h2 className='bannerHeader'>Upload ảnh banner :</h2>
      <input type="file" onChange={handleFileChange} value = {bannerImageUrl} />
      {selectedFile && <img id="preview-image" src={fileDataURL} alt="example image"></img> }
   </div>

        </div>
        <div className="closeCreate">
            <Button variant="contained" onClick={handleEditBanner}>Save</Button>
            <Button variant="contained" onClick={onClose}>Close</Button>
        </div>
    </div>
    </Modal>
  );
}
