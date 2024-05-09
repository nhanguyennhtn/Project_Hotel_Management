import { useLocation } from "react-router-dom";
import AdminHeader from "../components/Header";
import { useForm } from "react-hook-form";
import '../../../assets/scss/admin/Contract.scss'
import { apiContractsCreate, apiMotelsUpdate, apiUsersUpdate } from "../../../axios/axios";
import { useState } from "react";


export default function Contracts() {
    const registerUser = useLocation().state
    const [total, setTotal] = useState(0)
    const { register: registerCreate, handleSubmit: handleSubmitCreate } = useForm()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)

    const handleCreate = async (data, e) => {
        e.preventDefault()
        try {
            await apiContractsCreate({ ...data, user: registerUser._id, room: registerUser.room._id, status: null })
            await apiMotelsUpdate({ _id: registerUser.room._id, status: true })
            alert('Tạo hợp đồng, đang chờ xác nhận')
            window.location.href = '/admin/response'
        } catch (e) {
            console.log(e)
        }
        return 0
    }




    // const total = yeartotal *12 + monthtotal

    const dateStart = registerUser.dateStart.split(',')[1].split(' ')
    const parts1 = registerUser.dateStart.split(',')
    const month1 = parseInt(dateStart[3]);
    const year1 = parseInt(parts1[2]);

    const dateEnd = registerUser.dateEnd.split(',')[1].split(' ')
    const parts2 = registerUser.dateEnd.split(',')
    const month2 = parseInt(dateEnd[3]);
    const year2 = parseInt(parts2[2]);

    const yeartotal = parseInt(year2) - parseInt(year1)
    const monthtotal = parseInt(month2) - parseInt(month1)
    const totalT = yeartotal * 12 + monthtotal

    return (
        <div className="">
            <AdminHeader />
            <div className="contract-wrapper-admin">
                <div className='card'>
                    <form onSubmit={handleSubmitCreate(handleCreate)}>
                        <div className='card mx-auto container-md width-card mt-2' >
                            <div className='row'>
                                <div className='col-12 text-center mt-4'>
                                    <div className='fs-6'>
                                        <b>CỘNG HÒA CHỦ NGĨA VIỆT NAM <br />
                                            <p className='text-decoration-underline'>Độc lập-Tự do-Hạnh phúc</p>
                                        </b>
                                    </div>
                                    <div className='fw-bold fs-6 mb-3'>
                                        <input disabled required {...registerCreate('topic')} defaultValue={'HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ'} placeholder="Nhập tên hợp đồng" />
                                    </div>
                                </div>
                                <div className='container-body'>
                                    <div className='mt-3'>
                                        <p>Hôm nay, {ngay} , tại {registerUser.room.title}</p>
                                        <p><b>Chúng tôi gồm:</b></p>
                                    </div>
                                    <div className=' mt-2 fw-600'>
                                        <p className='info-user'>BÊN CHO THUÊ PHÒNG TRỌ (gọi tắt là Bên A):</p>
                                        <p>Ông/bà (tên chủ hợp đồng): <input {...registerCreate('host')} defaultValue={'nguyễn hoàng thanh nhã'} placeholder='Họ và tên chủ trọ' className="w-50" /></p>
                                        <p>CMND/CCCD số  <input {...registerCreate('phoneHost')} defaultValue={'08989898'} placeholder='Số điện thoại của chủ trọ' /></p>
                                        {/* <p > Thường trú tại: Cần thơ</p> */}
                                    </div>
                                    <div className=' mt-2 fw-600'>
                                        <p className='info-user'>BÊN THUÊ PHÒNG TRỌ (gọi tắt là Bên B):</p>
                                        <p>Ông/bà (tên chủ hợp đồng) <input defaultValue={registerUser.fullname} placeholder='họ và tên khách thuê' /></p>
                                        <p>CMND/CCCD số <input defaultValue={registerUser.IDcard} placeholder='Căn cước công dân của khách thuê' /> </p>
                                        {/* <p > Thường trú tại: ...............................................................................................</p> */}
                                    </div>
                                    <p className='fst-italic '>Sau khi thỏa thuận, hai bên thống nhất như sau:</p>

                                    <div className=''>
                                        <p className='info-user'>1.Nội dung phòng trọ</p>
                                        <p>Bên A cho Bên B thuê 01 phòng trọ <input defaultValue={registerUser.room.title} />
                                            Với thời hạn là: <input required {...registerCreate('cycle')} defaultValue={totalT} placeholder='Hạn thuê phòng' />
                                            tháng, giá thuê:  <input defaultValue={Intl.NumberFormat('vi-VN').format(registerUser.room.price)} />
                                            Thời gian bắt đầu:  <input defaultValue={registerUser.dateStart} />
                                            . Thời hạn đến ngày:  <input defaultValue={registerUser.dateEnd} />
                                            <br />Chưa bao gồm chi phí: điện sinh hoạt, nước.</p>
                                    </div>
                                    <div className=''>
                                        <p className='info-user'>2.Trách nhiệm Bên A</p>
                                        <p>Đảm bảo căn nhà cho thuê không có tranh chấp, khiếu kiện.</p>
                                        <p>Đăng ký với chính quyền địa phương về thủ tục cho thuê phòng trọ.</p>
                                    </div>
                                    <div className=''>
                                        <p className='info-user'>3. Trách nhiệm Bên B</p>
                                        <p>Đặt cọc với số tiền là {registerUser.rentalDeposit}, thanh toán tiền thuê phòng hàng tháng vào ngày 10. + tiền điện + nước.<br />

                                            Đảm bảo các thiết bị và sửa chữa các hư hỏng trong phòng trong khi sử dụng. Nếu không sửa chữa thì khi trả phòng, bên A sẽ trừ vào tiền đặt cọc, giá trị cụ thể được tính theo giá thị trường.<br />

                                            Chỉ sử dụng phòng trọ vào mục đích ở, với số lượng tối đa không quá 04 người (kể cả trẻ em); không chứa các thiết bị gây cháy nổ, hàng cấm... cung cấp giấy tờ tùy thân để đăng ký tạm trú theo quy định, giữ gìn an ninh trật tự, nếp sống văn hóa đô thị; không tụ tập nhậu nhẹt, cờ bạc và các hành vi vi phạm pháp luật khác.<br />

                                            Không được tự ý cải tạo kiếm trúc phòng hoặc trang trí ảnh hưởng tới tường, cột, nền... Nếu có nhu cầu trên phải trao đổi với bên A để được thống nhất</p>
                                    </div>
                                    <div className=''>
                                        <p className='info-user'>4. Điều khoản thực hiện</p>
                                        <p>Hai bên nghiêm túc thực hiện những quy định trên trong thời hạn cho thuê, nếu bên A lấy phòng phải báo cho bên B ít nhất 01 tháng, hoặc ngược lại.<br />
                                            Sau thời hạn cho thuê nếu bên B có nhu cầu hai bên tiếp tục thương lượng giá thuê để gia hạn hợp đồng bằng miệng hoặc thực hiện như sau.</p>
                                    </div>
                                    <div className='row text-center mt-4'>
                                        <div className='col-6'>
                                            <p className='info-user'>Bên B</p>
                                            <p>(Ký, ghi rõ họ tên)</p>
                                            <p className='mt-4'><input required {...registerCreate('signatureB')} defaultValue={registerUser.fullname} placeholder="ghi gõ họ tên" /></p>
                                        </div>
                                        <div className='col-6'>
                                            <p className='info-user'>Bên A</p>
                                            <p>(Ký, ghi rõ họ tên)</p>
                                            <p className='mt-4'><input required {...registerCreate('signatureA')} defaultValue={'nguyễn hoàng thanh nhã'} placeholder="ghi gõ họ tên" /></p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-2 mx-auto mt-4'>
                                            <button className='btn btn-outline-success mb-4 mx-auto'>Tạo vào gửi </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}