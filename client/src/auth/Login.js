import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiAccountLogin } from '../axios/axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Register.scss'

export default function LoginPage() {
    const { register, handleSubmit } = useForm()
    const [errMessage, setErrMessage] = useState()

    const onSubmitLogin = async data => {
        try {
            const res = await apiAccountLogin(data)
            if (res && res.status === true) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.user))                
                if (res.user.username === 'nhanguyen') {
                    window.location.href = '/admin'
                } else if (res.user.role === 2) {
                    window.location.href = '/camera'
                } else {
                    window.location.href = '/'
                }
            }
        } catch (e) {
            setErrMessage(e.message)
        }
    }

    return (
        <div>
            <Header />
            <div className='register-wapper card container-xxl'>
                <div className="container mt-4">
                    <section className=" d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-4 col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Đăng nhập tài khoản</h5>
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmitLogin)} className="row g-3">
                                                <div className="col-12">
                                                    <div className="input-group">
                                                        <input {...register('username')} required maxLength={30} minLength={6} autoComplete='off'
                                                            type="text" className="form-control" id="yourUsername" placeholder='Tên đăng nhập' />
                                                        <div className="invalid-feedback">Please enter your username.</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <input {...register('password')} required maxLength={30} minLength={6} autoComplete='off'
                                                        type="password" className="form-control" id="yourPassword" placeholder='Mật khẩu' />
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Đăng nhập</button>
                                                </div>
                                                <span className='text-center text-danger'>
                                                    {errMessage}
                                                </span>
                                                <div className="col-12">
                                                    <p className="small mb-0">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
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
            <Footer />
        </div>

    )

    //     <Header />
    //     <div className='height-page'>
    //         <div className='container justify-content-center justify-content-center align-items-center '>
    //             <div className="row justify-content-center ">
    //                 <div className='from my-4 card w-50 justify-content-center '>
    //                     <nav>
    //                         <div class="nav nav-tabs" id="nav-tab" role="tablist">
    //                             <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Đăng nhập</button>
    //                             <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Đăng ký</button>
    //                         </div>
    //                     </nav>
    //                     <div class="tab-content" id="nav-tabContent">
    //                         <div class="tab-pane fade show active card-title" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    //                             <form onSubmit={handleSubmit(onSubmitLogin)} class="row g-3 mx-4">
    //                                 <div class="col-12">
    //                                     {/* <label for="inputAddress" class="form-label">Tên đăng nhập</label> */}
    //                                     <input {...register('username')} required maxLength={30} minLength={6} autoComplete='off'
    //                                         type="text" className="form-control" id="yourUsername" />
    //                                     {/* <input {...register('username')} required maxLength={30} minLength={6} type="text" class="form-control" id="inputAddress" placeholder="Tên đăng nhập" /> */}
    //                                 </div>
    //                                 <div class="col-12">
    //                                     {/* <label for="inputAddress2" class="form-label">Mật khẩu</label> */}
    //                                     <input {...register('password')} required maxLength={30} minLength={6} autoComplete='off'
    //                                         type="password" className="form-control" id="yourPassword" />
    //                                     {/* <input {...register('password')} required maxLength={30} minLength={6} type="password" class="form-control" id="inputAddress2" placeholder="Mật khẩu" /> */}
    //                                 </div>
    //                                 <div class="col-12">
    //                                     <button type="submit" class="btn btn-primary">Đăng nhập</button>
    //                                 </div>
    //                                 <span className={message?.includes('Success') ? 'text-center text-success' : 'text-center text-danger'}>
    //                                     {message}
    //                                 </span>
    //                                 <div className="col-12">
    //                                     <p className="small mb-0 " id="nav-home">Bạn chưa có tài khoản? <Link to="/login">Đăng Ký</Link></p>
    //                                 </div>
    //                             </form>
    //                         </div>
    //                         <div class="tab-pane fade card-title" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
    //                             <form onSubmit={handleSubmit(onSubmitRegister)} class="row g-3 mx-4">
    //                                 <div class="col-md-6 mt-4">
    //                                     {/* <label for="inputEmail4" class="form-label">Họ</label> */}
    //                                     <input  {...register('firstName')} required maxLength={30} type="email" class="form-control" id="inputEmail4" placeholder="Họ" />
    //                                 </div>
    //                                 <div class="col-md-6 mt-4">
    //                                     {/* <label for="inputPassword4" class="form-label">Tên</label> */}
    //                                     <input  {...register('lastname')} required maxLength={30} type="password" class="form-control" id="inputPassword4" placeholder="Tên" />
    //                                 </div>
    //                                 <div class="col-12">
    //                                     {/* <label for="inputAddress" class="form-label">Tên đăng nhập</label> */}
    //                                     <input {...register('username')} required maxLength={30} minLength={6} type="text" class="form-control" id="inputAddress" placeholder="Tên đăng nhập" />
    //                                 </div>
    //                                 <div class="col-12">
    //                                     {/* <label for="inputAddress2" class="form-label">Mật khẩu</label> */}
    //                                     <input {...register('password')} required maxLength={30} minLength={6} type="password" class="form-control" id="inputAddress2" placeholder="Mật khẩu" />
    //                                 </div>
    //                                 <div class="col-12">
    //                                     <button type="submit" class="btn btn-primary">Đăng ký</button>
    //                                 </div>
    //                                 <span className={message?.includes('Success') ? 'text-center text-success' : 'text-center text-danger'}>
    //                                     {message}
    //                                 </span>
    //                                 <div className="col-12">
    //                                     <p className="small mb-0">Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
    //                                 </div>
    //                             </form>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <Footer />
    // </div>
    // return (<div className='register-wapper'>
    // )
}
