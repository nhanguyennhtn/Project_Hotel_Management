import React, { useState, useEffect, useRef } from 'react'
import FileBase64 from 'react-file-base64'
import { useForm } from 'react-hook-form'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import { apiMotelsRead, apiMotelsDelete, apiMotelsCreate, apiMotelsUpdate, apiUsersCreate, apiUsersRead } from '../../../axios/axios'
import '../../../assets/scss/admin/Admin.scss'
import 'react-quill/dist/quill.bubble.css';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import EditForm from '../components/room/editForm'
import DateDifference from '../../../components/DateDifference'

export default function Admin() {
    const [filteredMotels, setFilteredMotels] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [statusFilter, setStatusFilter] = useState('')
    const { register: registerCreate, handleSubmit: handleSubmitCreate, reset: resetCreateForm } = useForm()
    const { reset } = useForm('')
    const [image, setImage] = useState()
    const [value, setValue] = useState('')
    const [message, setMessage] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [showInfoItem, setShowInfoItem] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [currentForm, setCurrentForm] = useState('')
    const [valueAddForm, setValueAddForm] = useState('')
    const [filerRoomByUser, setFilerRoomByUser] = useState()
    const createRef = useRef()

    useEffect(() => {
        fetchData();
        fetchDataUser()
    }, [statusFilter, currentPage, statusFilter])

    const fetchData = async () => {
        try {
            const res = await apiMotelsRead()
            const motels = res.motels
            const filtered = motels?.filter(motel => {
                if (statusFilter === '') return true
                if (statusFilter === 'true') return motel?.status === true
                if (statusFilter === 'false') return motel?.status === false
                return motel.status === null || motel.status === undefined
            })

            setFilteredMotels(filtered)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchDataUser = async () => {
        const result = await apiUsersRead()
        const users = result.user
        const filterUsered = users?.filter(user => {
            return user.room?._id === filerRoomByUser?._id && filerRoomByUser?.status === true && user?.status === true
        })
        setFilteredUsers(filterUsered)
    }

    const handleCreate = async (data, e) => {
        if (!image) return alert('Chưa thêm thông tin hình ảnh')
        try {
            const res = await apiMotelsCreate({ ...data, image: image, desc: value })
            if (res.motel) {
                fetchData()
                e.target.reset()
                setImage('')
                setValue('')
                resetCreateForm()
                createRef.current.click()
            }
        } catch (e) {
            console.log(e)
        }
    }
    const onSubmit = async (data, e) => {
        const form = {
            ...data,
            image: image ? image : currentForm.image,
            desc: value ? value : currentForm.desc
        }

        if (!form.image) {
            return setMessage('chưa thêm hình ảnh phòng ')
        } else {
            try {
                await apiMotelsUpdate({ _id: currentForm._id, ...form })
                setCurrentForm('')
                setShowEditForm(false)
                setMessage('')
                reset()
                setImage('')
                setValue('')
                fetchData()
            } catch (e) {
                setMessage('xảy ra lỗi trong quá trỉnh thực thi!')
            }
        }
    }

    const deleteProduct = async id => {
        if (window.confirm("Phòng sẽ bị xóa!")) {
            await apiMotelsDelete(id)
            fetchData()
        }
    }

    const handleCloseModal = () => {
        setCurrentForm('')
        setShowEditForm(false)
        setShowInfoItem(false)
        setShowAddForm(false)
        setMessage('')
        reset()
        setImage('')
        setValue('')
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredMotels.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredMotels.length / itemsPerPage)


    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className='admin-wrapper container-md mt-4'>
                            <div className='d-flex justify-content-between'>
                                <button ref={createRef} className="btn btn-outline-primary mb-4" data-bs-toggle="modal" data-bs-target="#createMotal">Thêm</button>
                                <p><select id="statusFilter" className="form-select ms-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                    <option value="">Tất cả</option>
                                    <option value="true">Đã đặt</option>
                                    <option value="false">Chờ xử lý</option>
                                    <option value="null">Trống</option>
                                </select></p>

                            </div>
                            <div className="modal fade" id="createMotal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMotalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <form onSubmit={handleSubmitCreate(handleCreate)}>
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="createMotalLabel">Thêm Phòng</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="titleCreate" className="form-label">Phòng</label>
                                                    <input required {...registerCreate('title')} type="text" className="form-control" id="titleCreate" placeholder="Title" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="descCreate" className="form-label">Mô tả</label>
                                                    <p>
                                                        <ReactQuill theme='snow' value={value} onChange={setValue} className='snowReactQill' /></p>
                                                    {/* <textarea required {...registerCreate('desc')} className="form-control" id="descCreate" rows="3" placeholder='Description'></textarea> */}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="priceCreate" className="form-label">Giá phòng</label>
                                                    <input required {...registerCreate('price')} type="number" className="form-control " id="priceCreate" placeholder="Price" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="areaCreate" className="form-label">Khu vực</label>
                                                    <input required {...registerCreate('area')} type="text" className="form-control " id="areaCreate" placeholder="Area" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="sizeCreate" className="form-label">Kích thước phòng</label>
                                                    <input required {...registerCreate('size')} type="text" className="form-control " id="sizeCreate" placeholder="Size" />
                                                </div>
                                                <div className="mb-3">
                                                    <select required {...registerCreate('kind')} class="form-select" aria-label="Default select example">
                                                        <option selected>Chọn thể loại phòng</option>
                                                        <option value="Phòng đơn">Phòng đơn</option>
                                                        <option value="Phòng ghép">Phòng ghép</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="image" className="form-label d-block">Hình ảnh</label>
                                                    <FileBase64
                                                        multiple={false}
                                                        onDone={({ base64 }) => {
                                                            setImage(base64)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}  >Hủy</button>
                                                <button type="submit" className="btn btn-primary">Thêm</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th>Phòng</th>
                                        <th>Mô tả</th>
                                        <th>Giá</th>
                                        <th>Hình ảnh</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? currentItems.map((item, index) =>
                                        <tr key={item._id}>
                                            <td>{++index}</td>
                                            <td>{item?.title}</td>
                                            {/* <td ><p className="card-text home-card-desc">{item.desc}</p></td> */}
                                            <td ><ReactQuill theme="bubble" value={item?.desc} readOnly={true} /></td>
                                            <td>{Intl.NumberFormat('vi-VN').format(item?.price)} vnđ</td>
                                            <td>
                                                <img src={item.image} alt='' />
                                            </td>
                                            <td>
                                                <div className='d-flex gap-2'>
                                                    <button className='btn btn-outline-warning border-0 p-0 m-0' onClick={() => { setShowEditForm(true); setCurrentForm(item) }}><i class="bi bi-pencil-square"></i></button>
                                                    <button className="btn btn-outline-danger border-0 p-0 m-0" onClick={() => deleteProduct(item._id)}><i class="bi bi-trash-fill "></i></button>
                                                    <button className="btn btn-outline-secondary border-0 p-0 m-0" onClick={() => { setShowInfoItem(true); setCurrentForm(item); setFilerRoomByUser(item) }}><i class="bi bi-info-circle "></i></button>
                                                </div>
                                            </td>
                                            {/* <td>
                                                {
                                                    item.status ?
                                                        <button className='btn btn-outline-secondary border-0 ' disabled><i class="bi bi-hand-index"></i></button>
                                                        :
                                                        <button className='btn btn-outline-primary border-0 ' onClick={() => { setShowAddForm(true); setValueAddForm(item) }} ><i class="bi bi-hand-index"></i></button>

                                                }
                                            </td> */}
                                        </tr>
                                    ) :
                                        <tr>
                                            <td colSpan='6'>Không có dữ liệu</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation">
                                <ul className="pagination gap-2">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Back</button>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        {showEditForm && <EditForm currentForm={currentForm} setShowEditForm={setShowEditForm} onSubmit={onSubmit} message={message} setMessage={setMessage} />}
                        {showInfoItem && (
                            <div className='modal' style={{ display: 'table-cell', zIndex: 1100, overflowY: 'scroll' }}>
                                <div className='modal-dialog modal-dialog-centered modal-xl'>
                                    <div className='modal-content'>
                                        <div className='modal-content'>
                                            <div className='modal-header'>
                                                <h5 className="modal-title" >Thông tin - {currentForm?.title}</h5>
                                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                            </div>
                                            <div className='modal-body'>
                                                <div className='row d-flex gap-2'>
                                                    <div className='col-4 card'>
                                                        <img src={currentForm?.image} alt='img' style={{ width: '100%' }} />
                                                    </div>
                                                    <div className='col'>
                                                        <div className='d-flex gap-2 border-1'>
                                                            <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{currentForm?.area}</button>
                                                            <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{currentForm?.kind}</button>
                                                            <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{currentForm?.size}</button>
                                                            <button className='btn-primary shadow rounded-3 mt-4 px-2 py-1' disabled>{Intl.NumberFormat('vi-VN').format(currentForm?.price)} VNĐ</button>
                                                        </div>
                                                        <div className=''>
                                                            <ReactQuill theme='bubble' value={currentForm?.desc} />
                                                        </div>
                                                        <div className='border-top'>
                                                            <label className='h6 text-uppercase'>Thông tin khách trọ</label>
                                                            <div className='d-flex'>
                                                                {
                                                                    filteredUsers?.map((item) => {
                                                                        return (
                                                                            <div className='col'>
                                                                                <p><strong>Họ và tên: </strong>{item?.fullname}</p>
                                                                                <p><strong>Số điện thoại: </strong>{item?.phone}</p>
                                                                                <p><strong>Bắt đầu thuê từ: </strong>{item?.dateStart}</p>
                                                                                <p><strong>Bắt đầu thuê đến: </strong>{item?.dateEnd}</p>
                                                                                <p className='d-flex gap-2'><strong>Còn lại: </strong><DateDifference dateStart={item?.dateStart} dateEnd={item?.dateEnd} /></p>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                        {/* {showAddForm && (
                            <div className='modal' style={{ display: 'table-cell', zIndex: 1100, overflowY: 'scoll' }}>
                                <div className='modal-dialog modal-dialog-centered modal-xl'>
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h5 className='modal-title'>Đăng ký phòng</h5>
                                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                        </div>
                                        acc - phòng - hợp đồng
                                        <div className='modal-body'>
                                            <div className='d-flex gap-2'>
                                                <div className='ms-2'>
                                                    <label>Tên đăng nhập</label>
                                                    <input />
                                                    <label>Mật khẩu</label>
                                                    <input />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </main>

                </div>
            </div>
        </div>
    )
}
