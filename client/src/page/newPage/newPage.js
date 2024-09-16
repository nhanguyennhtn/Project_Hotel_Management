import { useEffect, useState } from "react"
import { apiNewsRead, apiUsersRead } from "../../axios/axios"
import { image7 } from "../../assets/img/panner"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import ReactQuill from "react-quill"
import '../../assets/scss/home/newPage.scss'

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);

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

    return (
        <div>
            <Header />
            <div className="bg-white news-wrapper">
                <div className="text-center wow fadeInUp pt-4" data-wow-delay="0.1s">
                    <h1 className="mb-5">Tin<span className="text-primary text-uppercase">nổi bật</span></h1>
                </div>
                {news?.filter((item) => item.status === true)?.map((item) => {
                    const userInfo = filterUser(item);
                    return (
                        <div key={item._id}>
                            <div className="container-xxl pb-3 mt-4">
                                <div className="container shadow card">
                                    <div className="row g-5 pt-3">
                                        <div className="col-lg-6">
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
                                        <div className="col-lg-6">
                                            <h6 className="section-title text-start text-primary text-uppercase">từ {item.date}</h6>
                                            <div className="d-flex">
                                                <img src={image7} className="img rounded-0 rounded-circle avatar" alt="avatar" />
                                                <p className="h5 mx-2 mt-2 text-uppercase">{userInfo?.username}</p>
                                            </div>
                                            <ReactQuill value={item.desc} readOnly={true} theme="bubble" className="react_qill_css fs-4"  />
                                            <div className="row g-3 pt-3">
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
                                            <h3 className="h4 btn-secondary py-2 px-3 mt-4 rounded-3">Liên Hệ: {userInfo?.phone}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}

// export default function NewsPage() {
//     return (
//         <div className="">
//             <Header />
//             <div className="bg-white news-wrapper">
//                 <div className="text-center wow fadeInUp pt-4">
//                     <h1 class="mb-5 mt-2">Tin<span class="text-primary text-uppercase">ghép phòng</span></h1>
//                 </div>
//                 <div className="contener-xxl">

//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }