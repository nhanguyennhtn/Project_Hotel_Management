import { useEffect, useState } from 'react'
import '../../assets/scss/template/dashboard.scss'
import ContentMenu from './components/ContentMenu'
import AdminHeader from './components/Header'
import { apiContractsRead, apiContractsUpdate, apiMotelsUpdate, apiUsersRead, apiUsersUpdate } from '../../axios/axios'
import { Link } from 'react-router-dom'
import Table from './components/expense/Table'

export default function Admin() {
    const [customers, setCustomers] = useState([])
    const [Contracts, setContracts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        const contract = await apiContractsRead()
        setContracts(contract.contracts)
        console.log(Contracts);
        setCustomers(res.user)
    }
    const handleConfirm = async (data) => {
        if (window.confirm('Are you sure?')) {
            // await apiMotelsUpdate({ _id: data.room._id, status: true })
            fetchData()
        }
    }

    const handleCancel = async (data) => {
        if (window.confirm('Are you sure?')) {
            await apiMotelsUpdate({ _id: data.room._id, status: null })
            Contracts?.filter((item) => {
                return item.user._id === data._id && item.status == true
            })?.map(async (item) => (
                await apiContractsUpdate({ _id: item._id, status: false })
            ))
            const res = await apiUsersUpdate({ _id: data._id, status: false })
            fetchData()
        }
    }
    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Danh sách phòng hoạt động</h1>
                        </div>
                        <div className='container-md'>
                            <table class="table container-md my-4 shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">title</th>
                                        <th scope="col">price</th>
                                        <th scope="col">fullname</th>
                                        <th scope="col">phoneNumber</th>
                                        <th scope="col">Identity Card</th>
                                        {/* <th scope="col">minhchung</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers?.length > 0 ? customers.filter((item) => {
                                        return item.status === true && item
                                    }).map((item, index) => <tr>
                                        <th scope="row">{++index}</th>
                                        <td>{item.room.title}</td>
                                        <td>{item.room.price}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.IDcard}</td>
                                        {/* <td><img style={{ width: 300, height: 100, objectFit: 'cover' }} src={item.minhchung} alt='' /></td> */}
                                        <td>{item.status
                                            ? <div className='mb-3'>
                                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                                            </div>
                                            : <div className='mb-3'>
                                                <Link to={`/admin/create/contracts`} state={item} className='btn btn-outline-success'>Xác nhận</Link>
                                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
                                            </div>
                                        }</td>
                                    </tr>)
                                        :
                                        <tr>
                                            <td colSpan='6'>Không có dữ liệu</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Danh sách xác nhận hóa đơn</h1>
                        </div>
                        <div>
                            <Table />
                        </div>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Danh sách xác nhận đặt phòng</h1>
                        </div>
                        <div className='container-md'>
                            <table class="table table-bordered container-md my-4 shadow">
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
                                    {customers?.length > 0 && customers.filter(item => {
                                        return (item?.room.status === false && item.status === null) && item
                                    })?.map((item, index) => <tr>
                                        <th scope="row">{++index}</th>
                                        <td>{item.room.title}</td>
                                        <td>{item.room.price}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.IDcard}</td>
                                        <td><img style={{ width: 200, height: 100, objectFit: 'cover' }} src={item.prove} alt='' /></td>
                                        <td>{item.date}</td>
                                        <td>{item.status
                                            ? <div className='mb-3'>
                                                <button className="btn" disabled>Đã được đặt</button>
                                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
                                            </div>
                                            : <div className='mb-3 d-flex'>
                                                <button onClick={() => handleConfirm(item)} className='btn btn-outline-success'>
                                                    <Link to={`/admin/create/contracts`} state={item} className='btn'>Xác nhận</Link>
                                                </button>
                                                <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
                                            </div>
                                        }</td>
                                    </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}