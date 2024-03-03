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

                        {/* <form onSubmit={handleBooking} className='form col-5'>
                        <div className='card-body my-4 '>
                            <h5>Nhập thông tin đặt phòng</h5>
                        </div>
                        <div className='mb-3 RoomDetail-form-body'>
                            <div class="mb-3">
                                <label for="fullname" class="form-label">Họ và tên</label>
                                <input required value={fullname} onChange={e => setFullname(e.target.value)}
                                    type="text" class="form-control ps-3" id="fullname" />
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">Số điện thoại</label>
                                <input required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                    type="number" class="form-control ps-3" id="phone" />
                            </div>
                            <div class="mb-3">
                                <label for="cmt" class="form-label">Chứng minh thư</label>
                                <input required value={CMT} onChange={e => setCMT(e.target.value)}
                                    type="number" class="form-control ps-3" id="cmt" />
                            </div>
                            <div className='mb-3 QR'>
                                Quét mã QR để thanh toán:
                                <div className='d-flex'>
                                    <img className='me-4' src={image4} alt='...' />
                                    {image && <img src={image} alt='...' />}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label d-block">Ảnh minh chứng chuyển khoản</label>
                                <FileBase64
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setImage(base64)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='room-btn my-3 text-end'>
                            <button type='submit' class="btn btn-primary ">Đặt Phòng</button>
                        </div>
                    </form> */}

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
                                        <label className='text-right mx-3 p-2'><i class="bi bi-geo-alt-fill "></i> 91/15, Đường 30/4, Quận Ninh Kiều, Tp Cần Thơ, Hưng Lợi, Ninh Kiều, Cần Thơ</label>
                                    <div className='card p-2 border-primary m-3 row'>
                                        <div className='' >
                                            <img src={image5} className='h-50'/>
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