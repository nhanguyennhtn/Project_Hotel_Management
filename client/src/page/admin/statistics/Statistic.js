import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { Pie } from 'react-chartjs-2'
import moment from 'moment'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import { apiMotelsRead, apiUsersRead } from '../../../axios/axios'
import { PieChart } from '@mui/x-charts/PieChart';

export default function Statistic() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: 'Sales',
        data: [],
      },
    ],
  });
  const [piechart, setPieChart] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const startOfMoth = moment().startOf('month').format('YYYY-MM-DD')
    const endtOfMoth = moment().endOf('month').format('YYYY-MM-DD')

    try {
      const res = await apiUsersRead()
      const room = await apiMotelsRead()
      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: res.user.map((item) => item.room.title),
          },
        },
        series: [
          {
            ...prevChartData.series[0],
            data: res.user.map((item) => item.room.price)
          }
        ]
      }))
      const labels = room.map((room) => room.status ? 'Đã đặt' : 'phòng trống')
      console.log(labels);
      setPieChart()
    } catch (e) {
      console.log('Error fetching data:', e);
    }

  }

  const data = [
    { id: 1, value: 40, label: 'Phòng trống' },
    { id: 2, value: 30, label: 'Đang đợi' },
    { id: 3, value: 20, label: 'Đã đặt phòng' },
  ];

  return (
    <div className='content-reponse'>
      <div className='wrapper'>
        <AdminHeader />
        <div class="container-fluid">
          <div class="row">
            <ContentMenu />
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h4 ms-4">Danh sách đặt phòng</h1>
              </div>
              <div className='row pb-2'>
                <div className='d-flex gap-2'>
                  <div className='card col'>
                    <div className="container text-center">
                      <PieChart
                        series={[
                          {
                            data,
                            labelKey: 'label',
                            valueKey: 'value',
                          },
                        ]}
                        width={150}
                        height={150}
                      />
                      <div className="legend mt-3">
                        {data.map((item, index) => (
                          <div key={index} className="d-flex align-items-center justify-content-center">
                            <span className={`legend-color legend-color-${item.id} me-2`}></span>
                            <span>{item.label}: {item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='card col'>
                    <div className='col-4 gap-1 ms-2 p-0 '>
                      phần trăm điện nước
                    </div>
                  </div>
                  <div className='card col'>
                    tròn 3
                  </div>

                </div>
              </div>
              <div className='row'>
                <div className='d-flex justify-content-evenly '>
                  <div className='card bg-primary col-3'>
                    <label>Hotel</label>
                  </div>
                  <div className='card bg-info col-3'>
                    <label>Customers</label>
                  </div>
                  <div className='card bg-danger col-3'>
                    <label>Customers</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <label className='text-center fs-4 text-uppercase'>Thống kê điên nước theo tháng</label>
                {/* <Chart options={options} series={series} type="bar" height={350} /> */}
                <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}