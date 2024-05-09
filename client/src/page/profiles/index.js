import { useEffect, useState } from "react";
import { image7 } from "../../assets/img/panner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { apiUsersRead } from "../../axios/axios";
import moment from "moment";
import '../../assets/scss/bootstrap.scss'
import '../../assets/scss/home/Home.scss'


export default function Profile() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const [customers, setCustomers] = useState([])
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiUsersRead()
        setCustomers(res.user)

    }

    const lastfiler = () => {
        const res = customers.filter((item) => {
            return item.username._id === userInfo._id
        })
        return res.pop()
    }
    const date = lastfiler()?.licenseDate
    const fomatDate = moment(date).format('DD/MM/YYYY')
    console.log(lastfiler(), 'kighiw');
    return (
        <div className="">
            <Header />
            <div className="bg-white news-wrapper">
                <div className=" card container-xxl height-info-user">
                    <div className=" row container-md height-info-user" >
                        <div className="col-3 m-0 bg-secondary">
                            <div className="mt-4 mb-2 container-md d-flex">
                                <div className="">
                                    <img src={image7} alt={image7} />
                                </div>
                                <div className="d-flex-col p-0">
                                    <p className="text-white mx-2 my-auto p-0 text-uppercase">{userInfo.username}</p>
                                    <p className="text-white mx-2 p-0">{lastfiler()?.status ?
                                        <p className="fs-6">Đang hoạt động</p> : <p className="fs-6">Ngưng hoạt động</p>
                                    }</p>
                                </div>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">Họ tên: </label>
                                <p className="w-auto mb-1 px-0">{lastfiler()?.fullname}</p>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">Số điện thoại: </label>
                                <p className="w-auto mb-1 px-0">{lastfiler()?.phone}</p>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">CMT: </label>
                                <p className="w-auto mb-1 px-0">{lastfiler()?.IDcard}</p>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">Ngày cấp: </label>
                                <p className="w-auto mb-1 px-0">{fomatDate}</p>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">Nơi cấp: </label>
                                <p className="w-auto mb-1 px-0">{lastfiler()?.licenseAddress}</p>
                            </div>
                            {/* <div className="ms-auto"><button className="ms-auto btn btn-primary">Cập Nhật</button></div> */}
                        </div>
                        <div className="col px-0">
                            <div className="bg-light opacity-lg height-info-user">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="h4 text-uppercase text-center mt-4" >thông tin cá nhân</h2>
                                    </div>
                                </div>
                                <div className="row ms-4 mt-4">
                                    <div className="col-6 d-flex">
                                        <label className="w-auto">Hoạt động từ: </label>
                                        <p className="w-auto">{lastfiler()?.date}</p>
                                    </div>
                                    <div className="col d-flex">
                                        <p className="w-auto">{lastfiler()?.room.title}</p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Loại phòng: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.room.kind}
                                        </p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Hợp đồng: </label>
                                        <p className="w-auto">{lastfiler()?.contract?.status ?
                                            <p className=" ms-1 mb-1">Đang hoạt động</p> : 'Ngưng hoạt động'}
                                        </p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Thời hạn: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.contract?.cycle} tháng
                                        </p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-6 d-flex">
                                        <label className="w-auto ">Bắt đầu: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.dateStart}
                                        </p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="w-auto ">Kết thúc: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.dateEnd}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}