import { Link, useNavigate } from 'react-router-dom'

export default function ContentMenu() {
    return (
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link class="nav-link" aria-current="page" to="/admin">
                            <i class="bi bi-houses "></i> Trang chủ
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/room">
                            <i class="bi bi-stack"></i> Phòng
                        </Link>
                    </li>
                    <li class="nav-item p-auto ">
                        <Link class="nav-link " to="/admin/statistic">
                            <i class="bi bi-card-text"></i> Thống kê
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/customers">
                            <i class="bi bi-people-fill"></i> Khách hàng
                        </Link>
                    </li>
                    {/* <li class="nav-item">
                        <Link class="nav-link" to="/admin/contact">
                            <i class="bi bi-person-lines-fill"></i> Liên hệ
                        </Link>
                    </li> */}

                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/bill">
                            <i class="bi bi-receipt"></i> Hóa đơn
                        </Link>
                    </li>
                </ul>
                <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Hoạt động</span>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/response">
                            <i class="bi bi-reply-all-fill"></i> Xác nhận 
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/response-news">
                            <i class="bi bi-reply-all-fill"></i>Tin tức
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/expense">
                            <i class="bi bi-droplet-fill"></i> Điện nước phòng
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/admin/camera">
                        <i class="bi bi-webcam-fill"></i> Camera
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}