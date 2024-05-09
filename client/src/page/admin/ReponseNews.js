import React, { useState, useEffect } from 'react'
import AdminHeader from './components/Header'
import ContentMenu from './components/ContentMenu'
import { apiMotelsRead, apiNewsDelete, apiNewsRead, apiNewsUpdate } from '../../axios/axios'
import ReactQuill from 'react-quill'
import '../../assets/scss/home/Home.scss'

export default function Reponse() {
    const [motels, setMotels] = useState([])
    const [news, setNews] = useState([])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
        const result = await apiNewsRead()
        setNews(result.newPages)
    }
    const handleConfirm = async (item) => {
        if (window.confirm("Phê duyệt!!")) {
            await apiNewsUpdate({ _id: item._id, status: true, date: ngay })
            fetchData()
        }
    }

    const handleCancel = async (item) => {
        if (window.confirm('Xác nhận Xóa bài?')) {
            await apiNewsDelete(item._id)
            fetchData()
        }
    }


    return (
        <div className='content-reponse'>
            <div className='wrapper'>
                <AdminHeader />
                <div class="container-fluid">
                    <div class="row">
                        <ContentMenu />
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 class="h4 ms-4">Danh sách đặt phòng</h1>
                            </div>
                            <table class="table table-bordered container-md my-4">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Họ tên  </th>
                                        <th scope="col">nội dung</th>
                                        <th scope="col">ngày đăng</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news?.length > 0 && news.filter(item => {
                                        return item.status != true
                                    }).map((item, index) => <tr>
                                        <th scope="row">{++index}</th>
                                        <td>{item.user.fullname}</td>
                                        <td><ReactQuill theme="bubble" value={item.desc} readOnly={true} className='react_qill_css'/></td>
                                        <td>{item.date}</td>
                                        <td>{item.img.map((img) =>
                                            <img style={{ width: 200, height: 100, objectFit: 'cover' }} src={img.preview} alt='' />
                                        )}</td>
                                        <td>
                                            <div className='mb-3 d-flex'>
                                                <button onClick={() => handleConfirm(item)} className='border-0 bg-light w-auto'><i class="bi bi-check-square-fill text-success fs-5"></i></button>
                                                <button onClick={() => handleCancel(item)} className=' ms-3 border-0 bg-light'><i class="bi bi-trash3-fill text-primary fs-5"></i></button>
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
