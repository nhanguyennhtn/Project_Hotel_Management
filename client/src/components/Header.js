import { Link, useNavigate } from 'react-router-dom'
import '../assets/scss/components/Header.scss'
import { apiMotelsRead, apiMotelsUpdate, apiUsersDelete, apiUsersRead } from '../axios/axios'
import { useEffect, useState } from 'react'
import RoomRegistration from './RoomRegistration'

export default function Header() {
    const [customers, setCustomers] = useState([])
    const [rooms, setRooms] = useState([])
    const Nagative = useNavigate()

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        const motel = await apiMotelsRead()
        setCustomers(res.user)
        setRooms(motel.motels)
    }
    const handleLogout = () => {
        if (window.confirm('are you sure?')) {
            sessionStorage.removeItem('userInfo')
            window.location.href = '/'
        }
    }

    const handleCancel = async () => {
        const check = customers?.filter((item) => {
            return item?.username._id === JSON.parse(window.sessionStorage.getItem('userInfo'))._id && item?.status === null
        })
        if (window.confirm('phí cọc sẽ không thể hoàn trả')) {
            await apiMotelsUpdate({ _id: check[0].room._id, status: null })
            await apiUsersDelete(check[0]._id)
            fetchData()
        }
    }
    const checked = () => {
        const check = customers?.filter((item) => {
            return item?.username._id === JSON.parse(window.sessionStorage.getItem('userInfo'))._id && item?.status === null
        })
        if (check.length > 0) {
            return <div class="dropdown rounded-2">
                <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Phòng đặt
                </button>
                <ul class="dropdown-menu w-auto" aria-labelledby="dropdownMenuButton1">
                    {check.map((item) => item.room.title)}
                    <p>(Đang chờ phản hồi)</p>
                    <li><hr class="dropdown-divider m-0 pb-0" /></li>
                    <li><button className='btn btn-primary w-100 rounded-3' onClick={() => handleCancel} >Hủy</button></li>
                </ul>
            </div>
        }
    }

    const checkCustomer = () => {
        const res = customers?.filter((item) => {
            return item.username._id === JSON.parse(window.sessionStorage.getItem('userInfo'))._id && item.status === true
        })
        if (res.length > 0) {
            Nagative('/news/create')
        } else {
            alert('Bạn hiện chưa có phòng !!!')
        }

        // (customers.filter((item) => {
        //     return item.username._id === JSON.parse(window.sessionStorage.getItem('userInfo'))._id && item.status == true
        // }))? 
        // <Link class="dropdown-item" to="/news/create">Đăng bài viết</Link>
        // :
    }
    // return (
    //     <div className="header-wrapper" >
    //         <nav className="navbar navbar-expand-lg header-navbar-bottom fixed-top bg-light">
    //             <div className="container-md">
    //                 <Link className="navbar-brand text-dark " to="/">Thanh Nhã Motel</Link>
    //                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                     <span className="navbar-toggler-icon"></span>
    //                 </button>
    //                 <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/room"><i class="bi bi-house-door"></i> Phòng Trọ</Link>
    //                     </li>
    //                     <li className="nav-item">
    //                         <Link className="nav-link" to="/contact">Liên hệ với chúng tôi</Link>
    //                     </li>

    //                     {JSON.parse(window.sessionStorage.getItem('userInfo'))
    //                         ? <div className='d-flex'>
    //                             <div class="dropdown">
    //                                 <button class="btn dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    //                                     {JSON.parse(window.sessionStorage.getItem('userInfo')).username}
    //                                 </button>
    //                                 <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    //                                     <li class='dropdown-item dropstart content-show'>Thông tin
    //                                         <ul class="dropdown-menu parent " aria-labelledby="thongtincanhan">
    //                                             <li><Link class="dropdown-item" to="user/profile">Cá nhân</Link></li>
    //                                             <li><hr class="dropdown-divider" /></li>
    //                                             <li><Link class="dropdown-item" to="user/contract">Hợp đồng</Link></li>
    //                                             <li><hr class="dropdown-divider" /></li>
    //                                             <li><Link class="dropdown-item" to="user/bill">Hóa đơn</Link></li>
    //                                         </ul>
    //                                     </li>
    //                                     <li><hr class="dropdown-divider" /></li>
    //                                     <li><Link class="dropdown-item" to="/newpage">Đăng bài viết</Link></li>
    //                                     <li><hr class="dropdown-divider" /></li>
    //                                     <li><button class="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
    //                                 </ul>
    //                             </div>

    //                         </div> :

    //                         <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
    //                             <li class="nav-item btn-boder-hover">
    //                                 <Link class="nav-link" aria-current="page" to="/login">Đăng nhập</Link>
    //                             </li>
    //                             <li class="nav-item btn-boder-hover">
    //                                 <Link class="nav-link" to="/register">Đăng ký</Link>
    //                             </li>
    //                         </ul>
    //                     }
    //                 </ul>
    //             </div>
    //         </nav>
    //     </div>
    // )

    return (
        <div className=''>
            <div class=" bg-white p-0 fixed-top">
                <div class="container-fluid bg-dark px-0">
                    <div class="row gx-0">
                        <div class="col-lg-3 bg-dark d-none d-lg-block">
                            <Link to="/" class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                                <h1 class="m-0 text-primary text-uppercase ">Hotelier</h1>
                            </Link>
                        </div>
                        <div class="col-lg-9">
                            <div class="row gx-0 bg-white d-none d-lg-flex">
                                <div class="col-lg-7 px-5 text-start">
                                    <div class="h-100 d-inline-flex align-items-center py-2 me-4">
                                        <i class="bi bi-envelope-at-fill text-primary me-2"></i>
                                        <p class="mb-0">nhanguyennhtn@gmail.com</p>
                                    </div>
                                    <div class="h-100 d-inline-flex align-items-center py-2">
                                        <i class="bi bi-telephone-fill text-primary me-2"></i>
                                        <p class="mb-0">+84396984478</p>
                                    </div>
                                </div>
                                <div class="col-lg-5 px-5 text-end">
                                    <div class="d-inline-flex align-items-center py-2">
                                        <a class="me-3" href="https://www.facebook.com/profile.php?id=100017472396209"><i class="bi bi-facebook"></i></a>
                                        <a class="me-3" href="#"><i class="bi bi-twitter"></i></a>
                                        <a class="me-3" href="#"><i class="bi bi-instagram"></i></a>
                                        <a class="me-3" href="#"><i class="bi bi-github"></i></a>
                                    </div>
                                </div>
                            </div>
                            <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
                                {/* <a href="index.html" class="navbar-brand d-block d-lg-none">
                                    <h1 class="m-0 text-primary text-uppercase">Hotelier</h1>
                                </a> */}
                                {/* <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                    <span class="navbar-toggler-icon"></span>
                                </button> */}
                                <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                    <div class="navbar-nav mr-auto py-0 ">
                                        <Link to="/" class="nav-item nav-link ">Trang chủ</Link>
                                        <div class="dropdown">
                                            <button class=" nav-item nav-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                Phòng
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><Link class="dropdown-item" to="/room">Tất cả phòng</Link></li>
                                                <li><Link class="dropdown-item" to="/room/phong-don">Phòng đơn</Link></li>
                                                <li><Link class="dropdown-item" to="/room/phong-ghep">Phòng ghép</Link></li>
                                            </ul>
                                        </div>
                                        {/* <Link to="/room" class="nav-item nav-link ">Phòng</Link> */}
                                        <Link to="/news" class="nav-item nav-link">Ghép phòng</Link>
                                        <Link to="/contact" class="nav-item nav-link">Liên hệ</Link>
                                    </div>
                                    {JSON.parse(window.sessionStorage.getItem('userInfo'))
                                        ? <div className='d-flex '>
                                            {checked()}
                                            <div class="dropdown ">
                                                <button class="btn dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {JSON.parse(window.sessionStorage.getItem('userInfo')).username}
                                                </button>
                                                <ul class="dropdown-menu  " aria-labelledby="dropdownMenuButton1">
                                                    <li class='dropdown-item dropstart content-show'>Thông tin
                                                        <ul class="dropdown-menu parent " aria-labelledby="thongtincanhan">
                                                            <li><Link class="dropdown-item" to="/user/profile">Cá nhân</Link></li>
                                                            <li><hr class="dropdown-divider" /></li>
                                                            <li><Link class="dropdown-item" to="/user/contract">Hợp đồng</Link></li>
                                                            <li><hr class="dropdown-divider" /></li>
                                                            <li><Link class="dropdown-item" to="/user/bill">Hóa đơn</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><hr class="dropdown-divider" /></li>
                                                    <li>
                                                        <button class="dropdown-item" onClick={() => checkCustomer()}>Đăng bài viết</button></li>
                                                    <li><hr class="dropdown-divider" /></li>
                                                    <li><button class="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                                                </ul>
                                            </div>

                                        </div> :
                                        <ul class="navbar-nav ms-auto mb-2 mb-lg-12 ">
                                            <li class="nav-item btn-boder-hover btn rounded-0 ">
                                                <Link class="nav-link" aria-current="page" to="/login">Đăng nhập</Link>
                                            </li>
                                            <li class="nav-item btn-boder-hover btn rounded-0 ">
                                                <Link class="nav-link" to="/register">Đăng ký</Link>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}