import React, { useState, useEffect, useRef } from 'react'
import FileBase64 from 'react-file-base64'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiMotelsRead, apiExpensesRead, apiExpensesCreate, apiExpensesDelete } from '../../../axios/axios'
import '../../../assets/scss/admin/Admin.scss'
import 'react-quill/dist/quill.snow.css';

import Detail from '../components/expense/Detail'

export default function Admin() {
    const [expenses, setExpenses] = useState([])
    const [rooms, setRooms] = useState([])
    // const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm()
    const createRef = useRef()

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiMotelsRead()
        setRooms(result.motels)
        setExpenses(res.expenses)
    }
    console.log(expenses, 'ùuesf');

    const handleCreate = async (data, e) => {
        try {
            const res = await apiExpensesCreate({ ...data, date: ngay })
            if (res.expenses) {
                fetchData()
                e.target.reset()
                createRef.current.click()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteProduct = async id => {
        if (true) {
            await apiExpensesDelete(id)
            fetchData()
        }
    }
    const submitDetail = () => {

    }

    return (
        <div>
            <AdminHeader />

            <div className='admin-wrapper mx-4 mt-4'>
                <div className='row'>
                    <div className='card'>
                        <div className='table-expense'>
                            <table className='table table-bordered'>
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

                <div className='row '>
                    <div className='card container-md '>
                        <div className='card-body text-center'>
                            <button className='p-2 mx-2 border-1 rounded col-1'>Hiện bảng</button>
                            <button className='p-2 mx-2 border-1 rounded col-1' onClick={submitDetail()}>Hiện hóa đơn</button>
                            <button className='p-2 mx-2 border-1 rounded col-1'>Date</button>
                        </div>
                    </div>
                </div>
                {/* <button ref={createRef} className="btn btn-outline-primary mb-4" data-bs-toggle="modal" data-bs-target="#createMotal">Create</button> */}

                {/* <div className="modal fade" id="createMotal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMotalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={handleSubmitCreate(handleCreate)}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createMotalLabel">Create expense</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="titleCreate" className="form-label">Giá điện</label>
                                        <input required {...registerCreate('costOfElectricity')} type="number" className="form-control" id="titleCreate" placeholder="costOfElectricity" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="costOfWater" className="form-label">Giá nước</label>
                                        <input required {...registerCreate('costOfWater')} type="number" className="form-control " id="costOfWater" placeholder="costOfWater" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="electric" className="form-label">Điện</label>
                                        <input required {...registerCreate('electric')} type="text" className="form-control " id="electric" placeholder="electric" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sizeCreate" className="form-label">Nước</label>
                                        <input required {...registerCreate('Water')} type="text" className="form-control " id="sizeCreate" placeholder="Size" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
                {Detail()}
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Giá điện</th>
                            <th>Giá nước</th>
                            <th>Điện</th>
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
                                <td>{item.costOfElectricity}</td>
                                <td>{item.costOfWater}</td>
                                <td>{item.electric}</td>
                                <td>{item.Water}</td>
                                <td>{item.date}</td>
                                <td>
                                    <Link to='/admin/update' state={item} className="btn btn-outline-warning">Chỉnh sửa</Link>
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
        </div>
    )
}
