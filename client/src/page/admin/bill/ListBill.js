import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import DatePicker from 'react-datepicker'
import { apiContractsRead, apiExpensesRead } from "../../../axios/axios"
import '../../../assets/scss/admin/Bill.scss'


export default function ListBill() {
    const [expenses, setExxpenses] = useState([])
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiContractsRead()
        setExxpenses(res.expenses)
        console.log(expenses);
        setContracts(result.contracts)
    }

    const userActive = (data) => {
        try {
            return contracts?.filter((item) => {
                return item.room._id === data && item.status == true
            })?.map((item, index) => {
                console.log(item.user.fullname, index);
                return item.user.fullname
            })
        } catch (e) {
            console.log(e);
        }
    }

    const waterOut = (item) => {
        const result = parseFloat(item.costOfWater) * parseFloat(item.Water)
        return result
    }
    const electricOut = (item) => {
        const result = parseFloat(item.costOfWater) * parseFloat(item.Water)
        return result
    }
    const sumDetail = (item) => {
        const result = parseFloat(item.room.price) + parseFloat(item.electric) + (parseFloat(electricOut(item))) + (parseFloat(waterOut(item))) + parseFloat(item.Other)
        return result
    }

    const [value, setValue] = useState('')

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
                                    <button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-reply-all-fill"></i> Export  </button>
                                </div>
                            </div>

                        </div>
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
                                                        <div class="col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="0.1s">
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
                                                                                <td className="w-50">Số sử dụng (KW/Khối)</td>
                                                                                <td>Giá (KW/Khối)</td>
                                                                                <td className='w-100'>Thành tiền (VNĐ)</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Điện</td>
                                                                                <td>{item.costOfElectricity}</td>
                                                                                <td>{item.electric}</td>
                                                                                <td>{Intl.NumberFormat('vi-VN').format(electricOut(item))}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Nước</td>
                                                                                <td>{item.costOfWater}</td>
                                                                                <td>{item.Water}</td>
                                                                                <td>{Intl.NumberFormat('vi-VN').format(waterOut(item))}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className='mx-2 mb-3'>
                                                                    <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            Phòng:
                                                                        </div>
                                                                        <div className="col">

                                                                            {Intl.NumberFormat('vi-VN').format(item.room.price)} VNĐ/Tháng
                                                                        </div>
                                                                    </p>
                                                                    <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            <label>Điện:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            {Intl.NumberFormat('vi-VN').format(electricOut(item))} VNĐ
                                                                        </div>
                                                                    </p>
                                                                    <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            <label>Nước:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            {Intl.NumberFormat('vi-VN').format(waterOut(item))} VNĐ
                                                                        </div>
                                                                    </p>
                                                                    <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            <label>Khác:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            {Intl.NumberFormat('vi-VN').format(item.Other)} VNĐ

                                                                        </div>
                                                                    </p>
                                                                    <p className='row ms-2'>
                                                                        <div className="col-3">
                                                                            <label>Tổng:</label>
                                                                        </div>
                                                                        <div className="col">
                                                                            {Intl.NumberFormat('vi-VN').format(sumDetail(item))}  VNĐ
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
                        </div >
                    </main>
                </div>
            </div>
        </div>
    )
}
