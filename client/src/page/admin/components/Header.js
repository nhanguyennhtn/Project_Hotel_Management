import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
    const handleLogout = () => {
        if (window.confirm('Are you sure?')) {
            localStorage.removeItem('userInfo')
            window.location.href = '/'
        }
    }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-md">
                <Link class="navbar-brand" to="/admin">Trang chủ</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/admin/customers">Khách hàng</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/admin/room">Phòng</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/admin/bill">Hóa đơn</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link " to="/admin/response" >Phản hồi</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link " to="/admin/expense" >Điện nước</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link " to="/admin/contact" >Phản hồi</Link>
                        </li>
                    </ul>
                    <div className='btn btn-outline-danger' onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
        </nav>
    )
}
