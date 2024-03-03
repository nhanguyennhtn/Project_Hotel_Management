import React, { useState, useEffect, useRef } from 'react'
import FileBase64 from 'react-file-base64'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AdminHeader from '../components/Header'
import { apiMotelsRead, apiMotelsDelete, apiMotelsCreate } from '../../../axios/axios'
import '../../../assets/scss/admin/Admin.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

export default function Admin() {
    const [motels, setMotels] = useState([])
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm()
    const [image, setImage] = useState()
    const [value, setValue] = useState()
    const createRef = useRef()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
    }

    const handleCreate = async (data, e) => {
        if (!image) return alert('No image')
        try {
            const res = await apiMotelsCreate({ ...data, image: image, desc: value })
            if (res.motel) {
                fetchData()
                e.target.reset()
                createRef.current.click()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const deleteProduct = async id => {
        if (window.confirm("Delete")) {
            await apiMotelsDelete(id)
            fetchData()
        }
    }

    return (
        <div>
            <AdminHeader />
            <div className='admin-wrapper container-md mt-4'>
                <button ref={createRef} className="btn btn-outline-primary mb-4" data-bs-toggle="modal" data-bs-target="#createMotal">Create</button>
                <div className="modal fade" id="createMotal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMotalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={handleSubmitCreate(handleCreate)}>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="createMotalLabel">Create motel</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="titleCreate" className="form-label">Title</label>
                                        <input required {...registerCreate('title')} type="text" className="form-control" id="titleCreate" placeholder="Title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descCreate" className="form-label">Description</label>
                                        <ReactQuill theme="snow" value={value} onChange={setValue} />
                                        {/* <textarea required {...registerCreate('desc')} className="form-control" id="descCreate" rows="3" placeholder='Description'></textarea> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="priceCreate" className="form-label">Price</label>
                                        <input required {...registerCreate('price')} type="number" className="form-control " id="priceCreate" placeholder="Price" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="areaCreate" className="form-label">Area</label>
                                        <input required {...registerCreate('area')} type="text" className="form-control " id="areaCreate" placeholder="Area" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="sizeCreate" className="form-label">Size</label>
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
                                        <label htmlFor="image" className="form-label d-block">Image</label>
                                        <FileBase64
                                            multiple={false}
                                            onDone={({ base64 }) => {
                                                setImage(base64)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Tittle</th>
                            <th>Desc</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motels.length > 0 ? motels.map((item, index) =>
                            <tr key={item._id}>
                                <td>{++index}</td>
                                <td>{item.title}</td>
                                {/* <td ><p className="card-text home-card-desc">{item.desc}</p></td> */}
                                <td ><ReactQuill theme="bubble" value={item.desc} readOnly={true} /></td>
                                <td>{Intl.NumberFormat('vi-VN').format(item.price)} vnđ</td>
                                <td>
                                    <img src={item.image} alt='' />
                                </td>
                                <td>
                                    <Link to='/admin/update' state={item} className="btn btn-outline-warning">Chỉnh sửa</Link>
                                </td>
                                <td>
                                    <button className="btn btn-outline-danger" onClick={() => deleteProduct(item._id)}>Xoá</button>
                                </td>
                            </tr>
                        ) :
                            <tr>
                                <td colSpan='6'>Không có dữ liệu</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
