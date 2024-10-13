import axios from "axios";
import { useEffect, useState } from "react";
import VehicleForm from "../components/vehicle/addInfoVehicle";  // Import the new component

export default function InfoVehicle() {
    const [infoVehicles, setInfoVehicles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showTableCreate, setShowTableCreate] = useState(false)
    const [showVehicleForm, setShowVehicleForm] = useState(false)
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
            setNewVehicle({ biensoxe_TTX: '', anhxe_TTX: '', tenxe_TTX: '', ngaytao_TTX: '', trangthai: 'hoatdong' });
            fetchVehicles();
        } catch (error) {
            console.error('Error creating vehicle:', error);
            setError('Có lỗi xảy ra khi thêm thông tin xe.');
        }
    };

    return (
        <div className="row">
            <div className="admin-wrapper container-md mt-4">
                <div className='d-flex justify-content-between'>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h4 ms-4">Danh sách thông tin xe</h1>
                    </div>
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary rounder-3 my-2" onClick={() => setShowTableCreate(true)}>Thêm</button>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên xe</th>
                            <th>Biển số xe</th>
                            <th>Ảnh xe</th>
                            <th>Ngày tạo</th>
                            <th>Chủ xe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoVehicles?.length > 0 ? infoVehicles.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{item.biensoxe_TTX}</td>
                                    <td>{item.tenxe_TTX}</td>
                                    <td><img src={item.anhxe_TTX} alt="anh" /></td>
                                    <td>{item.ngaytao_TTX}</td>
                                    <td>{++index}</td>
                                </tr>
                            )
                        }) : ""}
                    </tbody>
                </table>
            </div>
            {showTableCreate && (
                <VehicleForm
                    onSubmit={onSubmit}
                    newVehicle={newVehicle}
                    setNewVehicle={setNewVehicle}
                    setShowTableCreate={setShowTableCreate}
                    setShowVehicleForm={setShowVehicleForm}
                />
            )}
        </div>
    );
}
