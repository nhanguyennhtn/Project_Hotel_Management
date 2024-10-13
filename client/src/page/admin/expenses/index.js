import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiExpensesRead, apiContractsRead, apiExpensesDelete, apiExpensesUpdate, apiCostOfElectsRead } from '../../../axios/axios'
import ContentMenu from '../components/ContentMenu'
import '../../../assets/scss/admin/Admin.scss'
import 'react-quill/dist/quill.snow.css'

export default function Admin() {
    const [expenses, setExpenses] = useState([])
    const [contractvalue, setContracts] = useState([])
    const [costOfElects, setCostOfElects] = useState([])
    const [valueIn, setValueIn] = useState('')
    const [valueOut, setValueOut] = useState('')
    const [showInfoForm, setShowInfoForm] = useState(false)
    const [currentForm, setCurrentForm] = useState(null)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiExpensesRead()
        const contract = await apiContractsRead()
        const costOfElect = await apiCostOfElectsRead()
        setCostOfElects(costOfElect.costOfElect)
        setContracts(contract.contracts)
        setExpenses(res.expenses)
    }
    const costOfElect = costOfElects.filter((item) => item.destroy === 'tồn tại')
    const expensed = expenses?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const currentDate = new Date();
        return itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() <= currentDate.getFullYear();
    });
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
    const createExpenses = contractvalue?.filter((item) => {
        return item.room.title === valueIn && item.user?.fullname === valueOut
    })
    const formatOther = (value) => {
        const paserValue = parseFloat(value)
        if (paserValue <= 0) {
            return '0'
        }
        return paserValue
    }

    const Total = (item) => {
        const electricValue = Intl.NumberFormat('vi-VN').format(item.electricEnd - item.electricStart)
        const waterValue = Intl.NumberFormat('vi-VN').format(item.WaterEnd - item.WaterStart)
        const otherValue = Intl.NumberFormat('vi-VN', {minimumFractionDigits: 3, maximumFractionDigits: 3}).format(formatOther(item.Other))
        const resultValue = Intl.NumberFormat('vi-VN', {minimumFractionDigits: 3, maximumFractionDigits: 3}).format(electricValue * costOfElect[0].costOfElectricity + waterValue * costOfElect[0].costOfWater + parseFloat(otherValue))
        return {
            electric: electricValue,
            water: waterValue,
            other: otherValue,
            result: resultValue
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
                            <h1 class="h4 ms-4">Điện nước phòng</h1>
                            <div className='btn-toolbar mb-2 mx-4 '>
                                <div class="btn-group me-2 gap-2 ">
                                    <Link to={'/admin/costOfElects'} class="btn btn-sm btn-outline-secondary">Bảng giá </Link>
                                    <Link to={'/admin/expense/export'} class="btn btn-sm btn-outline-secondary"><i class="bi bi-reply-all-fill"></i> Export  </Link>

                                </div>
                            </div>
                        </div>
                        <div className='container-xxl p-2 rounded-2'>
                            <div classname='row justify-content-center gap-2'>
                                <select value={valueIn} onChange={(e) => setValueIn(e.target.value)} className="col-md-4 p-2 rounded-3 bd-highlight">
                                    <option value=''>Tên phòng</option>
                                    {contractvalue
                                        .filter((item) => {
                                            const roomInExpenses = expensed.some(expense => expense.room._id === item.room._id);
                                            return item.status === true && !roomInExpenses;
                                        })
                                        .map((item) => (
                                            <option key={item._id} value={item.room.title}>{item.room.title}</option>
                                        ))
                                    }
                                </select>
                                <select value={valueOut} onChange={(e) => setValueOut(e.target.value)} class="col-md-4 p-2 ms-2 rounded-3 bd-highlight">
                                    <option selected value=''>Họ tên</option>
                                    {contractvalue.filter((item) => {
                                        return item.status === true && item.room?.title === valueIn
                                    })?.map((item) => {
                                        return <option value={item.user?.fullname}>{item.user?.fullname}</option>
                                    })}
                                </select>
                                {createExpenses?.map((item) => {
                                    return (
                                        <Link to={'/admin/expense/create'} state={item} className='col-1 btn btn-warning  ms-2 rounded-3'>Tạo</Link>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='admin-wrapper mt-4 ' >
                            <div className='row'>
                                <div className='container-md'>
                                    <table className='table table-bordered mt-2 shadow'>
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
                                                expenses?.filter((item) => {
                                                    if (valueIn === '') {
                                                        return { ...item }
                                                    } else if (item.room.title === valueIn && valueOut === '') {
                                                        return item.room.title === valueIn
                                                    }
                                                    return item.room.title === valueIn && item.user.fullname === valueOut
                                                }).map((item, index) => {
                                                    return (
                                                        <tr key={item._id}>
                                                            <td>{++index}</td>
                                                            <td>{item.room.title}</td>
                                                            <td>{item?.user?.fullname}</td>
                                                            <td>
                                                                <div className='row'>
                                                                    <span className='col text-center'>{Total(item).electric}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='row'>
                                                                    <span className='col text-center'>{Total(item).water}</span>
                                                                </div>
                                                            </td>
                                                            <td>{Total(item).other}</td>
                                                            <td>{Total(item).result} VNĐ</td>
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
                                                                <button className="btn btn-outline-warning border-0" onClick={() => { setShowInfoForm(true); setCurrentForm(item) }}><i class="bi bi-info-circle text-warning "></i></button>
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
                            </div>
                        </div>
                        {
                            showInfoForm && (
                                <div className='modal' style={{ display: 'block', zIndex: 1000 }}>
                                    <div className='modal-dialog modal-dialog-centered container-fluid'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h5 className="modal-title">Chi tiết - {currentForm.room.title}</h5>
                                                <button type="button" className="btn-close" onClick={() => { setShowInfoForm(false); setError(''); setSuccess(''); }}></button>
                                            </div>
                                            <div className='modal-body'>
                                                {error && <div className="alert alert-danger">{error}</div>}
                                                {success && <div className="alert alert-success">{success}</div>}
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p><strong>Họ và tên: </strong> {currentForm.user.fullname}</p>
                                                        <p><strong>Ngày: </strong> {currentForm.date}</p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p><strong>Loại </strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p><strong>SL</strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p><strong>T.tiền</strong></p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p><strong>Điện: </strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>{Total(currentForm).electric}</p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>
                                                            {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
                                                                (parseFloat(currentForm.electricEnd) - parseFloat(currentForm.electricStart)) * parseFloat(costOfElect[0].costOfElectricity)
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='row border-bottom mb-2'>
                                                    <div className='col'>
                                                        <p><strong>Nước:</strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>{Total(currentForm).water}</p>
                                                    </div>
                                                    <div className='col '>
                                                        <p>
                                                            {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
                                                                (parseFloat(currentForm.WaterEnd) - parseFloat(currentForm.WaterStart)) * parseFloat(costOfElect[0].costOfWater)
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='row border-bottom mb-2'>
                                                    <div className='col'>
                                                        <p><strong>Khác: </strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>{currentForm.desc}</p>
                                                    </div>
                                                    <div className='col '>
                                                        <p>
                                                            {Total(currentForm).other}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <p><strong>Tổng tiền: </strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>{ }</p>
                                                    </div>
                                                    <div className='col '>
                                                        <p>
                                                            {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
                                                                ((parseFloat(currentForm.WaterEnd) - parseFloat(currentForm.WaterStart)) * parseFloat(costOfElect[0].costOfWater) +
                                                                    (parseFloat(currentForm.electricEnd) - parseFloat(currentForm.electricStart)) * parseFloat(costOfElect[0].costOfElectricity)
                                                                )
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='row border-top '>
                                                    <div className='col text-uppercase'>
                                                        <p><strong>Thanh toán: </strong></p>
                                                    </div>
                                                    <div className='col'>
                                                        <p>{ }</p>
                                                    </div>
                                                    <div className='col '>
                                                        <p>
                                                            {currentForm.status ? Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(
                                                                ((parseFloat(currentForm.WaterEnd) - parseFloat(currentForm.WaterStart)) * parseFloat(costOfElect[0].costOfWater) +
                                                                    (parseFloat(currentForm.electricEnd) - parseFloat(currentForm.electricStart)) * parseFloat(costOfElect[0].costOfElectricity) +
                                                                    parseFloat(currentForm.Other)
                                                                )
                                                            ) : 0}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </main>
                </div>
            </div>
        </div>
    )
}
