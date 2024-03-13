import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { apiMotelsUpdate } from '../axios/axios'
import Header from '../components/Header'
import '../assets/scss/home/RoomDetail.scss'
import { image5, image7 } from '../assets/img/panner'
import Footer from '../components/Footer'
import ReactQuill from 'react-quill'
import '../assets/scss/admin/Update.scss'

function Rooms() {
    const room = useLocation().state
    const [fullname, setFullname] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [CMT, setCMT] = useState()
    const [image, setImage] = useState()

    const handleBooking = async (e) => {
        e.preventDefault()
        if (!image) return alert('Image is required')
        const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
        const ngay = new Date()
        if (userInfo) {
            const data = {
                ...room, _id: room._id, username: userInfo.username,
                fullname, phoneNumber, CMT, minhchung: image, status: false, ngay: ngay
            }
            const res = await apiMotelsUpdate(data)
            if (res) {
                alert('Đặt phòng thành công, vui lòng chờ xác nhận')
                window.location.href = '/'
                setFullname()
                setPhoneNumber()
                setCMT()
                setImage()
            }
        } else {
            window.location.href = '/login'
        }
    }

    return (
        <div className="room-wrapper">
            <div>
                <Header />
            </div>
            <div className='card mt-4'>
                <div className='card container-md mt my-5 '>
                    <div className='row'>
                        <div class="col-7">
                            <div class="card-body reactqill-fix">
                                <h5 class="card-title"> Phòng {room.title}</h5>
                                <h6 className='fs-5'> Giới thiệu</h6>
                                <p class="card-text">
                                    <ReactQuill value={room.desc} readOnly={true} theme="bubble" />
                                </p>
                                <div className='price text-success fs-5 mb-2'>
                                    Giá: {room.price}/tháng
                                </div>
                                <img src={room.image} class="card-img-top img-fluid" alt='...' />
                            </div>

                        </div>
                        <div className='col-5'>
                            <div className=' mt-4 '>
                                <div className='card shadow-sm'>
                                    <div className='d-flex p-2'>
                                        <img src={image7} className='img rounded-0 rounded-circle avatar '></img>
                                        <p className='mx-3 mt-2 fw-bold fs-5'>Nhã Nguyễn<i class="bi bi-check-circle mx-4 "></i></p>
                                    </div>
                                    <label className='text-right mx-3'>Liên hệ trực tiếp</label>
                                    <div className='card p-2 border-primary m-3 row'>
                                        <div className='col-7 fs-5 fst-ilatic ' >
                                            <i class="bi bi-telephone-fill mx-3 tick fs-5 "> </i>
                                            0396984478
                                        </div>
                                        {/* <input className='col'> </input> */}
                                        {/* <p className='col'>Liên hệ trực tiếp</p> */}
                                    </div>
                                    <div className='d-flex mx-4 ms-auto '>
                                        <i class="bi bi-facebook p-2 fs-1 facebook"></i>
                                        <i class="bi bi-chat-dots-fill p-2 fs-1 chat"></i>
                                        <i class="bi bi-telegram p-2 fs-1 telegram"></i>
                                    </div>
                                </div>
                            </div>
                            <div className=' mt-4 '>
                                <div className='card shadow-sm'>
                                    <div className='d-flex p-2'>
                                        {/* <img src={image7} className='img rounded-0 rounded-circle avatar '></img> */}
                                        <p className='mx-3 mt-2 fw-bold fs-5'>Motel<i class="bi bi-check-circle mx-4 "></i></p>
                                    </div>
                                    <label className='text-right mx-3 p-2'><i class="bi bi-geo-alt-fill "></i> Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam</label>
                                    <div className='card p-2 border-primary m-3 row'>
                                        <div className='' >
                                            <iframe class="position-relative rounded w-100 h-100 map_info"
                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.733646510674!2d105.7736131!3d10.0346448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08919f8927df5%3A0x28c8fc7a8cc25dc7!2zTkhBzIAgVFJPzKMgU0lOSCBWScOKTiAyMTgvMTdCIFRIxJAgQ8OCzIBOIFRIxqA!5e0!3m2!1svi-VN!2sus!4v1647148616358!5m2!1svi-VN!2sus"
                                                frameborder="0" allowfullscreen="" aria-hidden="false"
                                                tabindex="0"></iframe>
                                        </div>
                                        {/* <input className='col'> </input> */}
                                        {/* <p className='col'>Liên hệ trực tiếp</p> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='btn '>
                            <Link to={`/bill`} state={room} className='btn btn-success'>Đăng ký đặt phòng</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}

export default Rooms;