import { useCallback, useEffect, useState } from 'react'
import '../../assets/scss/template/dashboard.scss'
import ContentMenu from './components/ContentMenu'
import AdminHeader from './components/Header'
import { apiContractsRead, apiContractsUpdate, apiMotelsUpdate, apiUsersRead, apiUsersUpdate } from '../../axios/axios'
import { Link } from 'react-router-dom'
import Table from './components/expense/Table'

export default function Admin() {
    const [customers, setCustomers] = useState([])
    const [Contracts, setContracts] = useState([])
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedCustomers, setSortedCustomers] = useState([]);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    // Lấy dữ liệu
    const fetchData = async () => {
        const res = await apiUsersRead()
        const contract = await apiContractsRead()
        setContracts(contract.contracts)
        setCustomers(res.user)
    }
    
    const customerSort = sortedCustomers.filter((item) => {
        return item.status === true && item.contract?.status === true
    })
    // Hàm phân trang
    const totalPages = Math.ceil(customerSort.length / itemsPerPage);
    const currentCustomers = customerSort.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    // Hàm sắp xếp theo tên phòng
        const sortCustomersByRoomTitle = () => {
            const sorted = [...customers].sort((a, b) => {
                if (a.room?.title < b.room?.title) return -1;
                if (a.room?.title > b.room?.title) return 1;
                return 0;
            });
            setSortedCustomers(sorted);
        }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Gọi hàm sắp xếp khi danh sách khách hàng thay đổi
    useEffect(() => {
        sortCustomersByRoomTitle();
    }, [customers]);

    const handleCancel = async (data) => {
        if (window.confirm('Xác nhận hủy phòng và ngưng hợp đồng?')) {
            Contracts?.filter((item) => {
                return item._id === data.contract._id && item?.status === true
            })?.map(async (item) => {
                await apiMotelsUpdate({ _id: data?.room._id, status: null })
                await apiContractsUpdate({ _id: item?._id, status: false })
                await apiUsersUpdate({ _id: data?._id, status: false })
            })
            fetchData()
            setSuccessMessage('Hủy thành công')
        }
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageNumbers.push(
                    <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? "active p-2 btn" : "p-2 btn no-active"}>
                        {i}
                    </button>
                );
            } else if (i === 1 || i === totalPages) {
                pageNumbers.push(
                    <button className='p-2 btn' key={i} onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pageNumbers.push(<span className='p-2' key={i}>...</span>);
            }
        }
        return pageNumbers;
    };

    return (
        <div className='wrapper'>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <ContentMenu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 ms-4">Danh sách phòng hoạt động</h1>
                        </div>
                        {successMessage && <div className="alert alert-success custom-alert">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger custom-alert">{errorMessage}</div>}
                        <div className='container-md'>
                            <table className="table container-md my-4 shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Phòng</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">số điện thoại</th>
                                        <th scope="col">Căn cước công dân</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCustomers.length > 0 ? currentCustomers.filter((item) => {
                                        return item.status === true && item.contract?.status === true
                                    }).map((item, index) => (
                                        <tr key={item._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.room?.title}</td>
                                            <td>{item.room?.price}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.IDcard}</td>
                                            <td>{item?.status
                                                ? <div className='mb-3'>
                                                    <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                                                </div>
                                                : <div className='mb-3'>
                                                    <Link to={`/admin/create/contracts`} state={item} className='btn btn-outline-success'>Xác nhận</Link>
                                                    <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
                                                </div>
                                            }</td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td colSpan='6'>Không có dữ liệu</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                            {/* Phân trang */}
                            <div className="pagination gap-2 ">
                                <button type="button" className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>
                                {renderPageNumbers()}
                                <button type="button" className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 ms-4">Danh sách xác nhận hóa đơn</h1>
                        </div>
                        <div>
                            <Table />
                        </div>

                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 ms-4">Danh sách xác nhận đặt phòng</h1>
                        </div>
                        <div className='container-md'>
                            <table className="table table-bordered container-md my-4 shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Phòng</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Căn cước công dân</th>
                                        <th scope="col">minh chứng</th>
                                        <th scope="col">Ngày</th>
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.filter(item => {
                                        return (item?.room?.status === false && item?.status === null) && item
                                    }).length > 0 ? customers.filter(item => {
                                        return (item?.room?.status === false && item?.status === null) && item
                                    })?.map((item, index) => <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.room.title}</td>
                                        <td>{item.room.price}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.IDcard}</td>
                                        <td><img style={{ width: 200, height: 100, objectFit: 'cover' }} src={item.prove} alt='' /></td>
                                        <td>{item.date}</td>
                                        <td>{item?.status === null ? 'Chưa xác nhận' : 'Đã xác nhận'}</td>
                                    </tr>) :
                                        <tr>
                                            <td colSpan='6'>Không có dữ liệu</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
