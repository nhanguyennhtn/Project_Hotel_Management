import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { apiAccountRegister } from '../axios/axios'
import './Register.scss'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Register() {
    const { register, handleSubmit, reset } = useForm()
    const [message, setMessage] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [pass, setPass] = useState('')
    const [rePass, setRePass] = useState('')

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const onSubmit = async (data) => {
        if (pass !== rePass) {
            setMessage('Mật khẩu không trùng khớp')
            return
        }
        try {
            const res = await apiAccountRegister({
                ...data,
                name: `${lastName} ${firstName}`
            })
            if (res && res.status === true) {
                setMessage(res.message)
                reset()
                setLastName('')
                setFirstName('')
                setPass('')
                setRePass('')
            }
        } catch (e) {
            setMessage(e.message)
        }
    }

    return (
        <div>
            <Header />
            <div className='register-wrapper'>
                <div className='mt-4'>
                    <div className="container-xxl card">
                        <section className="d-flex flex-column align-items-center justify-content-center py-4">
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
                                                        <input {...register('firstName')} value={firstName} required maxLength={30} autoComplete='off'
                                                            type="text" className="form-control" id="firstName" placeholder='Tên' onChange={(e) => setFirstName(e.target.value)} />
                                                        <div className="invalid-feedback">Vui lòng điền tên của bạn!</div>
                                                    </div>
                                                    <div className="col-6">
                                                        <input {...register('lastName')} value={lastName} required maxLength={30} autoComplete='off'
                                                            type="text" className="form-control" id="lastName" placeholder='Họ' onChange={(e) => setLastName(e.target.value)} />
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
                                                        <input onChange={(e) => setPass(e.target.value)} value={pass} required maxLength={30} minLength={6} autoComplete='off'
                                                            type="password" className="form-control" id="yourPassword" placeholder='Mật Khẩu' />
                                                        <input onChange={(e) => setRePass(e.target.value)} value={rePass} required maxLength={30} minLength={6} autoComplete='off'
                                                            type="password" className="form-control mt-3 password" id="yourPassword1" placeholder='Nhập lại mật Khẩu' />
                                                        <div className="invalid-feedback">Vui điền mật khẩu!</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit">Đăng ký</button>
                                                    </div>
                                                    <span className={message?.includes('Thành công') ? 'text-center text-success' : 'text-center text-danger'}>
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
