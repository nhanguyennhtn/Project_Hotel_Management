import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import { apiMotelsRead, apiUsersRead } from '../../../axios/axios'
import { PieChart } from '@mui/x-charts/PieChart'

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
  })

  const [piechartData, setPieChartData] = useState([
    { id: 1, value: 40, label: 'Phòng trống' },
    { id: 2, value: 30, label: 'Đang đợi' },
    { id: 3, value: 20, label: 'Đã đặt phòng' },
  ])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
    const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')

    try {
      const usersResponse = await apiUsersRead()
      const motelsResponse = await apiMotelsRead()

      // Safeguard if usersResponse.user is undefined or null
      const users = usersResponse?.user || []
      const motels = motelsResponse?.motels || []

      // Updating chartData with users data
      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: users.map((item) => item?.room?.title || 'N/A'),  // Safeguard with 'N/A' if room title is undefined
          },
        },
        series: [
          {
            ...prevChartData.series[0],
            data: users.map((item) => item?.room?.price || 0),  // Safeguard with 0 if price is undefined
          },
        ],
      }))

      // Safeguard pie chart data with empty array if motels are not available
      const pieLabels = motels.map((room) => (room?.status ? 'Đã đặt' : 'Phòng trống')) || []
      const updatedPieData = pieLabels.reduce((acc, label) => {
        const found = acc.find((item) => item.label === label)
        if (found) {
          found.value += 1
        } else {
          acc.push({ id: acc.length + 1, value: 1, label })
        }
        return acc
      }, [])

      setPieChartData(updatedPieData)
    } catch (e) {
      console.error('Error fetching data:', e)
    }
  }

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
                  {/* Pie chart with dynamic data */}
                  <div className='card col'>
                    <div className="container text-center">
                      <PieChart
                        series={[
                          {
                            data: piechartData,
                            labelKey: 'label',
                            valueKey: 'value',
                          },
                        ]}
                        width={150}
                        height={150}
                      />
                      <div className="legend mt-3">
                        {piechartData?.map((item, index) => (
                          <div key={index} className="d-flex align-items-center justify-content-center">
                            <span className={`legend-color legend-color-${item.id} me-2`}></span>
                            <span>{item.label}: {item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Other cards for statistics */}
                  <div className='card col'>
                    <div className='col-4 gap-1 ms-2 p-0'>
                      Phần trăm điện nước
                    </div>
                  </div>
                  <div className='card col'>
                    Tròn 3
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='d-flex justify-content-evenly'>
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
                <label className='text-center fs-4 text-uppercase'>Thống kê điện nước theo tháng</label>
                <Chart options={chartData?.options} series={chartData?.series} type="bar" height={350} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
