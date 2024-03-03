import React from 'react'

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
                <a class="navbar-brand" href="/admin">Trang chủ</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/admin/customers">Khách hàng</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/room">Phòng</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin/bill">Hóa đơn</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="/admin/response" >Phản hồi</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="/admin/expense" >Điện nước</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link " href="/admin/contact" >Phản hồi</a>
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
