import { useEffect, useState } from "react"
import { apiNewsRead, apiUsersRead } from "../axios/axios"
import { image7 } from "../assets/img/panner"
import ReactQuill from "react-quill"
import '../assets/scss/home/newPage.scss'
import DateDifference from "./DateDifference"

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowform] = useState(false)
    const [data, setData] = useState({})
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await apiNewsRead();
        const result = await apiUsersRead();
        setNews(res.newPages);
        setUsers(result.user);
    };

    const filterUser = (item) => {
        const user = users?.find((user) => user._id === item?.user._id);
        if (user) {
            return {
                username: user.username.username,
                title: user.room.title,
                kind: user.room.kind,
                address: user.room.address,
                area: user.room.area,
                size: user.room.size,
                phone: user.phone,
                user: user
            };
        }
        return null;
    };

    const handleClick = (data) => {
        setShowform(true)
        setUserInfo(data)
    }
    const handleCloseForm = () => {
        setShowform(false)
    }
    console.log(userInfo);

    return (
        <div>
            <div className=" bg-white">
                <div class="text-center wow fadeInUp " data-wow-delay="0.1s">
                    <h1 class="mb-5">Tìm kiếm  <span class="text-primary text-uppercase">Ghép phòng</span></h1>
                </div>

                <div className="container-xxl">
                    <div className="container">
                        <div className="row d-flex">
                            {news?.filter((item) => item.status === true)?.map((item) => {
                                const userInfo = filterUser(item);
                                return (
                                    <div key={item._id} className="col-6 my-3 shadow-sm">
                                        <div className="card">
                                            <div className="">
                                                <div className="row pt-3 d-flex">
                                                    <div className="col">
                                                        <div className="position-relative h-100 wow zoomIn" data-wow-delay="0.1s">
                                                            {item?.img?.map((img, index) => (
                                                                <div key={index}>
                                                                    <img
                                                                        className="position-absolute img-fluid w-100 h-100 rounded"
                                                                        src={img.preview}
                                                                        alt={`Uploaded ${index}`}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <h6 className="section-title text-start text-primary text-uppercase">từ {item.date}</h6>
                                                        <div className="d-flex">
                                                            <img src={image7} className="img rounded-0 rounded-circle avatar" alt="avatar" />
                                                            <p className="h5 mx-2 mt-2 text-uppercase">{userInfo?.username}</p>
                                                        </div>
                                                        <ReactQuill value={item.desc} readOnly={true} theme="bubble" className="react_qill_css fs-4" />
                                                        <div className="row g-3">
                                                            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                                                <i className="bi bi-house-fill text-primary me-2"></i>
                                                                <span className="fw-bold">{userInfo?.title}</span>
                                                            </div>
                                                            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
                                                                <i className="bi bi-door-open-fill text-primary me-2"></i>
                                                                <span className="fw-bold">{userInfo?.kind}</span>
                                                            </div>
                                                            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                                                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                                                <span className="fw-bold">{userInfo?.area}</span>
                                                            </div>
                                                            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                                                                <i className="bi bi-arrows text-primary me-2"></i>
                                                                <span className="fw-bold">{userInfo?.size}</span>
                                                            </div>
                                                        </div>
                                                        <button className="btn-primary py-2 px-3 mt-4 rounded-3" onClick={() => { handleClick(userInfo); setData(item) }}>Thông tin chi tiết</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className="modal" style={{ display: 'block', zIndex: 1100 }}>
                        <div className="modal-dialog modal-dialog-centered modal-xl ">
                            <div className="modal-content bg-light shadow">
                                <div className="modal-header">
                                    <div className="modal-title fs-5 ">Thông tin chi tiết</div>
                                    <button type="button" className="btn p-0" onClick={handleCloseForm}><i class="bi bi-x-square-fill text-secondary fs-4"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row d-flex gap-2">
                                        <div className='col-4 card' style={{ minHeight: '200px' }}>
                                            {data?.img?.map((img, index) => (
                                                <div key={index}>
                                                    <img src={img.preview} alt={`Uploaded ${index}`} style={{ width: '100%'  }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="col">
                                            <div className="list-item">
                                                <span>{userInfo?.title}</span>
                                                <div className="d-flex gap-2 rounder-3">
                                                    <div className='d-flex gap-2 border-1'>
                                                        <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{userInfo?.user?.room?.area}</button>
                                                        <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{userInfo?.user?.room?.kind}</button>
                                                        <button className='btn-primary py-1 px-2 mt-4 rounded-3'>{userInfo?.user?.room?.size}</button>
                                                        <button className='btn-primary shadow rounded-3 mt-4 px-2 py-1' disabled>{Intl.NumberFormat('vi-VN').format(userInfo?.user?.room?.price)} VNĐ</button>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <ReactQuill theme='bubble' value={data?.desc} style={{maxHeight: '250px', overflowY: 'scroll'}}/>
                                                </div>
                                                <div className='border-top'>
                                                    <label className='h6 text-uppercase'>Thông tin khách trọ</label>
                                                    {userInfo?.user?.status ?
                                                        <div className='d-flex'>
                                                            <div className='col'>
                                                                <p><strong>Họ và tên: </strong>{userInfo?.user?.fullname}</p>
                                                                <p><strong>Số điện thoại: </strong>{userInfo?.user?.phone}</p>
                                                                <p><strong>Bắt đầu thuê từ: </strong>{userInfo?.user?.dateStart}</p>
                                                                <p><strong>Bắt đầu thuê đến: </strong>{userInfo?.user?.dateEnd}</p>
                                                                <p className='d-flex gap-2 mb-0'><strong>Còn lại: </strong><DateDifference dateStart={userInfo?.user?.dateStart} dateEnd={userInfo?.user?.dateEnd} /></p>
                                                                <button className='btn-primary py-1 px-2 rounded-3'>Liên hệ: {userInfo?.user?.phone}</button>
                                                            </div>
                                                        </div> :
                                                        <div className="">
                                                            <span className="text-danger fs-4">Thông tin đã cũ</span>
                                                        </div>}


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}
