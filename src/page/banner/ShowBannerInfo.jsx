import React, { useEffect, useState } from 'react';
import './banner.css';
import { Button, Modal } from '@mui/material';

export default function ShowBannerInfo ({ id, onClose }) {
  const [banner, setBanner] = React.useState();
  const [open, setOpen] = React.useState(true);
  const [fileDataURL, setFileDataURL] = useState();
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };
  useEffect(() => {
    fetch(`https://intrustca.vn/api/admin/banner/get-banner/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setBanner(result.body);
      })
      .catch(error => console.log('error', error));
  }, []);
  return (
    <>
       {banner != null &&
        <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="popupTable">
        <div className="popupTable-content">
           <div className="headerBanner">
               Banner Information
           </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Tiêu đề banner :</div>
                   <div className='bannerBody'>{banner.bannerTitle}</div>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Mô tả ngắn :</div>
                   <div className='bannerBody'>{banner.shortDescription}</div>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Link banner :</div>
                   <div className='bannerLink'>{banner.bannerImageUrl}</div>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Ảnh banner :</div>
                   <img id="preview-image" src={banner.bannerImageUrl} alt="example image"></img>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Người đăng :</div>
                   <div className='bannerBody'>{banner.createdBy}</div>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Thời gian đăng :</div>
                   <div className='bannerBody'>{banner.createdTime}</div>
               </div>
               <div className="bannerRequest">
                   <div className="bannerHeader">Trạng thái :</div>
                   <div className='bannerBody'>{banner.status}</div>
               </div>
               <div className="closeBanner">
                            <Button variant="contained" onClick={onClose}>Close</Button>
                        </div>
               </div>
               </div>
                </Modal>
               }
    </>
  );
}
