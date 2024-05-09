import React, { useEffect, useState } from 'react'
import '../../assets/scss/home/Home.scss'
import Header from '../../components/Header'
import RoomPage from '../../components/RoomPage'
import Footer from '../../components/Footer'
import { apiMotelsRead } from '../../axios/axios'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'

import '../../assets/scss/bootstrap.scss'
export default function Room() {
    const [Motels, setMotels] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
    }
    const renderButton = (item) => {
        if (item.status === null || item.status === undefined) {
            return <Link class="btn btn-sm btn-dark rounded py-2 px-4" to={'/bill'} state={item} >Đặt phòng</Link>

        } else if (item.status === true) {
            return <button className="btn btn-sm btn-dark rounded py-2 px-4" disabled>Đã được đặt</button>

        } else if (item.status === false) {
            return <button className="btn btn-sm btn-dark rounded py-2 px-4" disabled>Chờ phản hồi</button>

        }
    }
    return (
        <div>
            <Header />
            <div className='home-wrapper'>
                <div className=' card pt-4'>
                    <div className='container-xxl pb-5'>
                        <div className='container'>
                            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                                <h1 class="mb-5">Khám phá <span class="text-primary text-uppercase">dãy phòng ghép</span></h1>
                            </div>
                            <div className='row g-4'>
                                {Motels.filter((item) => {
                                    return item.kind === 'Phòng ghép'
                                }).map((item) => {
                                    return (
                                        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                            <div class="room-item shadow rounded overflow-hidden">
                                                <div class="position-relative">
                                                    <img class="img-fluid img" src={item.image} alt="" />
                                                    <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-2 px-3 ms-4">{Intl.NumberFormat('vi-VN').format(item.price)} VNĐ/Tháng</small>
                                                </div>
                                                <div class="p-4 mt-2">
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <h5 class="mb-0">{item.title}</h5>
                                                        <div class="ms-2">
                                                            <small class="bi bi-star-fill text-primary ms-1"></small>
                                                            <small class="bi bi-star-fill text-primary ms-1"></small>
                                                            <small class="bi bi-star-fill text-primary ms-1"></small>
                                                            <small class="bi bi-star-fill text-primary ms-1"></small>
                                                            <small class="bi bi-star-fill text-primary ms-1"></small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex mb-3">
                                                        <small class="border-end me-3 pe-3"><i class="bi bi-house-fill text-primary me-2"></i>{item.kind}</small>
                                                        <small class="border-end me-3 pe-3"><i class="bi bi-geo-alt-fill text-primary me-2"></i>{item.area}</small>
                                                        <small><i class="bi bi-arrows text-primary me-2"></i>{item.size}</small>
                                                    </div>
                                                    {/* <p class="text-body mb-3">Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem sed diam stet diam sed stet lorem.</p> */}
                                                    <ReactQuill theme="bubble" value={item.desc} readOnly={true} />
                                                    <div class="d-flex justify-content-between">
                                                        <Link class="btn btn-sm btn-primary rounded py-2 px-4" to={`/room/${item._id}`} state={item} >Xem ngay</Link>
                                                        {/* <Link class="btn btn-sm btn-dark rounded py-2 px-4" to={'/bill'} state={item} >Đặt phòng</Link> */}
                                                        {renderButton(item)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div >

                <Footer />
            </div>
        </div>

    )
}
