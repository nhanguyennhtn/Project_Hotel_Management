import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiAccountRegister } from '../axios/axios'
import './Register.scss'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Register() {
    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()


    const onSubmit = async data => {
        try {
            const res = await apiAccountRegister(data)
            if (res && res.status === true) {
                setMessage(res.message)
            }
        } catch (e) {
            setMessage(e.message)
        }
    }

    return (
        <div className=''>
            <Header />
            <div className='register-wapper'>
                <div className='mt-4'>
                    <div className="container-xxl card">
                        <section className=" d-flex flex-column align-items-center justify-content-center py-4">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-4 col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <div className="pt-4 pb-2">
                                                    <h5 className="card-title text-center pb-0 fs-4">Tạo tài khoản</h5>
                                                </div>
                                                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                                                    <div className="col-6">
                                                        <input {...register('firstName')} required maxLength={30} autoComplete='off'
                                                            type="text" className="form-control" id="firstName" placeholder='Tên' />
                                                        <div className="invalid-feedback">Vui lòng điền tên của bạn!</div>
                                                    </div>
                                                    <div className="col-6">
                                                        {/* <label htmlFor="lastName" className="form-label">Họ</label> */}
                                                        <input {...register('lastName')} required maxLength={30} autoComplete='off'
                                                            type="text" className="form-control" id="lastName" placeholder='Họ' />
                                                        <div className="invalid-feedback">Vui lòng điền Họ tên của bạn!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="input-group">
                                                            <input {...register('username')} required maxLength={30} minLength={6} autoComplete='off'
                                                                type="text" className="form-control" id="yourUsername" placeholder='Tên đăng nhập' />
                                                            <div className="invalid-feedback">Vui lòng điền tên đăng nhập!</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        {/* <label htmlFor="yourPassword" className="form-label">Mật khẩu</label> */}
                                                        <input {...register('password')} required maxLength={30} minLength={6} autoComplete='off'
                                                            type="password" className="form-control" id="yourPassword" placeholder='Mật Khẩu' />
                                                        <div className="invalid-feedback">Vui lòng điền mật khẩu!</div>
                                                    </div>
                                                    {/* <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" name="" type="checkbox" value="" id="acceptTerms" required />
                                                    <label className="form-check-label" htmlFor="acceptTerms">I agree and accept the <Link to="#">terms and conditions</Link></label>
                                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                                </div>
                                            </div> */}
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit">Đăng ký</button>
                                                    </div>
                                                    <span className={message?.includes('Success') ? 'text-center text-success' : 'text-center text-danger'}>
                                                        {message}
                                                    </span>
                                                    <div className="col-12">
                                                        <p className="small mb-0">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
