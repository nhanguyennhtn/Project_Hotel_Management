import React, { useEffect, useState } from 'react'
import '../assets/scss/home/Home.scss'
// import '../assets/scss/home/RoomPage.scss'
import { image0, image1, image2 } from '../assets/img/panner'
import Header from '../components/Header'
import { apiMotelsRead } from '../axios/axios'
import Footer from '../components/Footer'
import RoomPage from '../components/RoomPage'
import '../assets/scss/bootstrap.scss'
import CardPreview from '../components/CardPreview'
import NewsPage from '../components/NewsPage'

// import Rooms from '../components/Rooms'
export default function HomePage() {
    const [motels, setMotels] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
    }

    // const renderButton = (item) => {
    //     if (item.status === null || item.status === undefined) {
    //         return <p className='text-end'>
    //             <Link to={`/room/${item._id}`} state={item} className="btn btn-outline-primary" >Xem ngay</Link>
    //         </p>
    //     } else if (item.status === true) {
    //         return <p className='text-end'>
    //             <button className="btn" disabled>Đã được đặt</button>
    //         </p>
    //     } else if (item.status === false) {
    //         return <p className='text-end'>
    //             <button className="btn" disabled>Chờ phản hồi</button>
    //         </p>
    //     }
    // }

    return (
        <div>
            <Header />
            <div class=" bg-white p-0 height-img-title mt-4">
                <div className='home-wrapper '>
                    <div className='bg-white'>
                        {/* <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">style
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner shadow">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <img src={image0} className="d-block w-100 opacyti-img" alt="..." />
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
                        </div> */}
                        <div class="container-fluid p-0 mb-5">
                            <div id="header-carousel" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="w-100" src={image0} alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" >
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">try living</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Make your house become your home</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="w-100 opacyti-img" src={image1} alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" >
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">try living</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Simple, convenient room rental solution for everyone!</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <img class="w-100 opacyti-img" src={image2} alt="Image" />
                                        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                            <div class="p-3" >
                                                <h6 class="section-title text-white text-uppercase mb-3 animated slideInDown">try living</h6>
                                                <h1 class="display-3 text-white mb-4 animated slideInDown">Rent a room, create new space for your life!</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <CardPreview />
                        <RoomPage />

                    </div >
                </div >
                <NewsPage />
                <Footer />
            </div >
        </div >

    )
}
