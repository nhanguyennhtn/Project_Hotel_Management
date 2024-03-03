import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiMotelsRead } from '../axios/axios'
import '../assets/scss/home/RoomPage.scss'
import ReactQuill from 'react-quill'
export default function Rooms() {
    const [motels, setMotels] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiMotelsRead()
        setMotels(res.motels)
    }

    const renderButton = (item) => {
        if (item.status === null || item.status === undefined) {
            return <p className='text-end'>
                <Link to={`/room/${item._id}`} state={item} className="btn btn-outline-primary" >Xem ngay</Link>
            </p>
        } else if (item.status === true) {
            return <p className='text-end'>
                <button className="btn" disabled>Đã được đặt</button>
            </p>
        } else if (item.status === false) {
            return <p className='text-end'>
                <button className="btn" disabled>Chờ phản hồi</button>
            </p>
        }
    }

    const test = motels.reduce((list, motel) => list.includes(motel.price) ? list : [...list, motel.price], [])
    const kind = motels.reduce((list, motel) => list.includes(motel.kind) ? list : [...list, motel.kind], [])
    return <div className='row'>
        <div className='row '>
            {/* <div className='card col-auto mb-2'>
                <select onChange={(e) => setSearch(e.target.value)} className='btn border-success'>
                    <option value=''>--- Loại phòng ---</option>
                    {kind.map((item) => {
                        return <option value={item}>{item}</option>
                    })}
                </select>

            </div>
            <div className='card mx-2 col-2 mb-2 '>
                <label>Lọc theo giá</label>
                <select onChange={(e) => setSearch(e.target.value)} className='btn border-success'>
                    <option value=''>--- Giá tiền ---</option>
                    {test.map((item) => {
                        return <option value={item}>Giá {item}</option>
                    })}
                </select>
            </div> */}
        </div>
        {motels.length > 0 && motels.filter((item) => {
            return search.toLowerCase() === '' ? item : item.price.toLowerCase().includes(search)
        }).map((item) => {
            return <div key={item._id} className="card shadow-sm col-6" id='height'>
                <div className="row">
                    <div className="col-md-4">
                        <img src={item.image} className="img rounded-start " alt='' />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text home-card-desc">
                                <ReactQuill value={item.desc} readOnly={true} theme="bubble" />
                            </p>
                            <p className="card-text fs-5 fw-bolder "><small className="text-success">Giá: {item.price}/tháng</small></p>
                            {renderButton(item)}
                        </div>
                    </div>
                </div>
            </div>
        })}
    </div>
}