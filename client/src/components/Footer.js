import '../assets/scss/components/Footer.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'
import { image6 } from '../assets/img/panner';

export default function Footer() {
    // return <div className='home-wrapper'>
    //     <div className='row '>
    //         <div className='footer-wrapper '>
    //             <div className='footer-container container-md'>
    //                 <div className='footer-top'>
    //                     <div className='top-list col-6' >
    //                         <div className='title'>Thanh Nha Motel</div>
    //                         <div className='item'>
    //                             <p>Địa chỉ:  91/15, Đường 30/4, Quận Ninh Kiều, Tp Cần Thơ, Hưng Lợi, Ninh Kiều, Cần Thơ
    //                                 <br />Emai: trothanhnha@gmail.com
    //                                 <br />Hotline: 039 698 4478
    //                             </p>
    //                         </div>

    //                     </div>
    //                     <div className='top-list col-3' >
    //                         <div className='title'>Thông tin hỗ trợ</div>
    //                         <div className='item'>
    //                             <p>Chính sách bảo mật
    //                                 <br />Giải quyết tranh chấp
    //                                 <br />Điều khoản sử dụng</p>
    //                             {/* <NavLink to='/'>
    //                                 Trang chủ
    //                             </NavLink> */}
    //                         </div>
    //                         {/* <div className='item'>
    //                             <NavLink to='/room'>
    //                                 Phòng trọ
    //                             </NavLink>
    //                         </div>
    //                         <div className='item'>
    //                             <NavLink to='/contact'>
    //                                 Liên hệ
    //                             </NavLink>
    //                         </div> */}
    //                     </div>
    //                     <div className='top-list col-3 '>
    //                         <div className='title contact'>Liên hệ</div>
    //                         <div className='item mx-2' >
    //                             <i className="bi bi-facebook"></i>
    //                             <i className="bi bi-youtube youtube"></i>
    //                             <i className="bi bi-instagram"></i>
    //                         </div>
    //                         <div className='item '>
    //                             <div className='title '>Chứng nhận</div>
    //                             <img className='w-100px' src={image6} alt='' />
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className='footer-bottom'>
    //                     @2023 Thanh Nha Motel. All rights reserved.
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    return (
        <div class=" bg-white p-0">
            <div class="container-fluid bg-dark text-light footer wow fadeIn" data-wow-delay="0.1s">
                <div class="container pb-5 pt-4">
                    <div class="row g-5">
                        <div class="col-md-6 col-lg-4">
                            <div class="bg-primary rounded p-4">
                                <Link to="/">
                                    <h1 class="text-white text-uppercase mb-3">Hotelier</h1>
                                </Link>
                                <p class="text-white mb-0">
                                    Mang lại trãi nghiệm tuyệt vời với không gian phòng ở rộng rãi giá cả hợp lý
                                    phù hợp với nhu cầu khách hàng.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <h6 class="section-title text-start text-primary text-uppercase mb-4">Liên hệ trực tiếp</h6>
                            <p class="mb-2"><i class="bi bi-geo-alt-fill me-3"></i> Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam</p>
                            <p class="mb-2"><i class="bi bi-telephone-fill me-3"></i>+84396984478</p>
                            <p class="mb-2"><i class="bi bi-envelope me-3"></i>nhanguyennhtn@gmail.com</p>
                            <div class="d-flex pt-2">
                                <a class="btn btn-outline-light btn-social" href="#"><i class="bi bi-twitter"></i></a>
                                <a class="btn btn-outline-light btn-social" href="#"><i class="bi bi-facebook"></i></a>
                                <a class="btn btn-outline-light btn-social" href="#"><i class="bi bi-youtube"></i></a>
                                <a class="btn btn-outline-light btn-social" href="#"><i class="bi bi-github"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-5 col-md-12">
                            <div class="row gy-5 g-4">
                                <div class="col-md-6">
                                    <h6 class="section-title text-start text-primary text-uppercase mb-4">Company</h6>
                                    <Link class="btn btn-link text-light w-100 text-start" to="/"><i class="bi bi-caret-right-fill me-2"></i>Trang chủ</Link>
                                    <Link class="btn btn-link text-light w-100 text-start" to="/room"><i class="bi bi-caret-right-fill me-2"></i>Phòng</Link>
                                    <Link class="btn btn-link text-light w-100 text-start" to="/contact"><i class="bi bi-caret-right-fill me-2"></i>Liên hệ với chúng tôi</Link>
                                    <Link class="btn btn-link text-light w-100 text-start" to="/news"><i class="bi bi-caret-right-fill me-2"></i>Tin tức</Link>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="section-title text-start text-primary text-uppercase mb-4">Thông tin hỗ trợ</h6>
                                    <Link class="btn btn-link text-light" to="#">Chính sách bảo mật</Link>
                                    <Link class="btn btn-link text-light" to="#">Giải quyết tranh chấp</Link>
                                    <Link class="btn btn-link text-light" to="#">Điều khoản sử dụng</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="copyright">
                        <div class="row pb-3">
                            <div class="col text-center w-auto ">
                                &copy;2023 <Link class="border-bottom" to="/">Hotelier</Link>, All Right Reserved.
                                Designed By <a class="border-bottom" href="https://www.facebook.com/profile.php?id=100017472396209">Nhanguyennhtn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}