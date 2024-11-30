import React, { useState, useEffect } from 'react'
import AdminHeader from './components/Header'
import ContentMenu from './components/ContentMenu'
import {  apiContractsCreate, apiMotelsRead, apiMotelsUpdate, apiUsersDelete, apiUsersRead } from '../../axios/axios'

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
            await apiMotelsUpdate({
                _id: item.room._id, status: true
            })
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
    const handleCreate = async (item) => {
        // e.preventDefault()
        const dateStart = item.dateStart.split(',')[1].split(' ')
        const parts1 = item.dateStart.split(',')
        const month1 = parseInt(dateStart[3]);
        const year1 = parseInt(parts1[2]);

        const dateEnd = item.dateEnd.split(',')[1].split(' ')
        const parts2 = item.dateEnd.split(',')
        const month2 = parseInt(dateEnd[3]);
        const year2 = parseInt(parts2[2]);

        const yeartotal = parseInt(year2) - parseInt(year1)
        const monthtotal = parseInt(month2) - parseInt(month1)

        const totalT = yeartotal * 12 + monthtotal
        const topic = 'HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ'
        const host = 'Nguyễn Hoàng Thanh Nhã'
        const phoneHost = '0396984478'
        try {
            if (window.confirm('Hợp đồng sẽ được tạo và gửi đến khách hàng')) {
                const res = await apiContractsCreate({
                    user: item._id,
                    room: item.room._id,
                    topic: topic,
                    host: host,
                    phoneHost: phoneHost,
                    cycle: totalT,
                    signatureB: item.fullname,
                    signatureA: host,
                    status: null
                })
                await apiMotelsUpdate({ _id: item.room._id, status: true })
                console.log(res);
            }
            fetchData()
        } catch (e) {
            console.log(e)
        }
        return 0
    }

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
                            <table class="table table-bordered container-md my-4">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Phòng</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Căn cước công dân</th>
                                        <th scope="col">minh chứng</th>
                                        <th scope="col">Ngày</th>
                                        <th scope="col">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.filter(item => {
                                        return (item?.room?.status === false && item.status === null) && item
                                    })?.length > 0 ?
                                        users.filter(item => {
                                            return (item?.room?.status === false && item.status === null) && item
                                        })?.map((item, index) => <tr>
                                            <th scope="row">{++index}</th>
                                            <td>{item.room.title}</td>
                                            <td>{item.room.price}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.IDcard}</td>
                                            <td><img style={{ width: 200, height: 100, objectFit: 'cover' }} src={item.prove} alt='' /></td>
                                            <td>{item.date}</td>
                                            <td>{item?.status
                                                ? <div className='mb-3'>
                                                    <button className="btn" disabled>Đã được đặt</button>
                                                    <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                                                </div>
                                                : <div className='mb-1 d-flex'>
                                                    {/* <button onClick={() => handleConfirm(item)} className='btn btn-outline-success'>
                                                    <Link to={`/admin/create/contracts`} state={item} className='btn'>Xác nhận</Link>
                                                </button> */}
                                                    <button onClick={() => handleCreate(item)} className='btn btn-success w-100'> Xác nhận </button>
                                                    <button onClick={() => handleCancel(item)} className='btn btn-danger p-0 ms-1 w-100'>Hủy bỏ</button>
                                                </div>
                                            }</td>
                                        </tr>) :
                                        <tr>
                                            <td colSpan='9' className='text-center'>Không có dữ liệu</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
