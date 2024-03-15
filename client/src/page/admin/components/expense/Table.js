import { useEffect, useState } from "react"
import { apiContractsCreate, apiContractsRead, apiExpensesDelete, apiExpensesRead, apiExpensesUpdate } from "../../../../axios/axios"
import { Link } from "react-router-dom"


export default function Table() {
    const [expenses, setExpenses] = useState([])
    const [contracts, setContracts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const result = await apiContractsRead()
        setExpenses(res.expenses)
        setContracts(res.contracts)
    }

    const deleteProduct = async id => {
        if (true) {
            await apiExpensesDelete(id)
            fetchData()
        }
    }
    const submitProduct = async (item) => {
        if (window.confirm('Xác nhận thành công')) {
            await apiExpensesUpdate({ id: item._id, status: true })
            fetchData()

        }
    }


    return (<div className="container-md">

        <table className="table table-bordered mt-2 shadow">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th>Phòng</th>
                    <th>Giá điện (đồng/kWh)</th>
                    <th>Giá nước (đồng/m3)</th>
                    <th>Điện </th>
                    <th>Nước</th>
                    <th>Ngày</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {expenses.length > 0 ? expenses.map((item, index) =>
                    <tr key={item._id}>
                        <td>{++index}</td>
                        <td>{item.room.title}</td>
                        <td>{item.costOfElectricity}</td>
                        <td>{item.costOfWater}</td>
                        <td>{item.electric}</td>
                        <td>{item.Water}</td>
                        <td>{item.date}</td>
                        <td>
                            {item.status === true ?
                                <button className="btn btn-outline-secondary btn-block " disabled>Đã đóng</button>
                                :
                                <button onClick={() => submitProduct(item)} className="btn btn-outline-warning">Xác nhận</button>
                            }


                        </td>
                        <td>
                            <button className="btn btn-outline-danger" onClick={() => deleteProduct(item._id)}>Xoá</button>
                        </td>
                    </tr>
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