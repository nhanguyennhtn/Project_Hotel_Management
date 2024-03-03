import { useEffect, useState } from "react"
import { apiContractsUpdate, apiMotelsUpdate, apiUsersRead, apiUsersUpdate } from "../../../axios/axios"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import AdminHeader from '../components/Header.js'

export default function Cancel() {
    const [user, setUser] = useState()
    const [value, setValue] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await apiUsersRead()
        setUser(result.user)

    }
    const handleConfirm = async (data) => {
        if (window.confirm('Are you sure?')) {
            await apiMotelsUpdate({ _id: data.room._id, status: true })
            fetchData()
        }
    }

    const handleCancel = async (data) => {
        if (window.confirm("Xác nhận hủy phòng và ngưng hợp đồng?")) {
            await apiMotelsUpdate({ _id: data.room._id, status: null })
            await apiUsersUpdate({ _id: data._id, status: false })
            await apiContractsUpdate({ _id: data.contract._id, status: false })
            fetchData()
            // console.log(data._id, 'user');
            // console.log(data.room._id, 'room');
            // console.log(data.contract._id, 'contract');
        }
    }

    return (
        <div>
            <div className="">
                <AdminHeader />
            </div>
            <div>
                <table class="table container-md my-4">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Họ Tên</th>
                            <th scope="col">Phòng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Căn cước</th>
                            <th scope="col">Ngày bắt đầu</th>
                            <th scope="col">Ngày kết thúc</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.length > 0 && user.filter((item) => {
                            return (item?.contract?.status === true && item.room.status === true) && item
                        }).map((item, index) => <tr>
                            <th scope="row">{++index}</th>
                            <td>{item.fullname}</td>
                            <td>{item.room.title}</td>
                            <td>{Intl.NumberFormat('vi-VN').format(item.room.price)} vnđ</td>
                            <td>{item.phone}</td>
                            <td>{item.IDcard}</td>
                            <td>{item.dateStart}</td>
                            <td>{item.dateEnd}</td>
                            {/* <td><img style={{ width: 300, height: 100, objectFit: 'cover' }} src={item.minhchung} alt='' /></td> */}
                            <td>{item.status
                                ? <div className='mb-3'>
                                    <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                                </div>
                                : <div className='mb-3'>
                                    <button onClick={() => handleConfirm(item)} className='btn btn-outline-success'>Xác nhận</button>
                                    <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
                                </div>
                            }</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    )
}