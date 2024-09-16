import { useEffect, useState } from "react"
import { apiNewsRead, apiUsersRead } from "../axios/axios"
import { image7 } from "../assets/img/panner"
import ReactQuill from "react-quill"
import '../assets/scss/home/newPage.scss'

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    const [showForm, setShowform] = useState(false)

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
        const user = users.find((user) => user._id === item?.user._id);
        if (user) {
            return {
                username: user.username.username,
                title: user.room.title,
                kind: user.room.kind,
                address: user.room.address,
                area: user.room.area,
                size: user.room.size,
                phone: user.phone,
            };
        }
        return null;
    };

    const handleClick = () => {
        setShowform(true)
    }
    const handleCloseForm = () => {
        setShowform(false)
    }

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
                                                        <button className="btn-primary py-2 px-3 mt-4 rounded-3" onClick={(item) => handleClick(item)}>Thông tin chi tiết</button>
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
                    <div className="modal" style={{ display: 'block', zIndex: 100 }}>
                        <div className="modal-dialog modal-dialog-centered modal-xl ">
                            <div className="modal-content bg-light shadow">
                                <div className="modal-header">
                                    <div className="modal-title fs-5 ">Thêm thông chi tiết</div>
                                    <button type="button" className="btn p-0" onClick={handleCloseForm}><i class="bi bi-x-square-fill text-secondary fs-4"></i></button>
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
