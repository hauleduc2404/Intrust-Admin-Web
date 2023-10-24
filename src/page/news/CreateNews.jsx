import { Box, Button, Container, CssBaseline, Grid, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useEffect } from 'react';
import "./news.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Login from '../login/Login';

const defaultTheme = createTheme();

export default function CreateNews() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('accessToken') != null);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image"]
        ]
    }
    const [type, setType] = React.useState('');
    const [thumb, setThumb] = React.useState('');
    const [upload, setUpload] = React.useState('');
    const [img, setImg] = React.useState('');
    const [image, setImage] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [shortDescription, setShortDescription] = React.useState('');
    const [content, setContent] = React.useState('');
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setType(file.type.slice(-3))
        setImg(file);
    };
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleShortDescriptionChange = (e) => {
        setShortDescription(e.target.value);
    }
    const thumbnailUpload = document.getElementById('urlImageThumb');
    useEffect(() => {
        if (type) {
            fetch(`https://intrustca.vn/api/v1/generate-upload-url?type=${type}`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    setThumb(data.body.fileUrl);
                    setUpload(data.body.presignedUrl);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [type])
    useEffect(() => {
        if (img && upload) {
            var requestOptions = {
                method: 'PUT',
                body: thumbnailUpload.files[0],
                redirect: 'follow'
            };
            fetch(upload, requestOptions)
                .then(response => {
                    return response;
                })
                .then(data => {
                    setImage(thumb);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [img, upload])
    const handleSaveNews = () => {
        if (image) {
            var data = {
                "body": {
                    "newsTitle": title,
                    "shortDescription": shortDescription,
                    "thumbUrl": image,
                    "newsDetailDTO": {
                        "newsContent": content
                    },
                }
            }
            var requestOptions = {
                method: 'POST',
                body: JSON.stringify(data),
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
            };
            fetch('https://intrustca.vn/api/admin/create-news', requestOptions)
                .then((response) => response.json())
                .then(data => {
                    alert('Tạp mới tin tức thành công');
                    window.location.reload();
                })
                .catch((err) => console.error(err))
        }
    }
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
                                <Grid item xs={12} md={12} lg={12} sx={{ overflow: 'auto' }}>
                                    <Toolbar className="toolbarFlex">
                                        <h1 className="headerList">Tạo tin tức</h1>
                                    </Toolbar>
                                    <div className="createNewsDetail">
                                        <label htmlFor="">Tiêu đề</label>
                                        <input type="text" value={title} onChange={handleTitleChange} />
                                    </div>
                                    <div className="createNewsDetail">
                                        <label htmlFor="">Mô tả ngắn</label>
                                        <input type="text" value={shortDescription} onChange={handleShortDescriptionChange} />
                                    </div>
                                    <div className="createNewsDetail">
                                        <label>Ảnh thumbnail</label>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="urlImageThumb" onChange={handleImageChange} />
                                            </div>
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="thumbnailUpload" data-target="#modalAlertCreateUpload" data-toggle="modal">Upload</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="createNewsDetail">
                                        <label>News Detail: </label>
                                        <div className="row">
                                            <div className="editor">
                                                <ReactQuill theme="snow" value={content}
                                                    onChange={setContent}
                                                    className="editor-input"
                                                    modules={modules}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btnSave" onClick={handleSaveNews}>Save</div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider >
        )
    }else{
        return <Login />
    }
}