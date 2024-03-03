import React, { useEffect, useState } from "react";
import { apiContactRead, apiUsersRead } from "../../../axios/axios";
import AdminHeader from '../components/Header'
import { Link } from "react-router-dom";

export default function Customers() {
    const [contacts, setContacts] = useState()
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const res = await apiContactRead()
        setContacts(res.contacts)

    }

    return (
        <div>
            <AdminHeader />
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
                        {contacts?.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{++index}</td>
                                    {/* <td>{item.username.username}</td> */}
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.desc}</td>

                                    <td><Link to={'/admin/customers/Detail'} state={item} className="btn btn-outline-primary mb-4" >Chi tiết</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}