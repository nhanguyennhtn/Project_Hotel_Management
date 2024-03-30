import { useEffect, useState } from "react"
import { apiNewsRead, apiUsersRead } from "../axios/axios"
import { image7 } from "../assets/img/panner"
import ReactQuill from "react-quill"
import '../assets/scss/home/newPage.scss'

export default function NewsPage() {
    const [news, setNews] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiNewsRead()
        const result = await apiUsersRead()
        setNews(res.newPages)
        setUsers(result.user)
        console.log(users);
        console.log(news);
    }

    const username = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.username.username
        })
    }
    const title = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.room.title
        })
    }
    const kind = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.room.kind
        })
    }
    const address = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.room.area
        })
    }
    const size = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.room.size
        })
    }
    const phone = (item) => {
        return users?.filter((user) => {
            return user._id === item.user._id
        }).map((data) => {
            return data.phone
        })
    }
    console.log(username);

    return (
        <div>
            <div className=" bg-white">
                <div class="text-center wow fadeInUp pt-4" data-wow-delay="0.1s">
                    <h6 class="section-title text-center text-primary text-uppercase">NewsPage</h6>
                    <h1 class="mb-5">Tin<span class="text-primary text-uppercase">nỗi bật</span></h1>
                </div>
                {news?.filter((item) => {
                    return item.status == true
                })?.map((item) => {
                    return (
                        <div >
                            <div class="container-xxl pb-3">
                                <div class="container shadow card">
                                    <div class="row g-5 pt-3">
                                        <div class="col-lg-6" >
                                            <div class="position-relative h-100 wow zoomIn" data-wow-delay="0.1s" >
                                                {item.img?.map((img, index) => {
                                                    return <div>
                                                        <img class="position-absolute img-fluid w-100 h-100 rounded" key={index} src={img.preview} alt={`Uploaded ${index}`} />
                                                        {/* <div class="bg-white border p-1 position-absolute bottom-0 end-0 mt-n4 me-n4"></div> */}
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <h6 class="section-title text-start text-primary text-uppercase"> từ {item.date}</h6>
                                            <div className="d-flex">
                                                <img src={image7} className='img rounded-0 rounded-circle avatar '></img>
                                                <p className='h5 mx-2 mt-2 text-uppercase '>{username(item)}</p>
                                            </div>
                                            <ReactQuill value={item.desc} readOnly={true} theme="bubble" className=" react_qill_css" />
                                            <div class="row g-3 pt-3">
                                                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                                    <i class="bi bi-house-fill text-primary me-2"></i>
                                                    <span className="fw-bold">{title(item)}</span>
                                                </div>
                                                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
                                                    <i class="bi bi-door-open-fill text-primary me-2"></i>
                                                    <span className="fw-bold">{kind(item)}</span>
                                                </div>
                                                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                                    <i class="bi bi-geo-alt-fill text-primary me-2"></i>
                                                    <span className="fw-bold">{address(item)}</span>
                                                </div>
                                                <div class="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
                                                    <i class="bi bi-arrows text-primary me-2"></i>
                                                    <span className="fw-bold">{size(item)}</span>
                                                </div>
                                            </div>
                                            <h3 class="h4 btn-secondary py-2 px-3 mt-4 rounded-3">Liên Hệ: {phone(item)}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
