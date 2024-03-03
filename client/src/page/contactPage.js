import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { apiContactCreate } from '../axios/axios'
import '../assets/scss/home/Contact.scss'
import { image5 } from '../assets/img/panner'
export default function Contact() {
    const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();

    const [mess, setMess] = useState()
    const [fullname, setFullname] = useState()
    const [phone, setPhone] = useState()

    async function test(e) {
        e.preventDefault()
        const data = { fullname: fullname, phone: phone, desc: mess, ngay: today.toLocaleDateString("vi-VN", options) }
        await apiContactCreate({...data, username: accountinfo._id} )
        alert('Đã ghi nhận phản hồi')
        console.log(data, '--------------');

    }
    return (
        <div className='home-wrapper'>
            <Header />
            <div className='container-md my-4'>
                <div className='row'>
                    <div className='container-md my-3 col-6 contact-card '>
                        <img src={image5} alt='' />
                        <i class="bi bi-geo-alt"> 91/15, Đường 30/4, Quận Ninh Kiều, Tp Cần Thơ, Hưng Lợi, Ninh Kiều, Cần Thơ</i>
                    </div >
                    <form onSubmit={e => test(e)} className='form col-5  mx-auto contact-form-w' >
                        <div className='card-body my-4 d-flex align-items-center'>
                            <h5>Thông tin Phản hồi</h5>
                            <i class="bi bi-geo-alt"></i>
                        </div>
                        <div class="mb-3">
                            <label for="fullname" class="form-label">Họ và Tên</label>
                            <input required type="text" class="form-control" id="fullname" value={fullname} onChange={e => setFullname(e.target.value)} placeholder='Họ và tên của bạn' />
                        </div>
                        <div class="mb-3">
                            <label for="phonenumber" class="form-label">Số điện thoại</label>
                            <input required type="number" class="form-control" id="phonenumber" value={phone} onChange={e => setPhone(e.target.value)} placeholder='Số điện thoại của bạn' />
                        </div>
                        <div class="mb-3">
                            <label for="phonenumber" class="form-label">Nội dung</label>
                            <textarea required className="form-control" id="descCreate" rows="3" value={mess} onChange={e => setMess(e.target.value)} placeholder='Description'></textarea>
                        </div>
                        <button type='submit' class="btn btn-primary">Submit</button>
                    </form>

                </div >
            </div>
            <Footer />
        </div>
    )
}