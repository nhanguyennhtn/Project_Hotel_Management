import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticsChart from './StatisticsChart';
import ChartXeRa from './ChartXeRa';

const StatisticsPage = () => {
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [statistics, setStatistics] = useState({});
    const [filteredStatistics, setFilteredStatistics] = useState({});
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterStartDate, setFilterStartDate] = useState(getCurrentDate());
    const [filterEndDate, setFilterEndDate] = useState(getCurrentDate());
    const [filterPlate, setFilterPlate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchStatistics();
    }, [filterMonth, filterYear, filterStartDate, filterEndDate, filterPlate]);

    useEffect(() => {
        if (filterPlate === '') {
            setFilteredStatistics(statistics);
        } else {
            filterStatisticsByPlate();
        }
    }, [filterPlate, statistics]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    useEffect(() => {
        const currentDate = getCurrentDate();
        if (filterEndDate > currentDate) {
            // setFilterEndDate(currentDate);
            setErrorMessage('Ngày đến không được vượt quá ngày hiện tại.');
        }
    }, [filterEndDate]);
    console.log(statistics);
    

    useEffect(() => {
        const currentDate = getCurrentDate();
        if (filterStartDate > currentDate) {
            // setFilterStartDate(currentDate);
            setErrorMessage('Ngày bắt đầu không được vượt quá ngày hiện tại.');
        } else if (filterStartDate > filterEndDate) {
            // setFilterStartDate(filterEndDate);
            setErrorMessage('Ngày bắt đầu không được lớn hơn ngày kết thúc.');
        }
    }, [filterStartDate, filterEndDate]);
    
    const fetchStatistics = () => {
        const startDate = new Date(filterStartDate);
        const endDate = new Date(filterEndDate);
        const timeDiff = endDate - startDate;
        const daysDiff = timeDiff / (1000 * 3600 * 24);

        if (daysDiff > 60) {
            const adjustedEndDate = new Date(startDate);
            adjustedEndDate.setDate(startDate.getDate());
            setFilterEndDate(adjustedEndDate.toISOString().split('T')[0]);
            setErrorMessage('Khoảng thời gian thống kê không được vượt quá 30 ngày.');
        }
        const params = {
            month: filterMonth,
            year: filterYear,
            start_date: filterStartDate,
            end_date: filterEndDate,
            plate: filterPlate
        };

        axios.get('http://localhost:3535/api/chart-xera', { params })
            .then(response => {
                setStatistics(response.data);
                setFilteredStatistics(response.data);
            })
            .catch(() => {
                setErrorMessage('Có lỗi xảy ra khi lấy dữ liệu thống kê.');
            });
    };

    const filterStatisticsByPlate = () => {
        const filterDetails = (details) => {
            return details.filter(item => item.ma_XV.biensoxe_XV.toLowerCase().includes(filterPlate.toLowerCase()));
        };

        const filteredData = {
            
            khachtro: {
                ...statistics.khachtro,
                details: filterDetails(statistics.khachtro?.details || [])
            },
            khach: {
                ...statistics.khach,
                details: filterDetails(statistics.khach?.details || [])
            }
        };

        setFilteredStatistics(filteredData);
    };

    const total = (filteredStatistics.khachtro?.total_money || 0) + (filteredStatistics.khach?.total_money || 0);

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const totalDetails = [
        ...filteredStatistics.khachtro?.details || [],
        ...filteredStatistics.khach?.details || []
    ];

    const paginatedDetails = getPaginatedData(totalDetails);

    const totalPages = Math.ceil(totalDetails.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getPageButtons = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };
    
    return (
        <div className='row'>
            <div className='row'>
                <div className="filter-controls mb-3">
                    <div className='row d-flex'>
                        <div className='col-6 d-flex gap-2'>
                            <label>Từ</label>
                            <input
                                type="date"
                                value={filterStartDate}
                                onChange={(e) => setFilterStartDate(e.target.value)}
                                className="col mb-3"
                                max={getCurrentDate()}
                            />
                            <label>Đến</label>
                            <input
                                type="date"
                                value={filterEndDate}
                                onChange={(e) => setFilterEndDate(e.target.value)}
                                className="col mb-3"
                                max={getCurrentDate()}
                            />
                        </div>
                        <div className='col d-flex'>
                            <div className='ms-auto fs-5'>
                                <label>Tổng: {Intl.NumberFormat('vi-VN').format(total) + ' VNĐ'}</label>
                            </div>
                        </div>
                    </div>
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <div className='row d-flex'>
                    <div className='col-6'>
                        <StatisticsChart statistics={filteredStatistics} />
                    </div>
                    <div className='col-6'>
                        <ChartXeRa statistics={filteredStatistics} />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='d-flex'>
                    <h2 className='col-9'>Chi tiết thống kê</h2>
                    <input
                        type="text"
                        value={filterPlate}
                        onChange={(e) => setFilterPlate(e.target.value)}
                        className="form-control mb-3 ms-auto"
                        placeholder='Tìm kiếm theo biển số xe'
                    />
                    <i className="bi bi-search align-self-center ms-2 mb-3"></i>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Biển số</th>
                            <th>Thời gian vào</th>
                            <th>Thời gian ra</th>
                            <th>Giá tiền</th>
                            <th>Loại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDetails.length > 0 ? paginatedDetails.map((item, index) => {
                            const type = filteredStatistics.chutro?.details.includes(item) ? 'chutro' :
                                filteredStatistics.khachtro?.details.includes(item) ? 'Khachtro' :
                                    'Khach';
                            return (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.ma_XV.biensoxe_XV}</td>
                                    <td>{item.ma_XV.thoigian_XV}</td>
                                    <td>{item.thoigian_XR}</td>
                                    <td>{Intl.NumberFormat('vi-VN').format(item.giatien)}</td>
                                    <td>{type}</td>
                                </tr>
                            );
                        }) :
                            <tr>
                                <td colSpan="6" className="text-start fs-5 ms-3">
                                    <h6 className='ms-3'>Không có dữ liệu</h6>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
                <div className='pagination-controls d-flex'>
                    <button
                        onClick={handlePreviousPage}
                        className="btn btn-outline-primary mx-1"
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>
                    {getPageButtons().map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`btn ${currentPage === page ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        className="btn btn-outline-primary mx-1"
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
