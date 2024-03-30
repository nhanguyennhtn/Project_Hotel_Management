import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiMotelsRead, apiExpensesRead } from '../../../axios/axios'
import ContentMenu from '../components/ContentMenu'
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
                        <div className='admin-wrapper mt-4 ' >
                            <div className='row'>
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
                                                        <td><Link to={'/admin/expense/create'} state={item} className='btn '>Create</Link></td>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {<Table />}
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}
