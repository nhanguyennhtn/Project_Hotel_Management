import React, { useState } from "react";

export default function VehicleForm({ onSubmit, newVehicle, setNewVehicle, setShowTableCreate, setShowVehicleForm }) {
    const [imagePreview, setImagePreview] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewVehicle({ ...newVehicle, anhxe_TTX: reader.result });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="modal" style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
            <div className="modal-dialog modal-dialog-center">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="modal-header">
                            <p className="h6 text-uppercase mt-2">Thêm thông tin xe</p>
                            <button type="button" className="btn-close" onClick={() => {setShowTableCreate(false); setShowVehicleForm(false)}}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Biển số xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Biển số xe"
                                    value={newVehicle.biensoxe_TTX}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, biensoxe_TTX: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên xe</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên xe"
                                    value={newVehicle.tenxe_TTX}
                                    onChange={(e) => setNewVehicle({ ...newVehicle, tenxe_TTX: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ảnh xe</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                            </div>
                            <button type="submit" className="btn btn-primary rounded-3 px-3">Lưu thông tin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
