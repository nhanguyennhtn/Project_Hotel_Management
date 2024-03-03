import React, { useState, useEffect } from 'react'
import { apiBillRead } from '../../../axios/axios'
import AdminHeader from '../components/Header'

export default function ListBill() {
    const [bill, setBills] = useState([])
    const [total, setTotal] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const fetchData = async () => {
    //     const res = await apiBillRead()
    //     setBills(res.bills)

    //     const listPrice = res.bills?.map(item => {
    //         return {
    //             price: item.price.replaceAll('.', "").replaceAll('vnđ', "").trim()
    //         }
    //     })

    //     const total = listPrice.reduce((a, b) => parseInt(a) + parseInt(b.price), 0)
    //     let price = total.toString().split('').reverse()
    //     let priceEnd = ''
    //     price.map((item, index) => {
    //         if (++index % 3 === 0 && index !== price.length) {
    //             item += '.'
    //         }
    //         priceEnd += item
    //         return priceEnd
    //     })
    //     setTotal(priceEnd.split('').reverse().join('') + ' vnđ')
    //     console.log(listPrice, '.....');

    // }

    // return (<div className='container-md'>
    //     <div className='row d-flex  my-4 '>
    //         {/* <h4 className='ml-4 col-9'>Tổng doanh thu: {total}</h4> */}
    //         {/* <input className='col-3 ms-auto border rounded-2' id='search' onChange={e => setSearchTerm(e.target.value)} placeholder="Tìm kiếm theo tên..." /> */}
    //     </div>
    //     <table class="table table-bordered container-md my-4">
    //         <thead>
    //             <tr>
    //                 <th scope="col">#</th>
    //                 <th scope="col">Title</th>
    //                 <th scope="col">Price</th>
    //                 <th scope="col">Fullname</th>
    //                 <th scope="col">PhoneNumber</th>
    //                 <th scope="col">Identity Card</th>
    //                 <th scope="col">Verification</th>
    //                 <th scope="col">Date</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {bill?.length > 0 && bill.filter((item) => {
    //                 return searchTerm.toLowerCase() === '' ? item : item.fullname.toLowerCase().includes(searchTerm)
    //             }).map((item, index) => <tr>
    //                 <th scope="row">{++index}</th>
    //                 <td>{item.title}</td>
    //                 <td>{item.price}</td>
    //                 <td>{item.fullname}</td>
    //                 <td>{item.phoneNumber}</td>
    //                 <td>{item.CMT}</td>
    //                 <td><img style={{ width: 300, height: 200, objectFit: 'cover' }} src={item.minhchung} alt='' /></td>
    //                 <td>{item.ngay}</td>

    //                 {/* <td>{item.status
    //                     ? <div className='mb-3'>
    //                         <button className="btn" disabled>Đã được đặt</button>
    //                         <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy đặt phòng</button>
    //                     </div>
    //                     : <div className='mb-3'>
    //                         <button onClick={() => handleConfirm(item)} className='btn btn-outline-success'>Xác nhận</button>
    //                         <button onClick={() => handleCancel(item)} className='btn btn-outline-danger ms-3'>Hủy bỏ</button>
    //                     </div>
    //                 }</td> */}
    //             </tr>)}


    //         </tbody>
    //     </table>

    // </div>

    // )
    return (
        <div>
            <AdminHeader />
        </div>
    )
}
