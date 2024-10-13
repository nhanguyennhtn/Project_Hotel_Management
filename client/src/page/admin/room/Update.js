import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FileBase64 from 'react-file-base64'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import { apiMotelsUpdate, apiMotelsRead } from '../../../axios/axios'
import ReactQuill from 'react-quill'
// import './Update.scss'

export default function Create() {
    const location = useLocation()
    const product = location.state

    const [value, setValue] = useState(product.desc)

    const { register, handleSubmit } = useForm()
    const [message, setMessage] = useState()
    const [image, setImage] = useState(product.image)


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await apiMotelsRead()
        // setMotels(res.motels)
    }
    const navigate = useNavigate()

    const onSubmit = async (data, e) => {
        if (!image) {
            setMessage('No image')
        } else {
            data.image = image
            data._id = product._id
            data.desc = value
            try {
                await apiMotelsUpdate(data)
                navigate('/admin/room')
            } catch (e) {
                setMessage('Failure')
            }
        }
    }

    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className='admin-wrapper container-md mt-4'>
                            <div className="modal fade show d-block" id="createMotal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createMotalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="createMotalLabel">Update motel</h5>
                                                <button onClick={() => navigate('/admin/room')} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="mb-3">
                                                    <label htmlFor="titleCreate" className="form-label">Title</label>
                                                    <input required defaultValue={product.title} {...register('title', { required: true })} type="text" className="form-control" id="titleCreate" placeholder="Title" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="descCreate" className="form-label">Description</label>
                                                    <ReactQuill theme="snow" value={value} onChange={setValue} style={{height: 'auto'}}/>
                                                    {/* <textarea required defaultValue={product.desc} {...register('desc', { required: true })} className="form-control" id="descCreate" rows="3" placeholder='Description'></textarea> */}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="areaCreate" className="form-label">Area</label>
                                                    <input required defaultValue={product.area} {...register('area', { required: true })} type="text" className="form-control " id="areaCreate" placeholder="Area" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="sizeCreate" className="form-label">Size</label>
                                                    <input required defaultValue={product.size} {...register('size', { required: true })} type="text" className="form-control " id="sizeCreate" placeholder="Size" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="kindCreate" className="form-label">Loại phòng</label>
                                                    <select required className="form-control" id="kindCreate " defaultValue={product.kind} {...register('kind', { required: true })}>
                                                        <option value='Phòng đơn' >Phòng đơn</option>
                                                        <option value='Phòng ghép'>Phòng ghép</option>
                                                    </select>
                                                    {/* <input required defaultValue={product.kind} {...register('kind', { required: true })} type="text" className="form-control" id="priceCreate" placeholder="Price" /> */}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="priceCreate" className="form-label">Price</label>
                                                    <input required defaultValue={product.price} {...register('price', { required: true })} type="text" className="form-control" id="priceCreate" placeholder="Price" />
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
                                                <button onClick={() => navigate('/admin/room')} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Update</button>
                                            </div>
                                            <span>{message}</span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}
