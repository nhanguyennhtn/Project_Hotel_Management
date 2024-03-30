
import { useEffect, useState } from 'react';
import { apiExpensesRead, apiUsersRead } from '../../../axios/axios';
import ContentMenu from '../components/ContentMenu'
import AdminHeader from '../components/Header'

export default function Statistic() {
    const account = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const [customers, setCustomers] = useState([])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        setCustomers(res.user)

    }

    const total = customers.map((item) => {
        return {
            price: item.price
        }
    })

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
                        <div className='card container-md'>
                            <div className='row p-4'>
                                {/* <div className='col-5 m-3 mb-3 fw-bold'>
                                    <p>Đơn vị: ................<br />
                                        Địa chỉ: ................</p>
                                </div>
                                <div className='col-6 m-4 mb-3 text-center fw-bold'>
                                    <p>Mẫu số ....<br />
                                        (Ban hành theo Thông tư số 200/2014/TT-BTC <br />
                                        Ngày 22/12/2014 của ộ tài chính)</p>
                                </div> */}
                                <div className='col-12 my-2'>
                                    <h5 className='text-center'>BẢNG TỔNG HỢP DOANH THU TIỀN THUÊ PHÒNG CỦA NHÀ TRỌ</h5>
                                </div>
                                <div className='col-12 my-2 '>
                                    <p><b>- Thời điểm kiểm kê</b>: {ngay}
                                        <br />
                                        <b>- Họ và tên</b>: Nguyễn Hoàng Sang
                                        <br />
                                        <b>- Chức vụ</b>: Kế toán
                                    </p>
                                </div>
                                <table class="table table-bordered container-md my-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Phòng</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Tên</th>
                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">CMND</th>
                                            {/* <th scope="col">Verification</th> */}
                                            <th scope="col">Ngày</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers?.length > 0 && customers.map((item, index) => <tr>
                                            <th scope="row">{++index}</th>
                                            <td>{item.room.title}</td>
                                            <td>{Intl.NumberFormat('vi-VN').format(item.room.price)} vnđ</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.IDcard}</td>
                                            {/* <td><img style={{ width: 300, height: 200, objectFit: 'cover' }} src={item.minhchung} alt='' /></td> */}
                                            <td>{item.date}</td>
                                        </tr>)}
                                        <tr >
                                            <td colspan="7" className='text-end mx-4 fs-5'>Tổng doanh thu:{
                                                Intl.NumberFormat('vi-VN').format(customers.map((item) => {
                                                    return { price: item.room.price }
                                                }).reduce((a, b) => parseFloat(a) + parseFloat(b.price), 0))} vnđ </td>
                                        </tr>


                                    </tbody>
                                </table>
                                <div className='col-6 text-center'>
                                    <p className='fw-bold'>Người ghi số</p>
                                    <p>(ký ghi gõ họ tên)</p>
                                </div>
                                <div className='col-6 text-center mb-4'>
                                    <p className='fw-bold'>Ngày .... tháng .... năm .... </p>
                                    <p className='fw-bold'>Kế toán trưởng</p>
                                    <p>(ký ghi gõ họ tên)</p>
                                </div>
                                <div className='mb-4'>

                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}