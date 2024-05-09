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
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'

// import Rooms from '../components/Rooms'
export default function HomePage() {
    const [motels, setMotels] = useState([])
    const [search, setSearch] = useState('')

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
    const [showAll, setShowAll] = useState(false)
    const itemToShow = showAll ? motels : motels.slice(0, 6)

    return (
        <div>
            <Header />
            <div class=" bg-white p-0 height-img-title ">
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

                        <div className='row w-100'>
                            <div class="container-xxl pb-5">
                                <div class="container">
                                    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                                        <h1 class="mb-5">Khám phá <span class="text-primary text-uppercase">dãy phòng</span></h1>
                                    </div>
                                    <div class="row g-4">
                                        {itemToShow.filter((item) => {
                                            return search.toLowerCase() === '' ? item : item.price.toLowerCase().includes(search)
                                        }).map((item, index) => (
                                            <div key={index} class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
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
                                                            <Link class="btn ms-auto w-100 btn-primary rounded py-2 px-4" to={`/room/${item._id}`} state={item} >Xem ngay</Link>
                                                            {/* {renderButton(item)} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )}
                                    </div>
                                    <div className='row p-2 mt-2'>
                                        <Link className='text-center fs-5 btn' to={'/room'}>Xem thêm...</Link>
                                    </div>
                                    {/* <div className='row p-2 mt-2'>
                                        {showAll ?
                                            <button className='text-center fs-5 btn delay-1' onClick={() => setShowAll(false)} to={'/room'}>Ẩn bớt...</button>
                                            :
                                            <button className='text-center fs-5 btn delay-1' onClick={() => setShowAll(true)} to={'/room'}>Xem thêm...</button>
                                        }
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* <CardPreview /> */}
                    </div >
                </div >
                <NewsPage />
                <Footer />
            </div >
        </div >

    )
}
