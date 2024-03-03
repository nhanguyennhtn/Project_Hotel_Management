import '../assets/scss/components/Footer.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { image6 } from '../assets/img/panner';

export default function Footer() {
    return <div className='home-wrapper'>
        <div className='row '>
            <div className='footer-wrapper '>
                <div className='footer-container container-md'>
                    <div className='footer-top'>
                        <div className='top-list col-6' >
                            <div className='title'>Thanh Nha Motel</div>
                            <div className='item'>
                                <p>Địa chỉ:  91/15, Đường 30/4, Quận Ninh Kiều, Tp Cần Thơ, Hưng Lợi, Ninh Kiều, Cần Thơ
                                    <br />Emai: trothanhnha@gmail.com
                                    <br />Hotline: 039 698 4478
                                </p>
                            </div>

                        </div>
                        <div className='top-list col-3' >
                            <div className='title'>Thông tin hỗ trợ</div>
                            <div className='item'>
                                <p>Chính sách bảo mật
                                    <br />Giải quyết tranh chấp
                                    <br />Điều khoản sử dụng</p>
                                {/* <NavLink to='/'>
                                    Trang chủ
                                </NavLink> */}
                            </div>
                            {/* <div className='item'>
                                <NavLink to='/room'>
                                    Phòng trọ
                                </NavLink>
                            </div>
                            <div className='item'>
                                <NavLink to='/contact'>
                                    Liên hệ
                                </NavLink>
                            </div> */}
                        </div>
                        <div className='top-list col-3 '>
                            <div className='title contact'>Liên hệ</div>
                            <div className='item mx-2' >
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-youtube youtube"></i>
                                <i className="bi bi-instagram"></i>
                            </div>
                            <div className='item '>
                                <div className='title '>Chứng nhận</div>
                                <img className='w-100px' src={image6} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='footer-bottom'>
                        @2023 Thanh Nha Motel. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
}