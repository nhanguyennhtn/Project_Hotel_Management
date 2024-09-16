import { useEffect, useState } from "react"
import { apiCostOfElectsRead, apiExpensesDelete, apiExpensesRead, apiExpensesUpdate } from "../../../../axios/axios"

export default function Table() {
    const [expenses, setExpenses] = useState([])
    const [costOfElects, setCostOfElects] = useState([])

    useEffect(() => {
        fetchData()
    }, [])



    const costOfElect = costOfElects.filter((item) => item.destroy === 'tồn tại')

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const costOfElect = await apiCostOfElectsRead()
        setCostOfElects(costOfElect.costOfElect)
        setExpenses(res.expenses)
        console.log(res);
    }

    const deleteProduct = async id => {
        if (true) {
            await apiExpensesDelete(id)
            fetchData()
        }
    }
    const submitProduct = async (item) => {
        if (window.confirm('Xác nhận thành công')) {
            await apiExpensesUpdate({ _id: item._id, status: true })
            fetchData()

        }
    }


    return (<div className="container-md">
        <table className="table table-bordered mt-2 shadow">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th>Phòng</th>
                    <th>Họ tên</th>
                    <th>
                        <div className='row'>
                            <div className='text-center'><span>Điện (Kw/h)</span></div>
                        </div>
                    </th>
                    <th>
                        <div className='row'>
                            <div className='text-center'><span>Nước (Cm3)</span></div>
                        </div>
                    </th>
                    <th>Khác (VNĐ)</th>
                    <th>Tổng tiền</th>
                    <th>Ngày</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {expenses?.length > 0 ?
                    expenses?.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{++index}</td>
                                <td>{item.room.title}</td>
                                <td>{item?.user?.fullname}</td>
                                <td>
                                    <div className='row'>
                                        <span className='col text-center'>{Intl.NumberFormat('vi-VN').format(item.electricEnd - item.electricStart)}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className='row'>
                                        <span className='col text-center'>{Intl.NumberFormat('vi-VN').format(item.WaterEnd - item.WaterStart)}</span>
                                    </div>
                                </td>
                                <td>{item.Other <= 0 ? '0' : Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format((parseFloat(item.Other)))}</td>
                                <td>{
                                    Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(costOfElect[0]?.costOfElectricity * (item.electricEnd - item.electricStart) +
                                        costOfElect[0]?.costOfWater * (item.WaterEnd - item.WaterStart))
                                } VNĐ</td>
                                <td>{item.date}</td>
                                <td>
                                    {item.status === true ?
                                        <i class="bi bi-check2-circle text-success f-4 text-center"></i>
                                        :
                                        <button onClick={() => submitProduct(item)} className="btn btn-outline-warning">Xác nhận</button>
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger border-0" onClick={() => deleteProduct(item._id)}><i class="bi bi-trash3-fill text-danger "></i></button>
                                </td>
                            </tr>
                        )
                    }
                    ) :
                    <tr>
                        <td colSpan='7'>Không có dữ liệu</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
    )
} 