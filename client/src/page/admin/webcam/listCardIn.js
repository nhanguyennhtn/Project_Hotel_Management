import axios from "axios";
import { useEffect, useState } from "react";
import stringSimilarity from "string-similarity";

export default function ListVehicleIn() {
    const [listVehicles, setListVehicle] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const fetchData = async () => {
        const res = await axios.get('http://localhost:3535/api/XeVao/read');
        if (res.status === 200) {
            const listVehicleIn = res.data.vehicleIn;
            const vehicleIn = listVehicleIn.filter((item) => item.trangthai === 'Trong bãi');
            setListVehicle(vehicleIn);
            setFilteredVehicles(vehicleIn);
        } else {
            console.log('Dữ liệu tìm kiếm bị gián đoạn');
        }
    };

    useEffect(() => {
        // Filter vehicles based on search query
        const filtered = listVehicles.filter(vehicle =>
            vehicle.biensoxe_XV.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredVehicles(filtered);
        setCurrentPage(1);  // Reset to the first page when filtering
    }, [searchQuery, listVehicles]);

    // Pagination logic
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const paginatedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
        <div className="row">
            <div className="admin-wrapper container-md mt-4">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h4 ms-4">Danh sách xe trong bãi</h1>
                    </div>
                    <input
                        type="text"
                        className="imput my-4 p-0"
                        placeholder="Nhập biển số Xe"
                        style={{ minWidth: 200 + 'px' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã thẻ</th>
                            <th scope="col">Biển số</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Ảnh biển số</th>
                            <th scope="col">Thời gian xe vào</th>
                            <th scope="col">Vai trò</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedVehicles.length > 0 ? paginatedVehicles.filter((item) => {
                            return item.trangthai === 'Trong bãi' && item.ma_the.trangthai_the === 'Đang dùng'
                        }).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item?.ma_the.ma_the}</td>
                                    <td>{item.biensoxe_XV}</td>
                                    <td><img src={item.anh_XV} style={{ maxWidth: 200 + 'px',height: 'auto' }} alt="ảnh xe vào" /></td>
                                    <td><img src={`data:image/jpeg;base64,${item.anhBS_XV}`} style={{ width: 200 + 'px', height: 'auto' }} alt="ảnh biển số xe vào" /></td>
                                    <td>{item.thoigian_XV}</td>
                                    <td>{item.ma_DKX.user.fullname ? item.ma_DKX.user.fullname: item.chucvu_XV}</td>
                                </tr>
                            );
                        }) :
                            <tr scope='col-7'>
                                <td colSpan='7'>Không có dữ liệu</td>
                            </tr>}
                    </tbody>
                </table>
                <div className="pagination gap-2 ">
                    <button type="button" className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>
                    {renderPageNumbers()}
                    <button type="button" className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}
