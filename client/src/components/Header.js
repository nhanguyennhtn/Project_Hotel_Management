import { Link } from 'react-router-dom'
import '../assets/scss/components/Header.scss'

export default function Header() {
    const handleLogout = () => {
        if (window.confirm('are you sure?')) {
            sessionStorage.removeItem('userInfo')
            window.location.href = '/'
        }
    }
    return (
        <div className="header-wrapper" >
            <nav className="navbar navbar-expand-lg header-navbar-bottom fixed-top bg-light">
                <div className="container-md">
                    <Link className="navbar-brand text-dark " to="/">Thanh Nhã Motel</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
                        <li className="nav-item">
                            <Link className="nav-link" to="/room"><i class="bi bi-house-door"></i> Phòng Trọ</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Liên hệ với chúng tôi</Link>
                        </li>

                        {JSON.parse(window.sessionStorage.getItem('userInfo'))
                            ? <div className='d-flex'>
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {JSON.parse(window.sessionStorage.getItem('userInfo')).username}
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li class='dropdown-item dropstart content-show'>Thông tin
                                            <ul class="dropdown-menu parent " aria-labelledby="thongtincanhan">
                                                <li><Link class="dropdown-item" to="user/profile">Cá nhân</Link></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li><Link class="dropdown-item" to="user/contract">Hợp đồng</Link></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li><Link class="dropdown-item" to="user/bill">Hóa đơn</Link></li>
                                            </ul>
                                        </li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><Link class="dropdown-item" to="/newpage">Đăng bài viết</Link></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><button class="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                                    </ul>
                                </div>

                            </div> :

                            <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
                                <li class="nav-item btn-boder-hover">
                                    <Link class="nav-link" aria-current="page" to="/login">Đăng nhập</Link>
                                </li>
                                <li class="nav-item btn-boder-hover">
                                    <Link class="nav-link" to="/register">Đăng ký</Link>
                                </li>
                            </ul>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}