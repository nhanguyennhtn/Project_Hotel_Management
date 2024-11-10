import { useEffect, useState } from "react";
import { apiExpensesRead, apiCostOfElectsRead } from "../../../axios/axios";
import Chart from 'react-apexcharts';

export default function StatisticChart() {
    const [expenses, setExpense] = useState([]);
    const [costOfElects, setCostOfElects] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Current year
    const [currentPage, setCurrentPage] = useState(1); // For pagination
    const itemsPerPage = 10; // Max items per page

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await apiExpensesRead();
        setExpense(res?.expenses);
        const costOfElect = await apiCostOfElectsRead();
        setCostOfElects(costOfElect?.costOfElect);
    };

    const costOfElect = costOfElects.filter((item) => item.destroy === 'tồn tại');

    const formatOther = (value) => {
        const parsedValue = parseFloat(value);
        return parsedValue <= 0 ? '0' : parsedValue;
    };

    const parseVietnameseDate = (dateStr) => {
        const regex = /(\d{1,2}) tháng (\d{1,2}), (\d{4})/;
        const match = dateStr.match(regex);

        if (match) {
            const day = parseInt(match[1]);
            const month = parseInt(match[2]) - 1;
            const year = parseInt(match[3]);
            return new Date(year, month, day);
        }
        return null;
    };

    const filterExpenses = expenses.filter((item) => {
        const itemDate = parseVietnameseDate(item.date);
        if (!itemDate) return false;

        const itemMonth = itemDate.getMonth() + 1;
        const itemYear = itemDate.getFullYear();

        return (
            item.status === true &&
            itemMonth === selectedMonth &&
            itemYear === selectedYear
        );
    }).map((item) => ({
        ...item,
        dien: Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
            (parseFloat(item.electricEnd) - parseFloat(item.electricStart)) * parseFloat(costOfElect[0]?.costOfElectricity)
        ),
        nuoc: Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
            (parseFloat(item.WaterEnd) - parseFloat(item.WaterStart)) * parseFloat(costOfElect[0]?.costOfWater)
        ),
        khac: Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(formatOther(item.Other)),
        tong: Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
            ((parseFloat(item.WaterEnd) - parseFloat(item.WaterStart)) * parseFloat(costOfElect[0]?.costOfWater) +
                (parseFloat(item.electricEnd) - parseFloat(item.electricStart)) * parseFloat(costOfElect[0]?.costOfElectricity)
            )
        )
    }));

    const barChartOptions = {
        chart: {
            id: 'bar-chart',
            type: 'bar',
        },
        xaxis: {
            categories: filterExpenses.map(item => item.room?.title),
        },
    };

    const barChartSeries = [
        {
            name: 'Tổng',
            data: filterExpenses.map((item) => parseFloat(item.tong)),
        },
    ];

    // Pagination logic
    const totalPages = Math.ceil(filterExpenses.length / itemsPerPage);
    const displayedItems = filterExpenses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="row">
            <div className="filters d-flex gap-1 ms-auto">
                <label>Tháng:</label>
                <input
                    type="number"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    min="1" max="12"
                />
                <label>Năm:</label>
                <input
                    type="number"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    min="2000" max={new Date().getFullYear()}
                />
            </div>
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />

            <div className="mt-4">
                <h5>Chi tiết thống kê điện nước - tháng {selectedMonth} năm {selectedYear} </h5>
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Phòng</th>
                        <th colSpan='2'>
                            <div className='d-flex flex-column '>
                                <div className='d-block text-center'>Chỉ số điện</div>
                                <div className='d-flex text-center'>
                                    <div className='col boreder-end'>Số đầu</div>
                                    <div className='col w-100'>Số cuối</div>
                                </div>
                            </div>
                        </th>
                        <th colSpan='2'>
                            <div className='d-flex flex-column '>
                                <div className='d-block text-center'>Chỉ số nước</div>
                                <div className='d-flex text-center'>
                                    <div className='col boreder-end'>Số đầu</div>
                                    <div className='col w-100'>Số cuối</div>
                                </div>
                            </div>
                        </th>
                        <th>Giá điện<br /> (VNĐ/Kwh)</th>
                        <th>Giá nước <br /> (VNĐ/Khối)</th>
                        <th>Khác</th>
                        <th>Ngày</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedItems.length > 0 ? displayedItems.filter((item) => {
                        return item.status === true
                    }).map((item, index) => {
                        return (
                            <tr key={item}>
                                <td>{++index}</td>
                                <td>{item.room.title}</td>
                                <td>{item.electricStart}</td>
                                <td>{item.electricEnd}</td>
                                <td>{item.WaterStart}</td>
                                <td>{item.WaterEnd}</td>
                                <td>{Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(costOfElect[0]?.costOfElectricity)}</td>
                                <td>{Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(costOfElect[0]?.costOfWater)}</td>
                                <td>{item.Other}</td>
                                <td>{item.date}</td>
                                <td>{item.tong} VNĐ</td>
                            </tr>
                        )
                    }) : <tr><div> Không có dữ liệu </div></tr>}
                </tbody>
            </table>
            <div className="pagination">
                <button className="btn btn-primary mx-1" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Back
                </button>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`btn btn-primary mx-1 ${currentPage === pageNum ? 'active' : ''}`}
                            >
                                {pageNum}
                            </button>
                        );
                    } else if (
                        (pageNum === currentPage - 2 && pageNum > 1) ||
                        (pageNum === currentPage + 2 && pageNum < totalPages)
                    ) {
                        return <span key={pageNum}>...</span>;
                    }
                    return null;
                })}
                <button className="btn btn-primary mx-1" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
