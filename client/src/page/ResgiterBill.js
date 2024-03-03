import React, { useState } from 'react'
import FileBase64 from 'react-file-base64'
import { useLocation } from 'react-router-dom'
import { apiMotelsUpdate, apiUsersCreate } from '../axios/axios'
import '../assets/scss/home/RoomDetail.scss'
import { image4 } from '../assets/img/panner'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker"

export default function RegisterBill() {
    const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const room = useLocation().state
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm()
    const [image, setImage] = useState()
    const [rentalDeposit, setRentalDeposit] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date())
    const [licenseDate, setLicenseDate] = useState()

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)
    console.log(room);
    const handleBooking = async (data, e) => {
        e.preventDefault()
        const startDate = selectedDate.toLocaleDateString("vi-VN", options)
        const EndtDate = selectedDateEnd.toLocaleDateString("vi-VN", options)
        if (!image) return alert('Image is required')
        try {
            if (accountinfo) {
                const res = await apiUsersCreate({
                    ...data,
                    username: accountinfo._id,
                    room: room._id,
                    licenseDate: licenseDate,
                    rentalDeposit: rentalDeposit,
                    dateStart: startDate,
                    dateEnd: EndtDate,
                    prove: image,
                    date: ngay,
                    status: null
                })
                await apiMotelsUpdate({ _id: room._id, status: false })
                if (res) {
                    alert('Thông tin đang được xử lý, vui lòng chờ xác nhận!')
                    window.location.href = '/'
                }
            } else {
                window.confirm('Vui lòng đăng nhập hoặc đăng ký tài khoản!')
                window.location.href = '/login'
            }

        } catch (e) {
            console.log(e)
        }
    }

    const handleLicenseDate = (date) => {
        if (licenseDate) {
            const dateNow = moment()
            const licenseDateObj = moment(licenseDate)
            if (licenseDateObj.isValid() && licenseDateObj.isAfter(dateNow)) {
                alert('Ngày cấp chứng minh thư không hợp lệ.');
                setLicenseDate(ngay)
            }
        }
        return <div class="mb-3">
            <label for="licenseDate" class="form-label">Ngày cấp</label>
            <DatePicker required selected={licenseDate} className='mx-2 '
                onChange={(date) => setLicenseDate(date)} dateFormat="dd/MM/yyyy" placeholderText='Chọn ngày Cấp' />
            <label for="licenseAddress" class="form-label">Nơi cấp</label>
            <input required {...registerCreate('licenseAddress')}
                type="text" class="mx-2 ps-3" id="licenseAddress" placeholder='Nhập nơi cấp' />
        </div>
    }
    const showQR = () => {
        return <div className="mb-3">
            <div className='d-flex'><img className='img-QR' src={image4} alt='...' />
                {image && <img className='img-QR' src={image} alt='...' />}
            </div>
            <label htmlFor="image" className="form-label d-block">Ảnh minh chứng chuyển khoản</label>
            <FileBase64
                multiple={false}
                onDone={({ base64 }) => {
                    setImage(base64)
                }}
            />
        </div>
    }
    return (
        <div className='card container-sm'>
            <form onSubmit={handleSubmitCreate(handleBooking)} className='form col-7 m-4'>
                <div className='card-body my-4 text-center'>
                    <h5>Đăng ký đặt phòng</h5>
                </div>
                <div className='mb-3 RoomDetail-form-body'>
                    <div class="mb-3">
                        <label for="fullname" class="form-label">Họ và tên</label>
                        <input required {...registerCreate('fullname')}
                            type="text" class="form-control ps-3" id="fullname" placeholder='Nguyễn Văn A' />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input required {...registerCreate('phone')}
                            type="number" class="form-control ps-3" id="phone" placeholder='0390----99' />
                    </div>
                    <div class="mb-3">
                        <label for="IDcard" class="form-label">Chứng minh thư</label>
                        <input required {...registerCreate('IDcard')}
                            type="number" class="form-control ps-3" id="IDcard" placeholder='IdCard' />
                    </div>
                    {handleLicenseDate()}
                    <div className="mb-3">
                        <label for="cmt" class="form-label ">Hình thức thanh toán</label>
                        <select required {...registerCreate('pay')} class="form-select" aria-label="Default select example">
                            <option selected>Chọn hình thức thanh toán</option>
                            <option value="chuyển khoản">Chuyển khoản</option>
                            <option value="trực tiếp">Trực tiếp</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label for="cmt" class="form-label ">Gói thanh toán trả trước </label>
                        <select required {...registerCreate('costPackage')} class="form-select" aria-label="Default select example">
                            <option selected>Chọn gói</option>
                            <option value="1 tháng">1 tháng</option>
                            <option value="3 tháng">3 tháng</option>
                            <option value="1 năm">1 năm</option>
                        </select>
                    </div>
                    <div class="mb-3 ">
                        <label for="cmt" class="form-label ">Từ ngày: </label>
                        <DatePicker required selected={selectedDate} className='mx-2 '
                            onChange={(date) => setSelectedDate(date)} dateFormat="dd/MM/yyyy" placeholderText='Ngày bắt đầu' />
                        <label for="cmtm" class="form-label ">Đến ngày: </label>
                        <DatePicker required selected={selectedDateEnd} className='mx-2 '
                            onChange={(date) => setSelectedDateEnd(date)} dateFormat="dd/MM/yyyy" placeholderText='Ngày bắt kết thúc ' />
                    </div>
                    <div class="mb-3">
                        <label for="cmt" class="form-label col-2">Tiền cọc phòng: </label>
                        <div class="form-check form-check-inline col-3 ">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="thanhtoan" defaultValue="100 nghìn đồng" onChange={e => setRentalDeposit(e.target.value)} />
                            <label class="form-check-label" for="thanhtoan">100 nghìn đồng</label>
                        </div>
                        <div class="form-check form-check-inline col-3 ">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="thanhtoan2" defaultValue="500 nghìn đồng" onChange={e => setRentalDeposit(e.target.value)} />
                            <label class="form-check-label" for="thanhtoan2">500 nghìn đồng</label>
                        </div>
                        <div class="form-check form-check-inline col-3">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="selectPTTT" value="1 triệu đồng" onChange={e => setRentalDeposit(e.target.value)} />
                            <label class="form-check-label" for="selectPTTT">1 Triệu đồng</label>
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <div className='col-4'>
                            <label for="cmt" class="form-label ">Tên Phòng: </label>
                            <label className='mx-2 fs-6 fw-bold'>{room.title}</label>
                        </div>
                        <div className='col-5 mx-2'>
                            <label for="cmt" class="form-label ">Loại phòng: </label>
                            <label className='mx-2 fs-6 fw-bold'>{room.kind}</label>
                        </div>
                    </div>
                    {showQR()}
                </div>
                <div className='room-btn my-3 text-end '>
                    <button type='submit' class="btn btn-primary ">Đặt Phòng</button>
                </div>
            </form>
        </div>

    )
}