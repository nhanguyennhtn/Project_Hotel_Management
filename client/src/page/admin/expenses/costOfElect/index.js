import { useEffect, useState } from "react";
import { apiCostOfElectsCreate, apiCostOfElectsRead, apiCostOfElectsUpdate } from "../../../../axios/axios";
import AdminHeader from '../../components/Header';
import ContentMenu from '../../components/ContentMenu';
import { Link } from "react-router-dom";

export default function CostOfElect() {
    const [costOfElects, setCostOfElects] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCost, setNewCost] = useState({ costOfElectricity: '', costOfWater: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchData();
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

    const fetchData = async () => {
        try {
            const res = await apiCostOfElectsRead();
            const sortedCostOfElects = res.costOfElect.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
            setCostOfElects(sortedCostOfElects);
        } catch (error) {
            setError('Đã xảy ra lỗi khi tải dữ liệu.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Mark current version as "Đã cũ"
            const currentVersion = costOfElects.find(item => item.destroy === 'tồn tại');
            if (currentVersion) {
                await apiCostOfElectsUpdate({ _id: currentVersion._id, destroy: 'Đã cũ' });
            }

            // Create new version
            const newForm = {
                costOfElectricity: parseFloat(newCost.costOfElectricity),
                costOfWater: parseFloat(newCost.costOfWater),
                create_at: new Date().toISOString(),
                destroy: 'tồn tại' // New version is active
            };
            await apiCostOfElectsCreate(newForm);
            setSuccess('Bảng giá đã được cập nhật thành công.');
            fetchData();
            setShowAddForm(false);
            setNewCost({ costOfElectricity: '', costOfWater: '' });
        } catch (error) {
            setError('Đã xảy ra lỗi trong quá trình thay đổi.');
        }
    };

    const handleDelete = async (id) => {
        try {
            // Mark the version as "Đã xóa"
            await apiCostOfElectsUpdate({ _id: id, destroy: 'đã xóa' });
            setSuccess('Phiên bản đã được xóa.');
            fetchData();
        } catch (error) {
            setError('Đã xảy ra lỗi khi xóa phiên bản.');
        }
    };
    

    return (
        <div className='wrapper'>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <ContentMenu />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h4 ms-4">Điện nước phòng</h1>
                            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Thay đổi</button>
                        </div>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="container-md row">
                            {costOfElects?.map((item) => (
                                item.destroy !== 'đã xóa' && (
                                    <div key={item._id} className="d-inline-warp card m-2" style={{ maxWidth: '20em' }}>
                                        <div className="row">
                                            <div className="col m-2">
                                                <div className="d-flex border-bottom mb-1">
                                                    <p className="h5 text-center">Bảng giá</p>
                                                    <i className="bi bi-trash3 text-primary ms-auto fs-6" onClick={() => handleDelete(item._id)}></i>
                                                </div>
                                                <p><strong>Điện: </strong> {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(parseFloat(item.costOfElectricity))} VNĐ</p>
                                                <p><strong>Nước: </strong> {Intl.NumberFormat('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(parseFloat(item.costOfWater))} VNĐ</p>
                                                <p><strong>Thời gian: </strong> {new Date(item.create_at).toLocaleDateString('vi-VN')}</p>
                                                <p><strong>Phiên bản: </strong>
                                                    <span className={item.destroy === 'tồn tại' ? "text-success" : "text-secondary"}>
                                                        {item.destroy === 'tồn tại' ? "Đang sử dụng" : "Đã cũ"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                        {showAddForm && (
                            <div className="modal" style={{ display: 'block', zIndex: 1000 }}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Cập nhật bảng giá điện/nước</h5>
                                            <button type="button" className="btn-close" onClick={() => { setShowAddForm(false); setError(''); setSuccess(''); }}></button>
                                        </div>
                                        <div className="modal-body">
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            {success && <div className="alert alert-success">{success}</div>}
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Nước (Cm3)</label>
                                                    <input type="number" className="form-control" name="costOfWater" value={newCost.costOfWater} onChange={handleInputChange} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Điện (KW/h)</label>
                                                    <input type="number" className="form-control" name="costOfElectricity" value={newCost.costOfElectricity} onChange={handleInputChange} required />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
