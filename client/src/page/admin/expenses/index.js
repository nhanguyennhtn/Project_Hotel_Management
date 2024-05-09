import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiMotelsRead, apiExpensesRead, apiContractsRead, apiExpensesDelete, apiExpensesUpdate } from '../../../axios/axios'
import ContentMenu from '../components/ContentMenu'
import '../../../assets/scss/admin/Admin.scss'
import 'react-quill/dist/quill.snow.css'

import DatePicker from "react-datepicker"
import Detail from '../components/expense/Detail'
import Table from '../components/expense/Table'
import DateFiler from '../components/expense/DateFiler'
import ReactQuill from 'react-quill'

export default function Admin() {
    const [expenses, setExpenses] = useState([])
    const [contractvalue, setContracts] = useState([])
    const [rooms, setRooms] = useState([])
    const [valueIn, setValueIn] = useState('')
    const [valueOut, setValueOut] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isTable, setIsTable] = useState(false)
    const [isBill, setIsBill] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiMotelsRead()
        const contract = await apiContractsRead()
        setContracts(contract.contracts)
        setRooms(result.motels)
        setExpenses(res.expenses)
    }
    const submitShowTable = () => {
        setIsTable(!isTable)
    }
    const submitDetail = () => {
        setIsBill(!isBill)
    }
    const active = (data) => {
        return contractvalue?.filter((item) => {
            return item.room._id === data._id
        })?.map((item) => {
            return (
                {
                    title: item.room.title,
                    status: item.user.status
                }
            )
        })
    }
    const activeChecked = (data) => {
        if (data.status == true) {
            return <Link to={'/admin/expense/create'} state={data} className='btn fs-6 m-0 px-0 '>Create</Link>
        } else if (data.status == null || data.status == false) {
            return <Link to={'/admin/expense/create'} state={data} className='btn fs-6 text-secondary m-0 px-0'>Create</Link>
        }
    }

    const deleteProduct = async id => {
        if (true) {
            await apiExpensesDelete(id)
            fetchData()
        }
    }
    const submitProduct = async (item) => {
        if (window.confirm('Xác nhận thành công')) {
            await apiExpensesUpdate({ _id: item._id, status: true })
            fetchData()

        }
    }
    const handleShowData = () => {
        return (
            <div className='card'>
                <table className="table table-bordered mt-2 shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Phòng</th>
                            <th>Giá điện (đồng/kWh)</th>
                            <th>Giá nước (đồng/m3)</th>
                            <th>Điện </th>
                            <th>Nước</th>
                            <th>Ngày</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.length > 0 ? expenses.map((item, index) =>
                            <tr key={item._id}>
                                <td>{++index}</td>
                                <td>{item.room.title}</td>
                                <td>{Intl.NumberFormat('vi-VN').format(item.costOfElectricity)}</td>
                                <td>{Intl.NumberFormat('vi-VN').format(item.costOfWater)}</td>
                                <td>{item.electric}</td>
                                <td>{item.Water}</td>
                                <td>{item.date}</td>
                                <td>
                                    {item.status === true ?
                                        <button className="btn btn-outline-secondary btn-block " disabled>Đã đóng</button>
                                        :
                                        <button onClick={() => submitProduct(item)} className="btn btn-outline-warning">Xác nhận</button>
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteProduct(item._id)}>Xoá</button>
                                </td>
                            </tr>
                        ) :
                            <tr>
                                <td colSpan='7'>Không có dữ liệu</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    const createExpenses = contractvalue?.filter((item) => {
        return item.room.title === valueIn && item.user.fullname === valueOut
    })
    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Điện nước phòng</h1>
                            <div className='btn-toolbar mb-2 mx-4 '>
                                <div class="btn-group me-2">
                                    <Link to={'/admin/expense/export'} class="btn btn-sm btn-outline-secondary"><i class="bi bi-reply-all-fill"></i> Export  </Link>
                                </div>
                            </div>
                        </div>
                        <div className='container-xxl  p-2 rounded-2'>
                            <div classname='row justify-content-center gap-2'>
                                <select value={valueIn} onChange={(e) => setValueIn(e.target.value)} class=" col-md-4 p-2 rounded-3 bd-highlight">
                                    <option selected value=''>Tên phòng</option>
                                    {contractvalue.filter((item) => {
                                        return item.status == true
                                    }).map((item) => {
                                        return <option value={item.room.title}>{item.room.title}</option>
                                    })}
                                </select>
                                <select value={valueOut} onChange={(e) => setValueOut(e.target.value)} class="col-md-4 p-2 ms-2 rounded-3 bd-highlight">
                                    <option selected value=''>Họ tên</option>
                                    {contractvalue.filter((item) => {
                                        return item.status == true && item.room.title === valueIn
                                    }).map((item) => {
                                        return <option value={item.user.fullname}>{item.user.fullname}</option>
                                    })}
                                </select>
                                {createExpenses.map((item) => {
                                    return (
                                        <Link to={'/admin/expense/create'} state={item} className='col-1 btn btn-warning  ms-2 rounded-3'>Tạo</Link>
                                    )
                                })}
                                {/* <button className='col-1 btn btn-warning  ms-2 rounded-3 justify-content-center' >Tạo</button> */}
                            </div>
                        </div>
                        <div className='admin-wrapper mt-4 ' >
                            <div className='row'>
                                <div className='container-md'>
                                    <table className='table table-bordered mt-2 shadow'>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th>Phòng</th>
                                                <th>Họ tên</th>
                                                <th>Điện </th>
                                                <th>Nước</th>
                                                <th>Khác</th>
                                                <th>Ngày</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {expenses?.length > 0 ?
                                                expenses?.filter((item) => {
                                                    if (valueIn === '') {
                                                        return { ...item }
                                                    } else if (item.room.title === valueIn && valueOut === '') {
                                                        return item.room.title === valueIn
                                                    }
                                                    return item.room.title === valueIn && item.user.fullname === valueOut
                                                }).map((item, index) => {
                                                    return (
                                                        <tr key={item._id}>
                                                            <td>{++index}</td>
                                                            <td>{item.room.title}</td>
                                                            <td>{item?.user?.fullname}</td>
                                                            <td>{Intl.NumberFormat('vi-VN').format(item.electric * item.costOfElectricity)} vnđ</td>
                                                            <td>{Intl.NumberFormat('vi-VN').format(item.Water * item.costOfWater)} vnđ</td>
                                                            <td>{Intl.NumberFormat('vi-VN').format(item.Other)} vnđ</td>
                                                            {/* <td><ReactQuill value={item.desc} readOnly={true} theme="bubble" /></td> */}
                                                            <td>{item.date}</td>
                                                            <td>
                                                                {item.status === true ?
                                                                    <button className="btn btn-outline-secondary btn-block " disabled>Đã đóng</button>
                                                                    :
                                                                    <button onClick={() => submitProduct(item)} className="btn btn-outline-warning">Xác nhận</button>
                                                                }
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-outline-danger" onClick={() => deleteProduct(item._id)}>Xoá</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                ) :
                                                <tr>
                                                    <td colSpan='7'>Không có dữ liệu</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className='row'>
                                <div className='card py-2'>
                                    <div className='table-expense '>
                                        <table className='table table-bordered'>
                                            <thead>
                                                {rooms.map((item) => {
                                                    return (
                                                        <th>
                                                            {item.title}
                                                        </th>
                                                    )
                                                })}
                                            </thead>
                                            <tbody>
                                                {rooms?.map((item) => {
                                                    return (
                                                        <td>{activeChecked(item)}</td>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}
                            {/* {<Table />} */}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}
