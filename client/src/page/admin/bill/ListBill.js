import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import DatePicker from 'react-datepicker'
import { apiContractsRead, apiCostOfElectsRead, apiExpensesRead } from "../../../axios/axios"
import '../../../assets/scss/admin/Bill.scss'


export default function ListBill() {
    const [expenses, setExxpenses] = useState([])
    const [contracts, setContracts] = useState([])
    const [costOfElects, setCostOfElects] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [value, setValue] = useState('')

    useEffect(() => {
        fetchData()
    }, [])
    const costOfElect = costOfElects.filter((item) => item.destroy === 'tồn tại')
    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiContractsRead()
        const costOfElect = await apiCostOfElectsRead()
        setCostOfElects(costOfElect.costOfElect)
        setExxpenses(res.expenses)
        setContracts(result.contracts)
    }

    const userActive = (data) => {
        try {
            return contracts?.filter((item) => {
                return item.room._id === data && item.status === true
            })?.map((item, index) => {
                return item.user.fullname
            })
        } catch (e) {
            console.log(e);
        }
    }

    const waterOut = (item) => {
        const result = Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
            (parseFloat(item.WaterEnd) - parseFloat(item.WaterStart)) * parseFloat(costOfElect[0].costOfWater)
        )
        return result
    }
    const electricOut = (item) => {
        const result = Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
            (parseFloat(item.electricEnd) - parseFloat(item.electricStart)) * parseFloat(costOfElect[0].costOfElectricity)
        )
        return result
    }
    const sumDetail = (item) => {
        // const roomPrice = parseFloat(item.room.price);
        const waterCost = (parseFloat(item.WaterEnd) - parseFloat(item.WaterStart)) * parseFloat(costOfElect[0].costOfWater);
        const electricityCost = (parseFloat(item.electricEnd) - parseFloat(item.electricStart)) * parseFloat(costOfElect[0].costOfElectricity);
        const otherCost = parseFloat(item.Other);

        const total = waterCost + electricityCost + otherCost

        return Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(total);
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Hóa đơn</h1>
                            <div class="btn-toolbar mb-2 mx-4">
                                <label>Lọc theo:</label>
                                <DatePicker required class="btn btn-sm btn-outline-secondary dropdown-toggle" selected={value} className='mx-2 '
                                    onChange={(date) => setValue(date)} dateFormat="MM/yyyy" placeholderText='Lọc theo tháng' />
                                <div class="btn-group me-2">
                                    {/* <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-reply-all-fill"></i> Export  </button> */}
                                    <button type='button' className='btn btn-outline-secondary border-0 py-0' onClick={toggleVisibility}><i class="bi bi-arrow-repeat text-primary fs-5 mb-2 p-0"></i></button>
                                </div>
                            </div>

                        </div>
                        {isVisible ?
                            <div className=" container-md my-4">
                                <div className=" row ">
                                    <div className="col">
                                        <div class="container-xxl py-5">
                                            <div class="container">
                                                <div class="row g-4 ">
                                                    {expenses.length > 0 ? expenses.filter((item) => {
                                                        return item.status === true
                                                    }).map((item) => {
                                                        return (
                                                            <div class="col-5 wow fadeInUp" data-wow-delay="0.1s">
                                                                <div class="room-item card rounded overflow-hidden max-heigth-listbill">
                                                                    <div class="px-4 mt-2">
                                                                        <div class="d-flex justify-content-between mb-3">
                                                                            <h5 class="mb-0">Hóa đơn</h5>
                                                                            <div class="ps-2">
                                                                                <small class="fa fa-star text-primary">{item.date}</small>
                                                                            </div>
                                                                        </div>
                                                                        <div class="d-flex mb-3">
                                                                            <small class="border-end me-3 pe-1">{item.room.title}</small>
                                                                            <small class="border-end me-3 pe-1" >{userActive(item.room._id)}</small>
                                                                            <small class=" me-3 pe-3" >{item.status === true ? 'Đã đóng' : <div className="text-primary">Chưa đóng</div>}</small>
                                                                        </div>

                                                                        <table className='table table-bordered'>
                                                                            <thead>
                                                                                <tr>
                                                                                    <td>
                                                                                    </td>
                                                                                    <td className="w-50">Số lượng (KW/Khối)</td>
                                                                                    <td>Giá (KW/Khối)</td>
                                                                                    <td className='w-100'>Thành tiền (VNĐ)</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Điện</td>
                                                                                    <td>{item.electricEnd - item.electricStart}</td>
                                                                                    <td>{costOfElect[0].costOfElectricity}</td>
                                                                                    <td>{electricOut(item)}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Nước</td>
                                                                                    <td>{item.WaterEnd - item.WaterStart}</td>
                                                                                    <td>{costOfElect[0].costOfWater}</td>
                                                                                    <td>{waterOut(item)}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div className='mx-2 mb-3'>
                                                                        {/* <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            Phòng:
                                                                        </div>
                                                                        <div className="col">

                                                                            {Intl.NumberFormat('vi-VN').format(item.room.price)} VNĐ/Tháng
                                                                        </div>
                                                                    </p> */}
                                                                        <p className='row ms-2'>
                                                                            <div className="col-3">
                                                                                <label>Điện:</label>
                                                                            </div>
                                                                            <div className="col">
                                                                                {electricOut(item)} VNĐ
                                                                            </div>
                                                                        </p>
                                                                        <p className='row ms-2'>
                                                                            <div className="col-3">
                                                                                <label>Nước:</label>
                                                                            </div>
                                                                            <div className="col">
                                                                                {waterOut(item)} VNĐ
                                                                            </div>
                                                                        </p>
                                                                        <p className='row ms-2'>
                                                                            <div className="col-3">
                                                                                <label>Khác:</label>
                                                                            </div>
                                                                            <div className="col">
                                                                                {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(item.Other)} VNĐ

                                                                            </div>
                                                                        </p>
                                                                        <p className='row ms-2'>
                                                                            <div className="col-3">
                                                                                <label>Tổng:</label>
                                                                            </div>
                                                                            <div className="col">
                                                                                {sumDetail(item)}  VNĐ
                                                                            </div>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                        :
                                                        <div> Không có dữ liệu </div>}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div > :
                            <div className='container-md my-4'>
                                <div className='row'>
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
                                                <th>Giá điện<br/> (VNĐ/Kwh)</th>
                                                <th>Giá nước <br/> (VNĐ/Khối)</th>
                                                <th>Khác</th>
                                                <th>Tổng</th>
                                                <th>Ngày</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses.length > 0 ? expenses.filter((item) => {
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
                                                        <td>{Intl.NumberFormat('vi-VN', {minimumFractionDigits: 3, maximumFractionDigits: 3}).format(costOfElect[0].costOfElectricity)}</td>
                                                        <td>{Intl.NumberFormat('vi-VN', {minimumFractionDigits: 3, maximumFractionDigits: 3}).format(costOfElect[0].costOfWater)}</td>
                                                        <td>{item.Other}</td>
                                                        <td>{sumDetail(item)}</td>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                )
                                            }) : <tr><div> Không có dữ liệu </div></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }

                    </main>
                </div>
            </div>
        </div>
    )
}
