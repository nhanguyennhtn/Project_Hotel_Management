import React, { useEffect, useState } from "react";
import { apiUsersRead } from "../../../axios/axios";
import AdminHeader from '../components/Header';
import ContentMenu from "../components/ContentMenu";
import { Link } from "react-router-dom";

export default function Customers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState(''); // Trạng thái lọc
    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await apiUsersRead();
        const userfilter = res.user
        const filtered = userfilter.filter(user => {
            return user.username.role !== 2 && user.username.role !== 1 && user.room
        })
        setUsers(filtered);
    };

    const getUniqueUsersByName = (users) => {
        const userMap = new Map();
        users?.forEach((user) => {
            if (!userMap.has(user.fullname) || new Date(user.date) > new Date(userMap.get(user.fullname).date)) {
                userMap.set(user.fullname, user);
            }
        });
        return Array.from(userMap.values());
    };

    const filteredUsers = getUniqueUsersByName(users)
        .filter((item) => {
            const matchesSearch = item.fullname.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === ''
                || (statusFilter === 'Có phòng' && item.status)
                || (statusFilter === 'Đã trả phòng' && !item.status);
            return matchesSearch && matchesStatus;
        });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPage = (page) => setCurrentPage(page);

    const renderPagination = () => {
        const pagination = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pagination.push(
                    <button
                        key={i}
                        onClick={() => goToPage(i)}
                        className={`btn ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                    >
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pagination.push(<span key={i} className="mx-1">...</span>);
            }
        }
        return pagination;
    };

    return (
        <div className='wrapper'>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <ContentMenu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 ms-4">Danh sách khách hàng</h1>
                            <input
                                type="text"
                                className="form-control w-25"
                                placeholder="Tìm kiếm theo tên..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>
                        <select
                            className="form-select w-auto ms-auto"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="Có phòng">Có phòng</option>
                            <option value="Đã trả phòng">Đã trả phòng</option>
                        </select>
                        <div className="container-md mt-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Họ và Tên</th>
                                        <th scope="col">Phòng</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Ngày đăng ký</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.room?.title}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.date}</td>
                                            <td>
                                                {item.status ? (
                                                    <p className="text-primary">Có phòng</p>
                                                ) : (
                                                    <p className="text-secondary">Đã trả phòng</p>
                                                )}
                                            </td>
                                            <td>
                                                <Link
                                                    to={'/admin/customers/Detail'}
                                                    state={item}
                                                    className="btn btn-outline-primary mb-4 border-0 fs-6"
                                                >
                                                    <i className="bi bi-info-circle"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex ">
                                <button
                                    className="btn btn-outline-primary mx-1"
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    Trước
                                </button>
                                {renderPagination()}
                                <button
                                    className="btn btn-outline-primary mx-1"
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Sau
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

