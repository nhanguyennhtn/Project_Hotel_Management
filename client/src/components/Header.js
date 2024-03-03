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
                    <a className="navbar-brand text-dark " href="/">Thanh Nhã Motel</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
                        <li className="nav-item">
                            <a className="nav-link" href="/room"><i class="bi bi-house-door"></i> Phòng Trọ</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Liên hệ với chúng tôi</a>
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
                                                <li><a class="dropdown-item" href="user/profile">Cá nhân</a></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li><a class="dropdown-item" href="user/contract">Hợp đồng</a></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li><a class="dropdown-item" href="user/bill">Hóa đơn</a></li>
                                            </ul>
                                        </li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="/newpage">Đăng bài viết</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><button class="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                                    </ul>
                                </div>

                            </div> :

                            <ul class="navbar-nav ms-auto mb-2 mb-lg-12">
                                <li class="nav-item btn-boder-hover">
                                    <a class="nav-link" aria-current="page" href="/login">Đăng nhập</a>
                                </li>
                                <li class="nav-item btn-boder-hover">
                                    <a class="nav-link" href="/register">Đăng ký</a>
                                </li>
                            </ul>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}