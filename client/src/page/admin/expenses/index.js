import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiMotelsRead, apiExpensesRead } from '../../../axios/axios'
import '../../../assets/scss/admin/Admin.scss'
import 'react-quill/dist/quill.snow.css'

import DatePicker from "react-datepicker"
import Detail from '../components/expense/Detail'
import Table from '../components/expense/Table'
import DateFiler from '../components/expense/DateFiler'

export default function Admin() {
    const [expenses, setExpenses] = useState([])
    const [rooms, setRooms] = useState([])
    const [valueIn, setValueIn] = useState('')
    const [valueOut, setValueOut] = useState('')
    const [isTable, setIsTable] = useState(false)
    const [isBill, setIsBill] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiMotelsRead()
        setRooms(result.motels)
        setExpenses(res.expenses)
    }
    const submitShowTable = () => {
        setIsTable(!isTable)
    }
    const submitDetail = () => {
        setIsBill(!isBill)
    }

    return (
        <div>
            <AdminHeader />

            <div className='admin-wrapper mx-4 mt-4 card' >
                <div className='row'>
                    <div className='card py-2'>
                        <div className='table-expense'>
                            <table className='table table-bordered '>
                                <thead>
                                    {/* <th scope="col">#</th> */}
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
                                            <td><Link to={'/admin/expense/create'} state={item} className='btn '>Create</Link></td>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div class="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
                        <div class="container">
                            <div class="bg-white shadow size-container" >
                                <div class="row g-2">
                                    <div class="col-md-12">
                                        <div class="row g-2 ms-auto">
                                            <div class="col-md-3">
                                                <button className='form-control datetimepicker-input bg-gray' onClick={() => submitShowTable()}>Hiện bảng</button>
                                            </div>
                                            <div class="col-md-3">
                                                <button className='form-control datetimepicker-input bg-block' onClick={() => submitDetail()}>Hóa đơn</button>
                                            </div>
                                            <div class="col-md-4">
                                                <div className='row'>
                                                    <div class="col date ms-2" id="date2" data-target-input="nearest">
                                                        <DatePicker selected={valueIn} class=" form-control datetimepicker-input w-100"
                                                            onChange={(date) => setValueIn(date)} dateFormat="MM/yyyy" placeholderText='Từ tháng ' data-target="#date2" data-toggle="datetimepicker" />
                                                    </div>
                                                    {/* <div class="col date " id="date2" data-target-input="nearest">
                                                        <DatePicker selected={valueOut} class=" form-control datetimepicker-input w-100"
                                                            onChange={(date) => setValueOut(date)} dateFormat="MM/yyyy" placeholderText='Chọn đến tháng ' data-target="#date2" data-toggle="datetimepicker" />
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* <div class="col-md-2">
                                                <button onClick={() => DateFiler(valueIn, valueOut)} class="btn btn-primary w-100">Submit</button>
                                            </div> */}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isTable && <Table />}
                {isBill && <Detail />}
            </div>
        </div>
    )
}
