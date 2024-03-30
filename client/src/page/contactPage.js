import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { apiContactCreate } from '../axios/axios'
import '../assets/scss/home/Contact.scss'
import { useNavigate } from 'react-router-dom'
export default function Contact() {
    const [mess, setMess] = useState()
    const [fullname, setFullname] = useState()
    const [phone, setPhone] = useState()
    const Navigate = useNavigate()

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();

    async function test(e) {
        e.preventDefault()
        if (JSON.parse(window.sessionStorage.getItem('userInfo'))) {
            const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
            const data = { fullname: fullname, phone: phone, desc: mess, ngay: today.toLocaleDateString("vi-VN", options) }
            await apiContactCreate({ ...data, username: accountinfo._id })
            alert('Đã ghi nhận phản hồi')
        } else {
            if (window.confirm('Bạn cần đăng nhập để thực hiện!')) {
                Navigate('/login')
            }
        }
    }
    // const accountinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    // const data = { fullname: fullname, phone: phone, desc: mess, ngay: today.toLocaleDateString("vi-VN", options) }
    // await apiContactCreate({ ...data, username: accountinfo._id })
    // alert('Đã ghi nhận phản hồi')
    // console.log(data, '--------------');

    // }
    return (
        <div className='home-wrapper'>
            <Header />
            <div className='bg-white'>
                <div className='container-md card'>
                    <div class="text-center wow fadeInUp pt-4" data-wow-delay="0.1s">
                        <h6 class="section-title text-center text-primary text-uppercase">Contact</h6>
                        <h1 class="mb-3">Câu hỏi & <span class="text-primary text-uppercase">Liên hệ </span></h1>
                    </div>
                    <div className='row my-5'>
                        <div className='container-md my-4 col-6 contact-card '>
                            <iframe class="position-relative rounded w-100 h-100 map_info"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15676.733646510674!2d105.7736131!3d10.0346448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a08919f8927df5%3A0x28c8fc7a8cc25dc7!2zTkhBzIAgVFJPzKMgU0lOSCBWScOKTiAyMTgvMTdCIFRIxJAgQ8OCzIBOIFRIxqA!5e0!3m2!1svi-VN!2sus!4v1647148616358!5m2!1svi-VN!2sus"
                                frameborder="0" allowfullscreen="" aria-hidden="false"
                                tabindex="0"></iframe>
                            {/* <img src={image5} alt='' /> */}
                            <i class="bi bi-geo-alt"> 91/15, Đường 30/4, Quận Ninh Kiều, Tp Cần Thơ, Hưng Lợi, Ninh Kiều, Cần Thơ</i>
                        </div >
                        <form onSubmit={e => test(e)} className='form col-5  mx-auto contact-form-w ' >
                            <div className='card-body my-2 d-flex align-items-center'>
                                <h5 className='h5'>Thông tin Phản hồi</h5>
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
            </div>
            <Footer />
        </div>
    )
}