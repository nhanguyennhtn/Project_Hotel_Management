import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import FileBase64 from 'react-file-base64'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'

export default function EditForm({ currentForm, setShowEditForm, onSubmit, message, setMessage }) {
    const { register, handleSubmit, reset, setValue: setFormValue, getValues } = useForm('')  // Lấy getValues để truy xuất giá trị
    const [image, setImage] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(currentForm?.desc || value)
        setImage(currentForm?.image || '')
        setFormValue('title', currentForm?.title)  // Đặt giá trị ban đầu của các trường
        setFormValue('area', currentForm?.area)
        setFormValue('size', currentForm?.size)
        setFormValue('kind', currentForm?.kind)
        setFormValue('price', currentForm?.price)
        setFormValue('desc', currentForm?.desc)
    }, [currentForm, setFormValue])

    const handleCloseModal = () => {
        setShowEditForm(false)
        reset()
        setMessage('')
        setImage('')
        setValue('')
    }

    const handleQuillChange = (content) => {
        setValue(content)
        setFormValue('desc', content)  
    }

    const handleFormSubmit = (data) => {
        const updatedFormData = {
            ...data,
            desc: getValues('desc'),  
            image: image || currentForm.image,
        }
        onSubmit(updatedFormData)
    }

    return (
        <div className='modal' style={{ display: 'table-cell', zIndex: 1100, overflowY: 'scroll' }}>
            <div className='modal-dialog modal-dialog-center'>
                <div className='modal-content'>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>  
                        <div className='modal-header'>
                            <h5 className="modal-title">Cập nhật - {currentForm?.title}</h5>
                            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="titleCreate" className="form-label">Phòng</label>
                                <input required defaultValue={currentForm?.title} {...register('title', { required: true })} type="text" className="form-control" id="titleCreate" placeholder="Title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descCreate" className="form-label">Mô tả</label>
                                <ReactQuill theme='snow' value={value} onChange={handleQuillChange} />  {/* Cập nhật value và onChange */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="areaCreate" className="form-label">Khu vực</label>
                                <input required defaultValue={currentForm?.area} {...register('area', { required: true })} type="text" className="form-control " id="areaCreate" placeholder="Area" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sizeCreate" className="form-label">Kích thước</label>
                                <input required defaultValue={currentForm?.size} {...register('size', { required: true })} type="text" className="form-control " id="sizeCreate" placeholder="Size" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="kindCreate" className="form-label">Loại phòng</label>
                                <select required className="form-control" id="kindCreate" defaultValue={currentForm?.kind} {...register('kind', { required: true })}>
                                    <option value='Phòng đơn'>Phòng đơn</option>
                                    <option value='Phòng ghép'>Phòng ghép</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="priceCreate" className="form-label">Giá phòng</label>
                                <input required defaultValue={currentForm?.price} {...register('price', { required: true })} type="text" className="form-control" id="priceCreate" placeholder="Price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label d-block">Hình ảnh</label>
                                <FileBase64
                                    multiple={false}
                                    onDone={({ base64 }) => {
                                        setImage(base64)
                                    }}
                                />
                                <div className='img d-flex'>
                                    {image ? <img src={image} alt='ảnh phòng' style={{ maxWidth: '200px' }} /> :
                                        <img src={currentForm.image} alt='ảnh phòng' style={{ maxWidth: '200px' }} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="submit" className="btn btn-primary">Thay đổi</button>
                        </div>
                        <span>{message}</span>
                    </form>
                </div>
            </div>
        </div>
    )
}
