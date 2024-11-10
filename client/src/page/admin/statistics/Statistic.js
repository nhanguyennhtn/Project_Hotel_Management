import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import AdminHeader from '../components/Header';
import ContentMenu from '../components/ContentMenu';
import { apiMotelsRead, apiUsersRead } from '../../../axios/axios'
import StatisticsPage from './managerVehicle';
import axios from 'axios';
import StatisticChart from './StatisticChart';

export default function Statistic() {
  const [data, setData] = useState({ available: 0, booked: 0, waitingbooking: 0 });
  const [motels, setMotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [vehicleIns, setVehicleIn] = useState([]);
  const [showForm, setShowForm] = useState('Phòng trọ');
  const [roomStatus, setRoomStatus] = useState('Đã đặt'); // Default to 'Đã đặt'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const motelsResponse = await apiMotelsRead();
      const user = await apiUsersRead()
      setUsers(user?.user) 
      const motels = motelsResponse?.motels || [];
      const vehicleIn = await axios.get('http://localhost:3535/api/XeVao/read');
      setVehicleIn(vehicleIn.data.vehicleIn);
      setMotels(motels);

      const waitingbooking = motels.filter(motel => motel.status === false).length;
      const bookedCount = motels.filter(motel => motel.status === true).length;
      const availableCount = motels.filter(motel => motel.status === undefined || motel.status === null).length;

      setData({ available: availableCount, booked: bookedCount, waitingbooking });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const NumVehicleIn = vehicleIns.filter((vehicleIn) => vehicleIn.trangthai === "Trong bãi");
  const NumVehicleOut = vehicleIns.filter((vehicleOut) => vehicleOut.trangthai === "Rời bãi");


  // Filter rooms based on selected roomStatus
  const filteredRooms = motels.filter(motel => {
    if (roomStatus === 'Phòng trống') return motel.status === undefined || motel.status === null;
    if (roomStatus === 'Đã đặt') return motel.status === true;
    if (roomStatus === 'Đang đợi') return motel.status === false;
    return true;
  });

  const userinfo = (room) => {
    const res = users.filter((item) => item?.room?._id === room?._id && item.status === true);
    return { fullname: res[0]?.fullname, date: res[0]?.date };
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const currentRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pageNumbers.push(i);
      } else if (pageNumbers[pageNumbers.length - 1] !== '...') {
        pageNumbers.push('...');
      }
    }
    return pageNumbers;
  };

  return (
    <div className='content-reponse'>
      <div className='wrapper'>
        <AdminHeader />
        <div className="container-fluid">
          <div className="row">
            <ContentMenu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h4 ms-4">Danh sách </h1>
              </div>
              <div className='row pb-2'>
                <div className='d-flex gap-2'>
                  <div className='card col'>
                    <div className="container">
                      <h5 className='text-center mt-2'>Tình trạng phòng</h5>
                      <div className='d-flex flex-column pb-2'>
                        <label className='ms-1 '><strong>Số lượng phòng: </strong> {motels.length}</label>
                        <label className='ms-1 '><strong>Số phòng trống: </strong> {data.available}</label>
                        <label className='ms-1 '><strong>Số phòng đã đặt: </strong> {data.booked}</label>
                        <label className='ms-1 '><strong>Số phòng chờ duyệt: </strong> {data.waitingbooking}</label>
                      </div>
                    </div>
                  </div>
                  <div className='card col'>
                    <h5 className='text-center mt-2'>Nhà xe</h5>
                    <label className='ms-3'><strong>Tổng xe: </strong> {vehicleIns?.length || 0}</label>
                    <label className='ms-3'><strong>Số xe trong bãi: </strong> {NumVehicleIn?.length || 0}</label>
                    <label className='ms-3'><strong>Số xe rời bãi: </strong> {NumVehicleOut?.length || 0}</label>
                  </div>
                </div>
              </div>

              <div className='row border-bottom mb-2 pb-2'>
                <div className='d-flex justify-content-evenly'>
                  <div className='card bg-primary col-3'>
                    <button className={`btn rounder-3 border-0 text-dark ${showForm === 'Phòng trọ' ? 'active' : ''}`} onClick={() => setShowForm('Phòng trọ')}><label className='ms-2'><strong>Phòng trọ</strong></label></button>
                  </div>
                  <div className='card bg-success col-3'>
                    <button className={`btn rounder-3 border-0 text-dark ${showForm === 'Hóa đơn' ? 'active' : ''}`} onClick={() => setShowForm('Hóa đơn')}><label className='ms-2'><strong>Hóa đơn</strong></label></button>
                  </div>
                  <div className='card bg-danger col-3'>
                    <button className={`btn rounder-3 border-0 text-dark ${showForm === 'Nhà xe' ? 'active' : ''}`} onClick={() => setShowForm('Nhà xe')}><label className='ms-2'><strong>Nhà xe</strong></label></button>
                  </div>
                </div>
              </div>

              {showForm === 'Phòng trọ' && (
                <div className='row'>
                  <label className='text-center fs-4 text-uppercase'>Thống kê tình trạng phòng</label>
                  <Chart options={{ chart: { id: 'bar-chart', type: 'bar' }, xaxis: { categories: ['Phòng trống', 'Đã đặt', 'Đang đợi'] } }} series={[{ name: 'Số lượng', data: [data.available, data.booked, data.waitingbooking] }]} type="bar" height={350} />

                  <div className='mt-4'>
                    <div className='d-flex'>
                      <h5 className='col-6'>Chi tiết tình trạng phòng: {roomStatus}</h5>
                      <select
                        className="form-select mb-3 ms-auto"
                        value={roomStatus}
                        onChange={(e) => setRoomStatus(e.target.value)}
                        style={{ maxWidth: 300 }}
                      >
                        <option value="Đã đặt">Đã đặt</option>
                        <option value="Đang đợi">Đang đợi</option>
                      </select>
                    </div>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Tên phòng</th>
                          <th>Họ tên</th>
                          <th>Giá</th>
                          <th>Thời gian</th>
                          <th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRooms.map((room, index) => (
                          <tr key={room._id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{room.title}</td>
                            <td>{userinfo(room)?.fullname}</td>
                            <td>{Intl.NumberFormat('vi-VN').format(room.price)} VNĐ</td>
                            <td>{userinfo(room)?.date}</td>
                            <td>{room.status === true ? 'Đã đặt' : room.status === false ? 'Đang đợi' : 'Phòng trống'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className='d-flex mt-3'>
                      <button className='btn btn-primary mx-1' onClick={handlePreviousPage} disabled={currentPage === 1}>Back</button>
                      {renderPageNumbers().map((number, idx) =>
                        number === '...' ? (
                          <span key={idx} className='mx-1'>...</span>
                        ) : (
                          <button key={number} className={`btn btn-primary mx-1 ${currentPage === number ? 'active' : ''}`} onClick={() => handlePageChange(number)}>
                            {number}
                          </button>
                        )
                      )}
                      <button className='btn btn-primary mx-1' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                  </div>
                </div>
              )}
              {showForm === 'Nhà xe' && <StatisticsPage />}
              {showForm === 'Hóa đơn' && <StatisticChart />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
