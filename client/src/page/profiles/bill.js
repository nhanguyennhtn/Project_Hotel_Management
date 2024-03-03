import Headers from '../../components/Header'
import Foodter from '../../components/Footer'
import '../../assets/scss/home/bill.scss'
import { useEffect, useState } from 'react'
import { apiContractsRead, apiHopDongsRead, apiMotelsRead, apiUsersRead } from '../../axios/axios'
export default function HoaDon() {
    const [customers, setCustomers] = useState([])
    const [motels, setMotels] = useState([])
    const [total, setTotal] = useState([])
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        const motel = await apiMotelsRead()
        setCustomers(res.user)
        setMotels(motel.motels)
        const Tongdien = motel.motels?.map(item => {
            return (
                {
                    dien: parseInt(item.dien) * 1927,
                    nuoc: parseInt(item.nuoc) * 5.973
                }
            )
        })
        setTotal(Tongdien.dien)

        // console.log(motel, 'jjjjjjjjjjjjj');
    }

    return (
        <div classname='hopdong'>
            <div >
                <Headers />
            </div>
            {customers.filter((item) => {
                return (userInfo.username?._id === item.username?._id) && item.username
            }).map((item) => {
                return (
                    <div>
                        <div className='container-md mt-4'>
                            <div className='container-md '>
                                <div className='card row mx-auto mb-3'>
                                    <div className=''>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container-md mt-4'>
                            <div className='container-md '>
                                <div className='container-md card w-50'>
                                    <div className='card row mx-auto mt-4'>
                                        <div className='fs-5 fw-bold text-center mt-4'>
                                            <p>
                                                HÓA ĐƠN TIỀN TRỌ
                                            </p>
                                            <p>
                                                PHÒNG Số {item.title}
                                            </p>
                                            <p className='fs-6 text-right'>
                                                {item.ngayNDN}
                                            </p>
                                        </div>
                                        <div className=''>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <td> 10/.../20...</td>
                                                        <td>Số KW (khối)</td>
                                                        <td>Số tiền/KW(khối)</td>
                                                        <td>Thành tiền</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Điện</td>
                                                        <td>{item.dien}</td>
                                                        <td>2.973</td>
                                                        <td>{parseInt(item.dien) * 2973 * 1000}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nước</td>
                                                        <td>{item.nuoc}</td>
                                                        <td>5.973</td>
                                                        <td>{parseInt(item.nuoc) * 5973 * 1000}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='mx-2 mb-3'>
                                            <p className=''>
                                                Phòng: {item.price}
                                            </p>
                                            <p className=''>
                                                Điện:  {(item.dien === '') ? '0' : parseInt(item.dien) * 1973 * 1000} nvđ
                                            </p>
                                            <p className=''>
                                                Nước: {(item.dien === '') ? '0' : parseInt(item.nuoc) * 5937 * 1000} nvđ
                                            </p>
                                            <p className=''>
                                                Khác: {(item.dien === '') ? '0' : parseInt(item.khac) * 1000} nvđ
                                            </p>
                                            <p className=''>
                                                Tổng: {(item.dien === '') ? item.price : (parseInt(item.dien) * 1973 * 1000) + (parseInt(item.nuoc) * 5937 * 1000) + (parseInt(item.khac) * 1000)}  nvđ
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <div>
                <Foodter />
            </div>
        </div>
    )
}