import React, { useEffect, useState } from 'react'
import { image1, image2, image3, image7 } from '../../assets/img/panner'
import Header from '../../components/Header'
import FileBase64 from 'react-file-base64'
import ReactQuill from 'react-quill'
import '../../assets/scss/home/news.scss'
import { apiNewsCreate, apiUsersRead } from '../../axios/axios'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function NewPageCreate() {
    const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const [value, setValue] = useState()
    const [images, setImages] = useState([]);
    const [info, setInfo] = useState([]);
    const Negative = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        setInfo(res.user)
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)
    const submitCreateNews = () => {
        info.filter((item) => {
            return item.username._id === accountinfo._id && item.status === true
        })?.map(async (item) => {
            const res = await apiNewsCreate({
                user: item._id,
                desc: value,
                img: images,
                date: ngay,
                status: false
            })
        })
        alert('Đăng bài thành công')
        Negative('/news')
    }
    return (
        <div className='add-news-page'>
            <Header />
            <div className=' height_news bg-white news-wrapper'>
                <div className='container-md height_news pb-3 pt-2'>
                    <div className='row justify-content-center'>
                        <div className='d-flex p-2 gap-2 card'>
                            <div className='col-7 card'>
                                <div className='fadeInUp pt-4 d-flex ms-2'>
                                    <img src={image7} className='avatar rounded-0 rounded-circle img w-auto' alt='' />
                                    <h6 className='section-title pt-3 ps-3 text-uppercase  align-items-center'>{accountinfo.username}</h6>
                                </div>
                                <div className='nav-item py-3'>
                                    <ReactQuill theme='snow' value={value} onChange={setValue} placeholderText='hhh'/>
                                    <FileBase64
                                        multiple={true}
                                        onDone={(files) => {
                                            const newImages = files.map(file => ({
                                                base64: file.base64,
                                                preview: file.base64
                                            }));
                                            setImages([...images, ...newImages])
                                        }}
                                    />
                                    <div>
                                        {images?.map((image, index) => (
                                            <img key={index} src={image.preview} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                                        ))}
                                    </div>
                                </div>
                                <div className='pb-3 ms-auto'>
                                    <Link class="btn btn-sm btn-dark rounded py-2 px-4" to={'/news'} >Hủy</Link>
                                    <button onClick={() => submitCreateNews()} class="btn btn-sm btn-primary rounded py-2 px-4 m-2" to={'/news'} >Đăng tin</button >
                                </div>
                            </div>
                            <div className='col-5'>
                                {/* <img src={image2} style={{width: 100 + '%', height: 300}} alt=''></img> */}
                            </div>
                        </div>
                    </div>


                </div>
            </div >
            <Footer />
        </div >
    )
}