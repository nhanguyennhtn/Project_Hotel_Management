import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiContractsRead, apiExpensesCreate, apiExpensesRead } from '../../../axios/axios'
import ReactQuill from 'react-quill'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
function Create() {
    const motel = useLocation().state
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm()
    const [contractvalue, setContracts] = useState([])
    const [value, setValue] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiContractsRead()
        setContracts(res.contracts)

    }
    const ngay = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const date = today.toLocaleDateString("vi-VN", options)
        return date
    }
    const handleCreate = async (data, e) => {
        // e.preventDefault()   
        try {
            const res = await apiExpensesCreate({ ...data, room: motel._id, desc: value, date: ngay() })
            alert('Thành công')
            e.target.reset()
            fetchData()
            setValue()
            // navigate('/admin/expense')
        } catch (e) {
            console.log(e)
        }
    }
    const handleCancel = () => {
        navigate('/admin/expense')
    }
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='card container-md mt-2 '>
                <Link to={'/admin/expense'}><i class="btn bi bi-x-circle-fill text-dark p-3"></i></Link>
                <div className="row  ">
                    <div className="col card m-4 mt-0 shadow-lg ">
                        <form onSubmit={handleSubmitCreate(handleCreate)}>
                            <div className="modal-header-center text-center mt-3 " >
                                <h5 className="modal-title" id="createMotalLabel ">Create expense</h5>
                            </div>
                            <div className="modal-body fw-bold ">
                                <div className="mb-3">
                                    <label htmlFor="titleCreate" className="form-label mx-3 ">Giá điện</label>
                                    <input autoComplete='off' required {...registerCreate('costOfElectricity')} type="number" className="form-control" id="titleCreate" placeholder="costOfElectricity" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="costOfWater" className="form-label mx-3">Giá nước</label>
                                    <input autoComplete='off' required {...registerCreate('costOfWater')} type="number" className="form-control " id="costOfWater" placeholder="costOfWater" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="electric" className="form-label mx-3">Điện</label>
                                    <input autoComplete='off' required {...registerCreate('electric')} type="number" className="form-control " id="electric" placeholder="electric" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sizeCreate" className="form-label mx-3">Nước</label>
                                    <input autoComplete='off' required {...registerCreate('Water')} type="number" className="form-control " id="sizeCreate" placeholder="Water" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sizeCreate" className="form-label mx-3">Khác</label>
                                    <input autoComplete='off'  {...registerCreate('Other')} defaultValue='0' type="number" className="form-control " id="sizeCreate" placeholder="Số tiền" />
                                    <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='nhập nội dung' />
                                </div>
                            </div>
                            <div className="modal-footer my-2 gap-2">
                                <button onClick={() => handleCancel()} className="btn btn-secondary" >Close</button>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                    <div className='col'>
                        <div className='card mb-2 mt-3'>
                            <div className='nav p-2 bg-primary'>
                                <label className='fw-bold bg-gray'> Chi tiết</label>
                            </div>
                            <div className='dl-flex'>
                                <span className='row mx-2'>
                                    <label className='col'>Hôm nay:</label>
                                    <p className='col'>{ngay()}</p>
                                </span>
                            </div>
                            <div className=''>
                                {contractvalue?.filter((item) => {
                                    return item.room._id === motel._id && item.status === true
                                })?.map((item) => {
                                    return (
                                        <div className='row mx-2'>
                                            <div className='col'>{item.room.title}</div>
                                            <div className='col'>{item.user.status ? 'Đang hoạt động' : 'phòng trống'}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='card '>
                            <div className='w-100 fix-auto'>
                                <label className='fw-bold bg-gray bg-primary dl-flex w-100 p-2'> Hướng dẫn</label>
                                <div className='mx-2 '>
                                    <p>- Giá điện: Mức giá điện hiện tại được tính trên đơn vị đồng/kWh.</p>
                                    <p>- Giá nước: Mức giá nước hiện tại được tính trên đơn vị đồng/khối.</p>
                                    <p>- Điện: Mức điện tiêu thụ của tháng hiện tại đơn vị kWh.</p>
                                    <p>- Nước: Lượng nước tiêu thụ của tháng hiện tại  đơn vị khối.</p>
                                    <p>- Khác: Tổng các chi phí, phụ phí phát sinh (nếu có)</p>
                                    <p>- Nội dung: Tên chi tiết các chí phí, phụ phí (nếu có)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )


}

export default Create;
