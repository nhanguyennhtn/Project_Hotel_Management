import { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { apiStaffsUpdate, apiUsersRead } from "../../../axios/axios";


export default function ListStaff() {
    const [staffs, setStaffs] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDetailForm, setShowDetailForm] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { register, handleSubmit, reset } = useForm()
    const [editStaff, setEditStaff] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [newCost, setNewCost] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const resStaff = await apiUsersRead()
        const userfilter = resStaff.user
        const filtered = userfilter.filter(user => {
            return user.username.role === 2
        })
        setStaffs(filtered)
    }
    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);

    const onSubmit = async (data) => {
        // Kiểm tra trùng lặp username, phone, IDcard
        const duplicateUsername = staffs.find(staff => staff.username === data.username);
        const duplicatePhone = staffs.find(staff => staff.phone === data.phone);
        const duplicateIDcard = staffs.find(staff => staff.IDcard === data.IDcard);

        if (duplicateUsername) {
            setError("Tên đăng nhập đã tồn tại!");
            return;
        }

        if (duplicatePhone) {
            setError("Số điện thoại đã tồn tại!");
            return;
        }

        if (duplicateIDcard) {
            setError("Chứng minh thư đã tồn tại!");
            return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^((\+84)|0)[1-9]{1}[0-9]{8}$/; // Regex cho số điện thoại Việt Nam
        if (!phoneRegex.test(data.phone)) {
            setError("Số điện thoại không hợp lệ!");
            return;
        }

        const form = {
            ...data,
            role: 2,
            fullname: data.name,
            status: true
        };

        try {
            const response = await axios.post('http://localhost:3535/api/admin/addStaff', form);
            if (response.status === 200) {
                alert("Nhân viên đã được thêm thành công!");
                reset();
                fetchData(); // Cập nhật lại danh sách nhân viên
            }
        } catch (error) {
            alert("Lỗi xảy ra trong khi thêm nhân viên");
            console.error(error);
        }
    };


    const onDelete = async (staffId) => {
        try {
            if (window.confirm('Bạn sẽ xóa nhân viên này?')) {
                await axios.patch(`http://localhost:3535/api/admin/user/update/${staffId}`, { status: false });
                setSuccess("Nhân viên đã bị xóa.");
                fetchData();
                return;
            }
        } catch (error) {
            console.error("Lỗi khi xóa nhân viên", error);
        }
    };


    const onEdit = (staff) => {
        setEditStaff({
            ...staff,
            username: staff.username.username,  // Nếu username là đối tượng, lấy đúng giá trị
            password: ''  // Đặt mật khẩu trống, để người dùng có thể thay đổi hoặc giữ nguyên
        });
        setShowEditForm(true);
    };
    const onView = (staff) => {
        setSelectedStaff(staff);
        setShowDetailForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditStaff(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra trùng lặp username, phone, IDcard
        const duplicateUsername = staffs.find(staff => staff.username === editStaff.username);
        const duplicatePhone = staffs.find(staff => staff.phone === editStaff.phone);
        const duplicateIDcard = staffs.find(staff => staff.IDcard === editStaff.IDcard);

        if (duplicateUsername && duplicateUsername._id !== editStaff._id) {
            setError("Tên đăng nhập đã tồn tại!");
            return;
        }

        if (duplicatePhone && duplicatePhone._id !== editStaff._id) {
            setError("Số điện thoại đã tồn tại!");
            return;
        }

        if (duplicateIDcard && duplicateIDcard._id !== editStaff._id) {
            setError("Chứng minh thư đã tồn tại!");
            return;
        }

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^((\+84)|0)[1-9]{1}[0-9]{8}$/;
        if (!phoneRegex.test(editStaff.phone)) {
            setError("Số điện thoại không hợp lệ!");
            return;
        }
        console.log(editStaff._id);


        try {
            const res = await axios.put(`http://localhost:3535/api/admin/updateStaff/${editStaff._id}`, editStaff);
            if (res.status === 200) {
                setSuccess('Nhân viên đã được cập nhật thành công!');
                setEditStaff(null);
                setShowEditForm(false);
                await fetchData(); // Cập nhật lại danh sách sau khi chỉnh sửa thành công
            }
        } catch (error) {
            setError('Có lỗi xảy ra trong quá trình cập nhật thông tin');
            console.error('Error during staff update:', error);
        }
    };

    console.log(editStaff);

    return (
        <div class="row">
            <div className='admin-wrapper container-md mt-4'>
                <div className='d-flex justify-content-between'>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h4 ms-4">Danh sách Nhân viên</h1>
                    </div>
                </div>
                {success && <div className="alert alert-success">{success}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <button className="btn btn-primary mb-2" onClick={() => setShowAddForm(true)}>Thêm Nhân viên</button>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Chứng minh thư</th>
                            <th scope="col">Ngày cấp</th>
                            <th scope="col">Nơi cấp</th>
                            <th scope="col">Ngày lập</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs?.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td>{++index}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.IDcard}</td>
                                    <td>{item.licenseDate}</td>
                                    <td>{item.licenseAddress}</td>
                                    <td>{item.date}</td>
                                    <td>
                                        <div className='d-flex gap-2'>
                                            <button className='btn btn-outline-warning border-0 p-0 fs-5' onClick={() => { onEdit(item); setShowEditForm(true) }}>
                                                <i class="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-outline-danger border-0 p-0 fs-5" onClick={() => onDelete(item._id)}>
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                            <button className="btn btn-outline-secondary border-0 p-0 fs-5" onClick={() => onView(item)}>
                                                <i class="bi bi-info-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
            {showAddForm && (
                <div className="modal" style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
                    <div className="modal-dialog modal-dialog-center">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="modal-header">
                                    <p className="h6 text-uppercase mt-2">Thêm thông tin nhân viên</p>
                                    <button type="button" className="btn-close" onClick={() => setShowAddForm(false)}></button>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Họ và tên</label>
                                        <input required {...register('name')} type="text" className="form-control" placeholder="Họ và tên" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex gap-2">
                                            <div className="col">
                                                <label className="form-label">Tên đăng nhập</label>
                                                <input required {...register('username')} type="text" className="form-control" placeholder="Tên đăng nhập" />
                                            </div>
                                            <div className="col ">
                                                <label className="form-label">Mật khẩu</label>
                                                <input required {...register('password')} type="password" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex gap-2">
                                            <div className="col">
                                                <label className="form-label">Số điện thoại</label>
                                                <input required {...register('phone')} type="tel" className="form-control" />
                                            </div>
                                            <div className="col ">
                                                <label className="form-label">Chứng minh thư</label>
                                                <input required {...register('IDcard')} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="d-flex gap-2">
                                            <div className="col">
                                                <label className="form-label">Ngày cấp</label>
                                                <input required {...register('licenseDate')} type="date" className="form-control" />
                                            </div>
                                            <div className="col ">
                                                <label className="form-label">Nơi cấp</label>
                                                <input required {...register('licenseAddress')} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary rounded-3 px-3">Lưu thông tin</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showEditForm && (
                <div className="modal" style={{ display: 'block', zIndex: 1100, overflowY: 'scroll' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="h6 text-uppercase mt-2">Chỉnh sửa thông tin nhân viên</p>
                                <button type="button" className="btn-close" onClick={() => setShowEditForm(false)}></button>
                            </div>
                            <div className="modal-body">
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="mb-3">
                                    <label className="form-label">Họ và tên</label>
                                    <input type="text" className="form-control" name="fullname" value={editStaff?.fullname || ''} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex gap-2">
                                        <div className="col">
                                            <label className="form-label">Tên đăng nhập</label>
                                            <input required name="username" value={editStaff.username?.username} onChange={handleInputChange} type="text" className="form-control" placeholder="Tên đăng nhập" />
                                        </div>
                                        <div className="col ">
                                            <label className="form-label">Mật khẩu</label>
                                            <input name="password" placeholder="Để trống nếu không đổi" onChange={handleInputChange} type="password" className="form-control" />

                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex gap-2">
                                        <div className="col">
                                            <label className="form-label">Số điện thoại</label>
                                            <input required name="phone" value={editStaff.phone} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                        <div className="col ">
                                            <label className="form-label">Chứng minh thư</label>
                                            <input required name="IDcard" value={editStaff.IDcard} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex gap-2">
                                        <div className="col">
                                            <label className="form-label">Ngày cấp</label>
                                            <input required name="licenseDate" value={editStaff.licenseDate} onChange={handleInputChange} type="date" className="form-control" />
                                        </div>
                                        <div className="col ">
                                            <label className="form-label">Nơi cấp</label>
                                            <input required name="licenseAddress" value={editStaff.licenseAddress} onChange={handleInputChange} type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary p-2 rounder-3" onClick={handleFormSubmit}>Lưu thay đổi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showDetailForm && (
                <div className="modal" style={{ display: 'block', zIndex: 1100 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="h6 text-uppercase mt-2">Thông tin chi tiết nhân viên</p>
                                <button type="button" className="btn-close" onClick={() => setShowDetailForm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <p><strong>Họ và tên:</strong> {selectedStaff?.fullname}</p>
                                </div>
                                <div className="mb-3">
                                    <p><strong>Số điện thoại:</strong> {selectedStaff?.phone}</p>
                                </div>
                                <div className="mb-3">
                                    <p><strong>Chứng minh thư:</strong> {selectedStaff?.IDcard}</p>
                                </div>
                                <div className="mb-3">
                                    <p><strong>Ngày cấp:</strong> {selectedStaff?.licenseDate}</p>
                                </div>
                                <div className="mb-3">
                                    <p><strong>Nơi cấp:</strong> {selectedStaff?.licenseAddress}</p>
                                </div>
                                <div className="mb-3">
                                    <p><strong>Ngày lập:</strong> {selectedStaff?.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}