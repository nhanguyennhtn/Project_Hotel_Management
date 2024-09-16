import React, { useEffect, useState } from "react";
import { apiUsersRead } from "../../../axios/axios";
import AdminHeader from '../components/Header'
import ContentMenu from "../components/ContentMenu";
import { Link } from "react-router-dom";

export default function Customers() {
    const [users, setUsers] = useState()
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const res = await apiUsersRead()
        setUsers(res.user)

    }

    // return (
    //     <div>
    //         <AdminHeader />
    //         <div className="container-md mt-4">
    //             <table class="table">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">#</th>
    //                         <th scope="col">Họ và Tên</th>
    //                         <th scope="col">Phòng </th>
    //                         <th scope="col">Số điện thoại</th>
    //                         <th scope="col">Ngày đăng ký</th>
    //                         <th scope="col">Trạng thái</th>
    //                         <th scope="col"></th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {users?.map((item, index) => {
    //                         return (
    //                             <tr key={item._id}>
    //                                 <td>{++index}</td>
    //                                 <td>{item.fullname}</td>
    //                                 <td>{item.room.title}</td>
    //                                 <td>{item.phone}</td>
    //                                 <td>{item.date}</td>
    //                                 <td>{item.status ?
    //                                     <p className="text-primary">Đang hoạt động</p>
    //                                     :
    //                                     <p className="text-secondary">Ngưng hoạt động</p>
    //                                 }</td>
    //                                 <td><Link to={'/admin/customers/Detail'} state={item} className="btn btn-outline-primary mb-4" >Chi tiết</Link></td>
    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // )
    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Danh sách khách hàng</h1>
                        </div>
                        <div className="container-md mt-4">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Họ và Tên</th>
                                        <th scope="col">Phòng </th>
                                        <th scope="col">Số điện thoại</th>
                                        <th scope="col">Ngày đăng ký</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{++index}</td>
                                                <td>{item.fullname}</td>
                                                <td>{item.room.title}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.date}</td>
                                                <td>{item.status ?
                                                    <p className="text-primary">Có phòng</p>
                                                    :
                                                    <p className="text-secondary">Đã trả phòng</p>
                                                }</td>
                                                <td><Link to={'/admin/customers/Detail'} state={item} className="btn btn-outline-primary mb-4" >Chi tiết</Link></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}