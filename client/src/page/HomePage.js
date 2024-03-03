import React, { useEffect, useState } from 'react'
import '../assets/scss/home/Home.scss'
// import '../assets/scss/home/RoomPage.scss'
import { image0, image1, image2 } from '../assets/img/panner'
import Header from '../components/Header'
import { apiMotelsRead } from '../axios/axios'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import RoomPage from '../components/RoomPage'

// import Rooms from '../components/Rooms'
export default function HomePage() {
    const [motels, setMotels] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
        console.log(res.motels, '.....................');
    }

    const renderButton = (item) => {
        if (item.status === null || item.status === undefined) {
            return <p className='text-end'>
                <Link to={`/room/${item._id}`} state={item} className="btn btn-outline-primary" >Xem ngay</Link>
            </p>
        } else if (item.status === true) {
            return <p className='text-end'>
                <button className="btn" disabled>Đã được đặt</button>
            </p>
        } else if (item.status === false) {
            return <p className='text-end'>
                <button className="btn" disabled>Chờ phản hồi</button>
            </p>
        }
    }
    return (
        <div className='home-wrapper'>
            <Header />
            <div className='container-md mt-4'>
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner shadow">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src={image0} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src={image1} className="d-block w-100" alt="..." />

                        </div>
                        <div className="carousel-item">
                            <img src={image2} className="d-block w-100" alt="..." />

                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <figure className="text-center mt-4">
                    <blockquote className="blockquote">
                        <p className='card-title fw-bold'>CẬP NHẬT GẦN NHẤT - NHÀ TRỌ SINH VIÊN</p>
                    </blockquote>
                </figure>
                <RoomPage />
            </div >
            <Footer />
        </div>
    )
}
