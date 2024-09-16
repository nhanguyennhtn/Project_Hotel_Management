import { useEffect, useState } from "react";
import { image7 } from "../../assets/img/panner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { apiUsersCreate, apiUsersRead, apiUsersUpdate } from "../../axios/axios";
import moment from "moment";
import '../../assets/scss/bootstrap.scss'
import '../../assets/scss/home/Home.scss'

export default function Profile() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to show/hide the form
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [formData, setFormData] = useState({});
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    useEffect(() => {
        fetchData();
    }, [])
    console.log(userInfo);
    

    const fetchData = async () => {
        const res = await apiUsersRead();
        setCustomers(res.user);
    }

    const lastfiler = () => {
        const res = customers?.filter((item) => item.username._id === userInfo._id);
        return res.pop()
    };

    const date = lastfiler()?.licenseDate;
    const formattedDate = moment(date).format('DD/MM/YYYY');
    const isoDate = moment(date).format('YYYY-MM-DD');

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleAddUser = () => {
        setShowForm(true);
        setFormData({
            fullname: lastfiler()?.fullname || '',
            phone: lastfiler()?.phone || '',
            IDcard: lastfiler()?.IDcard || '',
            licenseDate: isoDate || '',
            licenseAddress: lastfiler()?.licenseAddress || ''
        });
    }

    const handleCloseForm = () => {
        setShowForm(false)
        setErrorMessage('')
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const customer = customers.filter((item) => item.username._id === userInfo._id);            
            if (customer.length > 0) {
                await apiUsersUpdate({...formData, _id: customer[0]._id})
            } else {
                const res = await apiUsersCreate({
                    ...formData,
                    username: userInfo._id,
                    status: null
                });
            }
            setShowForm(false);
            fetchData();
            
        } catch (error) {
            setErrorMessage('Lỗi khi cập nhật, vui lòng thử lại');
        }
    }

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
                                    <p className="text-white mx-2 my-auto p-0 text-uppercase">{userInfo?.username}</p>
                                    <p className="text-white mx-2 p-0">
                                        {lastfiler()?.status ? <p className="fs-6">Đã có phòng</p> : <p className="fs-6">Chưa có phòng</p>}
                                    </p>
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
                                <p className="w-auto mb-1 px-0">{formattedDate}</p>
                            </div>
                            <div className="row d-flex p-0 m-0 mb-1">
                                <label className="fw-bold  label w-auto">Nơi cấp: </label>
                                <p className="w-auto mb-1 px-0">{lastfiler()?.licenseAddress}</p>
                            </div>
                            <div className="d-flex gap-1">
                                <button className=" btn btn-outline-primary p-0" style={{ height: '50%', width: '50px' }} onClick={handleAddUser}><i className="bi bi-pencil-square text"></i></button>
                                {/* <button className="btn btn-outline-primary p-0" style={{ height: '50%', width: '50px' }}><i className="bi bi-pencil-square text"></i></button> */}
                            </div>
                        </div>
                        <div className="col px-0">
                            <div className="bg-light opacity-lg height-info-user">
                                <div className="row">
                                    <div className="col">
                                        <h2 className="h4 text-uppercase text-center mt-4">Thông tin cá nhân</h2>
                                    </div>
                                </div>
                                <div className="row ms-4 mt-4">
                                    <div className="col-6 d-flex">
                                        <label className="w-auto">Hoạt động từ: </label>
                                        <p className="w-auto">{lastfiler()?.date}</p>
                                    </div>
                                    <div className="col d-flex">
                                        <p className="w-auto">{lastfiler()?.room?.title || ''}</p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Loại phòng: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.room?.kind}</p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Hợp đồng: </label>
                                        <p className="w-auto">{lastfiler()?.contract?.status ?
                                            <p className="ms-1 mb-1">Đang hoạt động</p> : 'Ngưng hoạt động'}
                                        </p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-auto d-flex">
                                        <label className="w-auto">Thời hạn: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.contract?.cycle} tháng</p>
                                    </div>
                                </div>
                                <div className="row ms-4">
                                    <div className="col-6 d-flex">
                                        <label className="w-auto">Bắt đầu: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.dateStart}</p>
                                    </div>
                                    <div className="col d-flex">
                                        <label className="w-auto">Kết thúc: </label>
                                        <p className="w-auto ms-1">{lastfiler()?.dateEnd}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form Overlay */}
            {showForm && (
                <div className="modal " style={{ display: 'block', zIndex: 100 }}>
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content bg-light shadow">
                            <div className="modal-header">
                                <div className="modal-title fs-5 ">Thêm thông tin</div>
                                <button type="button" className="btn p-0" onClick={handleCloseForm}><i class="bi bi-x-square-fill text-secondary fs-4"></i></button>
                            </div>
                            <div className="modal-body">
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="fullname" className="form-label">Họ tên</label>
                                        <input type="text" className="form-control" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                        <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex gap-2 ">
                                            <div className="d-flex flex-column col">
                                                <label htmlFor="IDcard" className="form-label">Chứng minh thư</label>
                                                <input type="text" className="form-control" id="IDcard" name="IDcard" value={formData.IDcard} onChange={handleChange} required />
                                            </div>
                                            <div className="d-flex flex-column col">
                                                <label htmlFor="licenseDate" className="form-label">Ngày cấp</label>
                                                <input type="date" className="form-control" id="licenseDate" name="licenseDate" value={formData.licenseDate} onChange={handleChange} required />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="licenseAddress" className="form-label">Nơi cấp</label>
                                        <input type="text" className="form-control" id="licenseAddress" name="licenseAddress" value={formData.licenseAddress} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Cập nhật</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
