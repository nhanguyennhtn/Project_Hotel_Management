import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const nagative = useNavigate()
    const userinfo = JSON.parse(window.sessionStorage.getItem('userInfo')).username
    const handleLogout = () => {
        if (window.confirm('Are you sure?')) {
            localStorage.removeItem('userInfo')
            nagative('/')
        }
    }

    // return (
    //     <nav class="navbar navbar-expand-lg bg-body-tertiary">
    //         <div class="container-md">
    //             <Link class="navbar-brand" to="/admin">Trang chủ</Link>
    //             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span class="navbar-toggler-icon"></span>
    //             </button>
    //             <div class="collapse navbar-collapse" id="navbarNavDropdown">
    //                 <ul class="navbar-nav me-auto">
    //                     <li class="nav-item">
    //                         <Link class="nav-link active" aria-current="page" to="/admin/customers">Khách hàng</Link>
    //                     </li>
    //                     <li class="nav-item">
    //                         <Link class="nav-link" to="/admin/room">Phòng</Link>
    //                     </li>
    //                     <li class="nav-item">
    //                         <Link class="nav-link" to="/admin/bill">Hóa đơn</Link>
    //                     </li>
    //                     <li class="nav-item dropdown">
    //                         <Link class="nav-link " to="/admin/response" >Phản hồi</Link>
    //                     </li>
    //                     <li class="nav-item dropdown">
    //                         <Link class="nav-link " to="/admin/expense" >Điện nước</Link>
    //                     </li>
    //                     <li class="nav-item dropdown">
    //                         <Link class="nav-link " to="/admin/contact" >Phản hồi</Link>
    //                     </li>
    //                 </ul>
    //                 <div className='btn btn-outline-danger' onClick={handleLogout}>
    //                     Logout
    //                 </div>
    //             </div>
    //         </div>
    //     </nav>
    // )
    
    return (
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow ">
            <Link class="navbar-brand col-md-3 col-lg-2 me-0 px-3 " to="/admin">Admin-{userinfo}</Link>
            <div class="navbar-nav">
                <div class="dropdown ">
                    <button class="btn btn-secondary" onClick={handleLogout}>Đăng xuất</button>
                </div>
            </div>
        </header>
    )
}
