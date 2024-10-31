import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import AdminHeader from '../components/Header';
import ContentMenu from '../components/ContentMenu';
import { apiMotelsRead } from '../../../axios/axios'
import StatisticsPage from './managerVehicle';
import axios from 'axios';

export default function Statistic() {
  const [data, setData] = useState({ available: 0, booked: 0, waitingbooking: 0 });
  const [motels, setMotels] = useState([])
  const [vehicleIns, setVehicleIn] = useState([])
  const [showForm, setShowForm] = useState('Phòng trọ')

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const motelsResponse = await apiMotelsRead();
      const motels = motelsResponse?.motels || [];
      const vehicleIn = await axios.get('http://localhost:3535/api/XeVao/read')
      setVehicleIn(vehicleIn.data.vehicleIn)
      setMotels(motels)

      const waitingbooking = motels.filter(motel => motel.status === false).length;
      const bookedCount = motels.filter(motel => motel.status === true).length;
      const availableCount = motels.filter(motel => motel.status === undefined || motel.status === null).length;

      setData({ available: availableCount, booked: bookedCount, waitingbooking });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const NumVehicleIn = vehicleIns.filter((vehicleIn) => vehicleIn.trangthai === "Trong bãi")
  const NumVehicleOut = vehicleIns.filter((vehicleOut) => vehicleOut.trangthai === "Rời bãi")

  const barChartOptions = {
    chart: {
      id: 'bar-chart',
      type: 'bar',
    },
    xaxis: {
      categories: ['Phòng trống', 'Đã đặt', 'Đang đợi'],
    },
  };

  const barChartSeries = [
    {
      name: 'Số lượng',
      data: [data.available, data.booked, data.waitingbooking],
    },
  ];

  return (
    <div className='content-reponse'>
      <div className='wrapper'>
        <AdminHeader />
        <div className="container-fluid">
          <div className="row">
            <ContentMenu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h4 ms-4">Danh sách đặt phòng</h1>
              </div>
              <div className='row pb-2'>
                <div className='d-flex gap-2'>
                  <div className='card col'>
                    <div className="container ">
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
                    <button className={`btn rounder-3  border-0 text-dark ${showForm === 'Phòng trọ' ? 'active' : ''}`} onClick={() => setShowForm('Phòng trọ')}><label className='ms-2'><strong>Phòng trọ</strong></label></button>
                  </div>
                  <div className='card bg-danger col-3'>
                    <button className={`btn rounder-3 border-0 text-dark ${showForm === 'Nhà xe' ? 'active' : ''}`} onClick={() => setShowForm('Nhà xe')}><label className='ms-2'><strong>Nhà xe</strong></label></button>
                  </div>
                </div>
              </div>
              {showForm === 'Phòng trọ' && (
                <div className='row'>
                  <label className='text-center fs-4 text-uppercase'>Thống kê doanh thu từng phòng/tháng</label>
                  <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
                </div>
              )
              }
              {showForm === 'Nhà xe' && <StatisticsPage />}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
