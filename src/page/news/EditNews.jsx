import { Button } from "react-bootstrap"
import "./news.css"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useEffect } from "react";
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
export default function EditNews({ onClose, id }) {
    const [title, setTitle] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [content, setContent] = useState();
    const [thumb, setThumb] = useState();
    const [detail, setDetail] = useState();
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        };
        fetch(`https://intrustca.vn/api/admin/get-news/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data.body);
                setTitle(data.body.newsTitle);
                setShortDescription(data.body.shortDescription);
                setThumb(data.body.thumbUrl);
                setContent(data.body.newsDetailDTO.newsContent);
                setDetail(data.body.newsDetailDTO.id)
            })
            .catch(err => console.error(err));
    }, [id])
    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleInputDes = (e) => {
        setShortDescription(e.target.value);
    }
    const handleChangeImg = (e) => {
        setThumb();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setThumb(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSaveNews = () => {
        var data = {
            "body": {
                "id": id,
                "newsTitle": title,
                "shortDescription": shortDescription,
                "thumbUrl": thumb,
                "newsDetailDTO": {
                    "newsContent": content,
                    "id": detail
                },
            }
        }
        console.log(data)
        var requestOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
              },
        };
        fetch('https://intrustca.vn/api/admin/update-news', requestOptions)
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                console.log('Cập nhật tin tức thành công')
            })
            .catch((err) => console.error(err))
    }
    return (
        <div className="popupTable">
            <div className="popupTable-content">
                <div className="popupTable-header">
                    Edit News
                </div>
                <div className="popupTable-center">
                    <div className="createNewsDetail">
                        <label htmlFor="">Tiêu đề</label>
                        <input type="text" value={title} onChange={handleInputTitle} />
                    </div>
                    <div className="createNewsDetail">
                        <label htmlFor="">Mô tả ngắn</label>
                        <input type="text" value={shortDescription} onChange={handleInputDes} />
                    </div>
                    <div className="createNewsDetail">
                        <label>Ảnh thumbnail</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="urlImageThumb" onChange={handleChangeImg} />
                                <img src={thumb} alt="" />
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
                </div>
                <div className="closeEdit">
                    <Button variant="contained" onClick={handleSaveNews}>Save</Button>
                    <Button variant="contained" onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    )
}