import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const CreateCardVehicle = () => {
    const [formData, setFormData] = useState({
        ten_the: '',
        noidung_the: '',
        trangthai_the: '',
        ngaylap_the: '',
        anhxe_TTX: ''
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [scanResult, setScanResult] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showFormQRAdd, setShowFormQRAdd] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [inputText, setInputText] = useState('');
    const [qrValue, setQrValue] = useState('');
    const [cardVehicles, setCardVehicle] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get('http://localhost:3535/api/cardVehicles/read');
        setCardVehicle(res.data.cardVehicle);
    };

    const handleChangeQRCode = (e) => {
        setInputText(e.target.value);
    };

    const generateQRCode = () => {
        const isDuplicate = cardVehicles.some(item => item.ma_the === inputText); // Check based on content

        if (isDuplicate) {
            setIsError(true);
            setMessage('Nội dung QR đã tồn tại trong danh sách.');
            return;
        }

        setQrValue(inputText);
        setMessage('Đã tạo mã QR thành công.');
        setIsError(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({ ...prevData, anhQR_the: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        // Validate required fields
        if (!formData.ten_the || !formData.noidung_the) {
            setIsError(true);
            setMessage('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const uniqueId = `${formData.ten_the}-${Date.now()}`;

        const cardData = {
            ...formData,
            ma_the: qrValue,
            status: 'Hoạt động',
        };

        try {
            // Send the card data to your API
            await axios.post('http://localhost:3535/api/cardVehicles/create', cardData);
            alert('Thêm thẻ xe thành công!');
            setFormData({
                ten_the: '',
                ma_the: '',
                noidung_the: '',
                trangthai_the: '',
                ngaylap_the: '',
                anhQR_the: ''
            });
            setScanResult('');
            setImagePreview('')
            setQrValue('');
            setMessage('');
            fetchData()
            setShowAddForm(false);
        } catch (error) {
            console.error('Error creating CardVehicle:', error);
            setError('There was an error creating the CardVehicle.');
        }
    };

    const downloadQRCode = () => {
        const canvas = document.getElementById('qr-code');
        if (canvas) {
            const pngUrl = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `${inputText}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            setMessage('Đã tải xuống mã QR.');
            setShowFormQRAdd(false); // Close QR form after downloading
        }
    };

    const setBan = async (item) => {
        if (window.confirm(`Bạn muốn bảo trì thẻ ${item.ten_the}?`)) {
            const ma_the = item._id
            await axios.put(`http://localhost:3535/api/cardVehicles/update/${ma_the}`, { trangthai_the: 'Bảo trì' })
        }
        fetchData()
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };
    const filteredVehicles = cardVehicles
        .filter((item) => item.ten_the.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => sortOrder === 'asc' ? a.ten_the.localeCompare(b.ten_the) : b.ten_the.localeCompare(a.ten_the));

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const displayedVehicles = filteredVehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageNumbers.push(
                    <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? "active p-2 btn" : "p-2 btn no-active"}>
                        {i}
                    </button>
                );
            } else if (i === 1 || i === totalPages) {
                pageNumbers.push(
                    <button className='p-2 btn' key={i} onClick={() => handlePageChange(i)}>
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pageNumbers.push(<span className='p-2' key={i}>...</span>);
            }
        }
        return pageNumbers;
    };

    return (
        <div className="row">
            <div className="admin-wrapper container-md mt-4">
                <div className='d-flex justify-content-between'>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h4 ms-4">Danh sách thẻ xe</h1>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='col-6'>
                        <button onClick={() => setShowAddForm(true)} className='btn btn-primary my-2 p-2 rounder-3'>Tạo thẻ xe</button>
                    </div>
                    <div className='col-6 d-flex gap-2'>
                        <input
                            type="text"
                            placeholder="Tìm theo tên thẻ"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control me-2 my-2 p-2 ms-auto"
                            style={{width: 250}}
                        />
                        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="btn btn-secondary my-2 p-2 rounder-3">
                            {sortOrder === 'asc' ? <i class="bi bi-sort-alpha-down-alt"></i> : <i class="bi bi-sort-alpha-down"></i>}
                        </button>
                    </div>
                </div>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên thẻ</th>
                            <th>nội dung </th>
                            <th>ảnh QR</th>
                            <th>Trạng thái</th>
                            <th>ngày lập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedVehicles?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.ten_the}</td>
                                    <td>{item.noidung_the}</td>
                                    <td >
                                        <img src={item.anhQR_the} alt='anh QR' style={{ width: 'auto', height: '20%', marginTop: '10px' }} />
                                    </td>
                                    <td>{item.trangthai_the}</td>
                                    <td>{item.ngaylap_the}</td>
                                    <td>
                                        <div className='d-flex gap-2'>
                                            <button name='chặn' className="btn btn-outline-danger border-0 p-0 fs-5" onClick={() => { setBan(item) }}>
                                                <i class="bi bi-ban"></i>
                                            </button>
                                            <button name='thông tin' className="btn btn-outline-secondary border-0 p-0 fs-5">
                                                <i class="bi bi-info-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="pagination">
                    <button className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Trang trước</button>
                    {renderPageNumbers()}
                    <button className="btn btn-primary rounder-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Trang sau</button>
                </div>
            </div>
            {showAddForm && (
                <div className='modal' style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
                    <div className='modal-dialog modal-dialog-center'>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <p className="h6 text-uppercase mt-2">Thêm thông tin xe</p>
                                <button type="button" className="btn-close" onClick={() => { setShowAddForm(false); }}></button>
                            </div>
                            <div className='modal-body'>
                                <form onSubmit={handleSubmit}>
                                    <div className='modal-body'>
                                        <div className='mb-3'>
                                            <label>Tên thẻ</label>
                                            <input
                                                type='text'
                                                name='ten_the'
                                                value={formData.ten_the}
                                                onChange={handleChange}
                                                className='form-control rounded-3'
                                                required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Nội dung</label>
                                            <input
                                                type='text'
                                                name='noidung_the'
                                                value={formData.noidung_the}
                                                onChange={handleChange}
                                                className='form-control rounded-3'
                                                required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label>Ảnh QR</label>
                                            <input
                                                type="file"
                                                className="form-control rounded-3"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <button type='button' className='btn btn-info rounded-3 p-2' onClick={() => { setShowFormQRAdd(true); setImagePreview(''); }}>Tạo QR mới</button>
                                            <button type='submit' className='btn btn-primary rounded-3 p-2'>Lưu thông tin</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showFormQRAdd && (
                <div className='modal' style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
                    <div className='modal-dialog modal-dialog-center'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <p className="h6 text-uppercase mt-2">Thêm mã QR mới</p>
                                <button type="button" className="btn-close" onClick={() => { setShowFormQRAdd(false); }}></button>
                            </div>
                            <div className='modal-body'>
                                <div className='card' style={{ width: '100%' }}>
                                    <div className='card'>
                                        <div className='row'>
                                            <div className='d-flex m-2 w-100'>
                                                <input
                                                    className='p-2 col-9 me-2 input'
                                                    type="text"
                                                    value={inputText}
                                                    onChange={handleChangeQRCode}
                                                    placeholder="Nhập nội dung"
                                                />
                                                <button className='btn btn-outline-secondary' onClick={generateQRCode}>Tạo QR</button>
                                            </div>
                                        </div>
                                        {qrValue && (
                                            <div>
                                                <h2>Mã QR của bạn:</h2>
                                                {message && (
                                                    <div className={`alert ${isError ? 'alert-danger' : 'alert-success'}`} role="alert">
                                                        {message}
                                                    </div>
                                                )}
                                                <div className='row'>
                                                    <div className='d-flex justify-content-center bordered'>
                                                        <QRCodeCanvas
                                                            id='qr-code'
                                                            value={qrValue}
                                                            className='my-3'
                                                            style={{
                                                                border: '2px solid #000',
                                                                borderRadius: '8px',
                                                                padding: '2px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <button className='btn btn-primary' onClick={downloadQRCode}>Tải xuống QR</button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CreateCardVehicle;
