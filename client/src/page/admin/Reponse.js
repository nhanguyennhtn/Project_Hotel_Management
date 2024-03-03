import React, { useState, useEffect } from 'react'
import AdminHeader from './components/Header'
import { apiBillCreate, apiMotelsRead, apiMotelsUpdate, apiUsersDelete, apiUsersRead } from '../../axios/axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Reponse() {
    const [motels, setMotels] = useState([])
    const [users, setUser] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
        const result = await apiUsersRead()
        setUser(result.user)
    }
    const handleConfirm = async (item) => {
        if (window.confirm('Xác nhận đặt phòng sẽ tiến hành tạo hợp đồng?')) {
            // await apiMotelsUpdate({
            //     _id: item.room._id, status: true
            // })
            fetchData()
        }
    }

    const handleCancel = async (item) => {
        if (window.confirm('Xác nhận hủy đăng ký?')) {
            await apiMotelsUpdate({ _id: item.room._id, status: null })
            await apiUsersDelete(item._id)
            fetchData()
        }
    }


    return (
        <div>
            <AdminHeader />
            <table class="table table-bordered container-md my-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">price</th>
                        <th scope="col">fullname</th>
                        <th scope="col">phoneNumber</th>
                        <th scope="col">Identity Card</th>
                        <th scope="col">minhchung</th>
                        <th scope="col">Date</th>
                        <th scope="col">status</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.length > 0 && users.filter(item => {
                        return (item?.room.status === false && item.status=== null) && item
                    }).map((item, index) => <tr>
                        <th scope="row">{++index}</th>
                        <td>{item.room.title}</td>
                        <td>{item.room.price}</td>
                        <td>{item.fullname}</td>
                        <td>{item.phone}</td>
                        <td>{item.IDcard}</td>
                        <td><img style={{ width: 300, height: 200, objectFit: 'cover' }} src={item.prove} alt='' /></td>
                        <td>{item.date}</td>
                        <td>{item.status
                            ? <div className='mb-3'>
                                <button className="btn" disabled>Đã được đặt</button>
                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                            </div>
                            : <div className='mb-3'>
                                <button onClick={() => handleConfirm(item)} className='btn btn-outline-success'>
                                    <Link to={`/admin/create/contracts`} state={item} className='btn'>Xác nhận</Link>
                                </button>
                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
                            </div>
                        }</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
