import { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import InfoVehicle from "./infoVehicle";
import VehicleForm from "../components/vehicle/addInfoVehicle";


export default function CustomerRegister() {
    const [formData, setFormData] = useState({
        user: '', ma_the: '', ma_TTX: '', ngaydangky: '', ngayketthuc: '', trangthai: 'hoatdong'
    });
    const [cusRegisters, setCusRegisters] = useState([])
    const [registerVehicles, setResgisterVehicles] = useState([])
    const [infoVehicles, setInfoVehicles] = useState([])
    const [cardVehicles, setCardVehicles] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showVehicleForm, setShowVehicleForm] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showTableCreate, setShowTableCreate] = useState(false);
    const [newVehicle, setNewVehicle] = useState({
        biensoxe_TTX: '', anhxe_TTX: '', tenxe_TTX: '', ngaytao_TTX: '', trangthai: 'hoatdong'
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:3535/api/infoVehicles/read');
            setInfoVehicles(response.data.infoVehicle);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const currentDatetime = new Date();
        const formattedDatetime = `${String(currentDatetime.getDate()).padStart(2, '0')}/${String(currentDatetime.getMonth() + 1).padStart(2, '0')}/${currentDatetime.getFullYear()} ${String(currentDatetime.getHours()).padStart(2, '0')}:${String(currentDatetime.getMinutes()).padStart(2, '0')}:${String(currentDatetime.getSeconds()).padStart(2, '0')}`;

        const form = {
            ...newVehicle,
            ngaytao_TTX: formattedDatetime,
            trangthai: 'hoatdong',
        };

        const existingVehicle = infoVehicles.find(vehicle => vehicle.biensoxe_TTX === newVehicle.biensoxe_TTX);
        if (existingVehicle) {
            setError('Biển số xe đã tồn tại.');
            return;
        }

        try {
            await axios.post('http://localhost:3535/api/infoVehicles/create', form);
            setSuccess('Thêm thông tin xe thành công.');
            setError('');
            setShowTableCreate(false);
            setShowVehicleForm(false)
            setNewVehicle({ biensoxe_TTX: '', anhxe_TTX: '', tenxe_TTX: '', ngaytao_TTX: '', trangthai: 'hoatdong' });
            fetchVehicles();
        } catch (error) {
            console.error('Error creating vehicle:', error);
            setError('Có lỗi xảy ra khi thêm thông tin xe.');
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const resCus = await axios.get('http://localhost:3535/api/users/read')
            setCusRegisters(resCus.data.user)
            const register = await axios.get('http://localhost:3535/api/registerVehicles/read')
            setResgisterVehicles(register.data.registerVehicle)
            const response = await axios.get('http://localhost:3535/api/infoVehicles/read');
            setInfoVehicles(response.data.infoVehicle);
            const cardVehicle = await axios.get('http://localhost:3535/api/cardVehicles/read')
            setCardVehicles(cardVehicle.data.cardVehicle)

        } catch (error) {

        }
    }
    const filterUser = cusRegisters?.filter((user) => {
        return user.status === true && user.username.role != 2
    })
    const availableVehicles = registerVehicles?.map(vehicle => vehicle.ma_TTX._id);
    const availableVehiclesCard = registerVehicles?.map(vehicleCard => vehicleCard.ma_the._id);
    console.log(availableVehicles);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {


        e.preventDefault()
        const res = await axios.post('http://localhost:3535/api/registerVehicles/create', formData)
        if (res.status === 200) {
            setSuccess("Nhân viên đã được thêm thành công!");
            setNewVehicle()
            setShowAddForm(false)
            fetchData(); 
        }

    }

    return (
        <div class="row">
            <div className='admin-wrapper container-md mt-4'>
                <div className='d-flex justify-content-between'>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h4 ms-4">Danh sách khách đăng ký</h1>
                    </div>
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary mb-2" onClick={() => setShowAddForm(true)}>Đăng ký </button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th>Họ và tên</th>
                            <th>Mã thẻ</th>
                            <th>Ngày đăng ký</th>
                            <th>Số tháng gia hạn</th>
                            <th>Biển số xe</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {registerVehicles?.length > 0 ? registerVehicles?.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.user.fullname}</td>
                                <td>{item.ma_the.ma_the}</td>
                                <td>{item.ngaydangky}</td>
                                <td>{item.ngayketthuc}</td>
                                <td>{item.ma_TTX.biensoxe_TTX}</td>
                            </tr>
                        ) :
                            <tr>
                                <td colSpan='6'>Không có dữ liệu</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </div>
            {showAddForm && (
                <div className="modal" style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
                    <div className="modal-dialog modal-dialog-center">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <p className="h6 text-uppercase mt-2">Đăng ký giữ xe</p>
                                    <button type="button" className="btn-close" onClick={() => setShowAddForm(false)}></button>
                                </div>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <div className="d-flex gap-2">
                                            <div className="col">
                                                <label className="form-label">Mã thẻ</label>
                                                <select className="form-control" name="ma_the" value={formData.ma_the} onChange={handleChange} required>
                                                    <option defaultValue="">--Chọn thẻ--</option>
                                                    {cardVehicles?.filter((item) => {
                                                        return !availableVehiclesCard.includes(item._id); 
                                                    }).map((item) => (
                                                        <option key={item._id} value={item._id}>{item.ten_the}</option> 
                                                    ))}
                                                </select>
                                                {/* <input required name="ma_the" type="text" className="form-control" placeholder="chọn mã thẻ" /> */}
                                            </div>
                                            <div className="col ">
                                                <label className="form-label">Họ và tên</label>
                                                <select className="form-control" name="user" value={formData.user} onChange={handleChange} required>
                                                    <option defaultValue="">--Chọn người dùng--</option>
                                                    {filterUser?.map((item) => {
                                                        return (
                                                            <option value={item._id}>{item.fullname}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3  align-items-center p-0">
                                        <label className="form-label ms-2">Ngày đăng ký</label>
                                        <div className='d-flex gap-2 p-0 m-0'>
                                            <input type="date" className="form-control" name="ngaydangky" value={formData.ngaydangky} onChange={handleChange} required />
                                            <select className="form-control" name="ngayketthuc" value={formData.ngayketthuc} onChange={handleChange} required>
                                                <option defaultValue="">--Chọn gói tháng--</option>
                                                <option value="3">3 tháng </option>
                                                <option value="6">6 tháng</option>
                                                <option value="12">12 tháng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Thông tin xe</label>
                                        <select name="ma_TTX" className="form-control" value={formData.ma_TTX} onChange={handleChange} required>
                                            <option defaultValue="">--Chọn thông tin xe--</option>
                                            {infoVehicles?.filter((item) => {
                                                return !availableVehicles.includes(item._id)
                                            }).map((vehicle) => (
                                                <option key={vehicle._id} value={vehicle._id}>{vehicle.biensoxe_TTX}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowVehicleForm(true)}>Tạo thông tin xe</button>
                                    <button type="submit" className="btn btn-primary rounded-3 px-3">Lưu thông tin</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showVehicleForm && <VehicleForm
                onSubmit={onSubmit}
                newVehicle={newVehicle}
                setNewVehicle={setNewVehicle}
                setShowTableCreate={setShowTableCreate}
                setShowVehicleForm={setShowVehicleForm}
            />}
        </div>
    )
}