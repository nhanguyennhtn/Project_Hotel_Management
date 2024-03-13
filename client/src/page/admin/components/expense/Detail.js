import { useEffect, useState } from "react"
import { apiExpensesRead } from "../../../../axios/axios"


export default function Detail() {
    const [expenses, setExxpenses] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        setExxpenses(res.expenses)
    }

    return (
        <div className="row">
            <div className="card container-md my-4">
                {expenses.map((item) => {
                    return (
                        <div className="card col-fixed">
                            <div className="col">
                                <div className="card-title col">hóa đơn</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}