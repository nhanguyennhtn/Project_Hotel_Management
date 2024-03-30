import { useEffect, useState } from "react"
import { apiContractsRead, apiExpensesRead } from "../../../../axios/axios"
import '../../../../assets/scss/admin/Bill.scss'


export default function Detail() {
    const [expenses, setExxpenses] = useState([])
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiContractsRead()
        setExxpenses(res.expenses)
        console.log(expenses);
        setContracts(result.contracts)
    }

    const userActive = (data) => {
        try {
            return contracts?.filter((item) => {
                return item.room._id === data && item.status == true
            })?.map((item, index) => {
                console.log(item.user.fullname, index);
                return item.user.fullname
            })
        } catch (e) {
            console.log(e);
        }
    }

    const waterOut = (item) => {
        const result = parseFloat(item.costOfWater) * parseFloat(item.Water)
        return result
    }
    const electricOut = (item) => {
        const result = parseFloat(item.costOfWater) * parseFloat(item.Water)
        return result
    }
    const sumDetail = (item) => {
        const result = parseFloat(item.room.price) + parseFloat(item.electric) + (parseFloat(electricOut(item))) + (parseFloat(waterOut(item))) + parseFloat(item.Other)
        return result
    }

    return (
        <div className=" container-md my-4">
            <div className=" row ">
                <div className="col">
                    <div class="container-xxl py-5">
                        <div class="container">
                            <div class="row g-4 ">
                                {expenses.length > 0 ? expenses.map((item) => {
                                    return (
                                        <div class="col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="0.1s">
                                            <div class="room-item card rounded overflow-hidden max-heigth-listbill">
                                                <div class="px-4 mt-2">
                                                    <div class="d-flex justify-content-between mb-3">
                                                        <h5 class="mb-0">Hóa đơn</h5>
                                                        <div class="ps-2">
                                                            <small class="fa fa-star text-primary">{item.date}</small>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex mb-3">
                                                        <small class="border-end me-3 pe-1">{item.room.title}</small>
                                                        <small class="border-end me-3 pe-1" >{userActive(item.room._id)}</small>
                                                        <small class=" me-3 pe-3" >{item.status === true ? 'Đã đóng' : <div className="text-primary">Chưa đóng</div>}</small>
                                                    </div>

                                                    <table className='table table-bordered'>
                                                        <thead>
                                                            <tr>
                                                                <td>

                                                                </td>
                                                                <td className="w-50">Số sử dụng (KW/Khối)</td>
                                                                <td>Giá (KW/Khối)</td>
                                                                <td className='w-100'>Thành tiền (VNĐ)</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Điện</td>
                                                                <td>{item.costOfElectricity}</td>
                                                                <td>{item.electric}</td>
                                                                <td>{Intl.NumberFormat('vi-VN').format(electricOut(item))}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Nước</td>
                                                                <td>{item.costOfWater}</td>
                                                                <td>{item.Water}</td>
                                                                <td>{Intl.NumberFormat('vi-VN').format(waterOut(item))}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='mx-2 mb-3'>
                                                    <p className='row ms-2'>
                                                        <div className="col-3">
                                                            Phòng:
                                                        </div>
                                                        <div className="col">

                                                            {Intl.NumberFormat('vi-VN').format(item.room.price)} VNĐ/Tháng
                                                        </div>
                                                    </p>
                                                    <p className='row ms-2'>
                                                        <div className="col-3">
                                                            <label>Điện:</label>
                                                        </div>
                                                        <div className="col">
                                                            {Intl.NumberFormat('vi-VN').format(electricOut(item))} VNĐ
                                                        </div>
                                                    </p>
                                                    <p className='row ms-2'>
                                                        <div className="col-3">
                                                            <label>Nước:</label>
                                                        </div>
                                                        <div className="col">
                                                            {Intl.NumberFormat('vi-VN').format(waterOut(item))} VNĐ
                                                        </div>
                                                    </p>
                                                    <p className='row ms-2'>
                                                        <div className="col-3">
                                                            <label>Khác:</label>
                                                        </div>
                                                        <div className="col">
                                                            {Intl.NumberFormat('vi-VN').format(item.Other)} VNĐ

                                                        </div>
                                                    </p>
                                                    <p className='row ms-2'>
                                                        <div className="col-3">
                                                            <label>Tổng:</label>
                                                        </div>
                                                        <div className="col">
                                                            {Intl.NumberFormat('vi-VN').format(sumDetail(item))}  VNĐ
                                                        </div>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                    :
                                    <div> Không có dữ liệu </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}