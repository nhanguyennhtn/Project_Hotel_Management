import React, { Link, useLocation } from "react-router-dom";
import AdminHeader from '../components/Header'
import ContentMenu from "../components/ContentMenu";
import '../../../assets/scss/admin/Admin.scss'
import { apiContractsRead } from "../../../axios/axios";
import { useEffect, useState } from "react";

export default function CustomerDetail() {
    const customer = useLocation().state
    const [contracts, setContracts] = useState()
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiContractsRead()
        setContracts(res.contracts)
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const currentCustomer = () => {
        if (customer?.staus === false) {
            return <p className="text-secondary mx-2" >Dừng hoạt động</p>
        } else if (customer.status === true) {
            return <p className="text-primary mx-2" >Đang hoạt động</p>
        }
    }

    const checkSubmit = (item) => {
        if (item.status) {
            return <button className='btn btn-block mb-4 mx-auto ' disabled>Đã xác nhận </button>
        } else if (item.status === false) {
            return <button className='btn btn-block mb-4 mx-auto ' disabled>Đã kết thúc </button>
        } else return <button className='btn btn-block mb-4 mx-auto ' disabled>Chưa xác nhận </button>
    }
    // return (
    //     <div>
    //         <AdminHeader />
    //         <div className="admin-wrapper">
    //             <div className="container-md contain-with">
    //                 <div className="card mt-3">
    //                     <div className="row mx-2">
    //                         <div className="col-5">
    //                             <div className="mt-3 d-flex ">
    //                                 <label>Tài khoản người dùng:</label>
    //                                 <p className="mx-2">{customer.username.username}</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Họ và Tên:</label>
    //                                 <p className="mx-2">{customer.fullname}</p>
    //                             </div>
    //                         </div>
    //                         <div className="col-5">
    //                             <div className="mt-3 d-flex ">
    //                                 <label className="">Trạng thái: </label>
    //                                 {currentCustomer()}
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Họ và Tên:</label>
    //                                 <p className="mx-2">{customer.fullname}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="row mx-2">
    //                         <div className="col-5 ">
    //                             <div className=" d-flex ">
    //                                 <label>Căn cước:</label>
    //                                 <p className="mx-2">{customer.IDcard}</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Số điện thoại:</label>
    //                                 <p className="mx-2">{customer.phone}</p>
    //                             </div>
    //                         </div>
    //                         <div className="col-5">
    //                             <div className=" d-flex ">
    //                                 <label>Ngày cấp:</label>
    //                                 <p className="mx-2">{customer.licenseDate}</p>
    //                                 <label>Nơi cấp:</label>
    //                                 <p className="mx-2">{customer.licenseAddress}</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Tại:</label>
    //                                 <p className="mx-2">{customer.room.title}</p>
    //                                 <label>Loại phòng:</label>
    //                                 <p className="mx-2">{customer.room.kind}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="row mx-2">
    //                         <div className="col-5 ">

    //                             <div className=" d-flex ">
    //                                 <label>Phương thức thanh toán:</label>
    //                                 <p className="mx-2">{customer.pay}</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Gói trả trước:</label>
    //                                 <p className="mx-2">{customer.costPackage}</p>
    //                             </div>
    //                         </div>
    //                         <div className="col-5">
    //                             <div className=" d-flex ">
    //                                 <label>Giá: </label>
    //                                 <p className="mx-2">{Intl.NumberFormat('vi-VN').format(customer.room.price)}vnđ</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Tiền cọc phòng:</label>
    //                                 <p className="mx-2">{customer.rentalDeposit}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="row mx-2">
    //                         <div className="col-5 ">
    //                             <div className=" d-flex ">
    //                                 <label >Hợp đồng:</label>
    //                                 {customer?.contract?.status ?
    //                                     <button onClick={toggleVisibility} className="text-primary mx-2 border-0">Đang hoạt động</button>
    //                                     :
    //                                     <button onClick={toggleVisibility} className="text-primary mx-2">Đã kết thúc</button>
    //                                 }
    //                             </div>
    //                             <div className=" d-flex mt-3">
    //                                 <label>Gói trả trước:</label>
    //                                 <p className="mx-2">{customer.costPackage}</p>
    //                             </div>
    //                         </div>
    //                         <div className="col-5">
    //                             <div className=" d-flex ">
    //                                 <label>Giá: </label>
    //                                 <p className="mx-2">{Intl.NumberFormat('vi-VN').format(customer.room.price)}vnđ</p>
    //                             </div>
    //                             <div className=" d-flex ">
    //                                 <label>Tiền cọc phòng:</label>
    //                                 <p className="mx-2">{customer.rentalDeposit}</p>
    //                             </div>
    //                         </div>
    //                     </div>

    //                 </div>
    //                 {isVisible && (
    //                     <div className="card mt-3 ">
    //                         {contracts?.filter((item) => {
    //                             return customer?.contract?._id === item._id
    //                         }).map((item) => {
    //                             return (
    //                                 <div className="contract-wrapper">
    //                                     <div className='card mt-4'>
    //                                         <div className='card mx-auto container-md width-card mt-4' >
    //                                             <div className='row'>
    //                                                 <div className='col-12 text-center mt-4'>
    //                                                     <div className='fs-6'>
    //                                                         <b>CỘNG HÒA CHỦ NGĨA VIỆT NAM <br />
    //                                                             <p className='text-decoration-underline'>Độc lập-Tự do-Hạnh phúc</p>
    //                                                         </b>
    //                                                     </div>
    //                                                     <div className='fw-bold fs-6 mb-3'>
    //                                                         {item.topic}
    //                                                     </div>
    //                                                 </div>
    //                                                 <div className='container-body'>
    //                                                     <div className='mt-3'>
    //                                                         <p>Hôm nay, {item.user.date} , tại {item.room.title}</p>
    //                                                         <p><b>Chúng tôi gồm:</b></p>
    //                                                     </div>
    //                                                     <div className=' mt-2 fw-600'>
    //                                                         <p className='info-user'>BÊN CHO THUÊ PHÒNG TRỌ (gọi tắt là Bên A):</p>
    //                                                         <p>Ông/bà (tên chủ hợp đồng) {item.host}</p>
    //                                                         <p>CMND/CCCD số  {item.phoneHost}</p>
    //                                                     </div>
    //                                                     <div className=' mt-2 fw-600'>
    //                                                         <p className='info-user'>BÊN THUÊ PHÒNG TRỌ (gọi tắt là Bên B):</p>
    //                                                         <p>Ông/bà (tên chủ hợp đồng) {item.user.fullname} </p>
    //                                                         <p>CMND/CCCD số {item.user.IDcard} </p>
    //                                                     </div>
    //                                                     <p className='fst-italic '>Sau khi thỏa thuận, hai bên thống nhất như sau:</p>

    //                                                     <div className=''>
    //                                                         <p className='info-user'>1.Nội dung phòng trọ</p>
    //                                                         <p>Bên A cho Bên B thuê 01 phòng trọ {item.user.room.title}
    //                                                             Với thời hạn là: {item.cycle}
    //                                                             tháng, giá thuê:  {Intl.NumberFormat('vi-VN').format(item.user.room.price)} vnđ
    //                                                             Thời gian bắt đầu:  {item.user.dateStart}
    //                                                             . Thời hạn đến ngày:  {item.user.dateEnd}
    //                                                             <br />Chưa bao gồm chi phí: điện sinh hoạt, nước.</p>
    //                                                     </div>
    //                                                     <div className=''>
    //                                                         <p className='info-user'>2.Trách nhiệm Bên A</p>
    //                                                         <p>Đảm bảo căn nhà cho thuê không có tranh chấp, khiếu kiện.</p>
    //                                                         <p>Đăng ký với chính quyền địa phương về thủ tục cho thuê phòng trọ.</p>
    //                                                     </div>
    //                                                     <div className=''>
    //                                                         <p className='info-user'>3. Trách nhiệm Bên B</p>
    //                                                         <p>Đặt cọc với số tiền là {item.user.pay}, thanh toán tiền thuê phòng hàng tháng vào ngày 10. + tiền điện + nước.<br />

    //                                                             Đảm bảo các thiết bị và sửa chữa các hư hỏng trong phòng trong khi sử dụng. Nếu không sửa chữa thì khi trả phòng, bên A sẽ trừ vào tiền đặt cọc, giá trị cụ thể được tính theo giá thị trường.<br />

    //                                                             Chỉ sử dụng phòng trọ vào mục đích ở, với số lượng tối đa không quá 04 người (kể cả trẻ em); không chứa các thiết bị gây cháy nổ, hàng cấm... cung cấp giấy tờ tùy thân để đăng ký tạm trú theo quy định, giữ gìn an ninh trật tự, nếp sống văn hóa đô thị; không tụ tập nhậu nhẹt, cờ bạc và các hành vi vi phạm pháp luật khác.<br />

    //                                                             Không được tự ý cải tạo kiếm trúc phòng hoặc trang trí ảnh hưởng tới tường, cột, nền... Nếu có nhu cầu trên phải trao đổi với bên A để được thống nhất</p>
    //                                                     </div>
    //                                                     <div className=''>
    //                                                         <p className='info-user'>4. Điều khoản thực hiện</p>
    //                                                         <p>Hai bên nghiêm túc thực hiện những quy định trên trong thời hạn cho thuê, nếu bên A lấy phòng phải báo cho bên B ít nhất 01 tháng, hoặc ngược lại.<br />
    //                                                             Sau thời hạn cho thuê nếu bên B có nhu cầu hai bên tiếp tục thương lượng giá thuê để gia hạn hợp đồng bằng miệng hoặc thực hiện như sau.</p>
    //                                                     </div>
    //                                                     <div className='row text-center mt-4'>
    //                                                         <div className='col-6'>
    //                                                             <p className='info-user'>Bên B</p>
    //                                                             <p>(Ký, ghi rõ họ tên)</p>

    //                                                             <p className='mt-4'>{item.signatureB}</p>

    //                                                         </div>
    //                                                         <div className='col-6'>
    //                                                             <p className='info-user'>Bên A</p>
    //                                                             <p>(Ký, ghi rõ họ tên)</p>
    //                                                             <p className="mt-4">{item.signatureA}</p>
    //                                                         </div>
    //                                                     </div>
    //                                                     <div className='row'>
    //                                                         <div className='col-2 mx-auto mt-4'>
    //                                                             {checkSubmit(item)}
    //                                                         </div>
    //                                                     </div>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             )
    //                         })}
    //                     </div>
    //                 )}

    //             </div>
    //         </div>
    //     </div >

    // )
    return (
        <div className='wrapper'>
            <AdminHeader />
            <div class="container-fluid">
                <div class="row">
                    <ContentMenu />
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h4 ms-4">Danh sách phòng hoạt động</h1>
                        </div>
                        <div className="">
                            <div className="container-md contain-with">
                                <div className="card mt-3">
                                    <div className="row mx-2">
                                        <div className="col-5">
                                            <div className="mt-3 d-flex ">
                                                <label>Tài khoản người dùng:</label>
                                                <p className="mx-2">{customer.username.username}</p>
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Họ và Tên:</label>
                                                <p className="mx-2">{customer.fullname}</p>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className="mt-3 d-flex ">
                                                <label className="">Trạng thái: </label>
                                                {currentCustomer()}
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Họ và Tên:</label>
                                                <p className="mx-2">{customer.fullname}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-2">
                                        <div className="col-5 ">
                                            <div className=" d-flex ">
                                                <label>Căn cước:</label>
                                                <p className="mx-2">{customer.IDcard}</p>
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Số điện thoại:</label>
                                                <p className="mx-2">{customer.phone}</p>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className=" d-flex ">
                                                <label>Ngày cấp:</label>
                                                <p className="mx-2">{customer.licenseDate}</p>
                                                <label>Nơi cấp:</label>
                                                <p className="mx-2">{customer.licenseAddress}</p>
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Tại:</label>
                                                <p className="mx-2">{customer.room.title}</p>
                                                <label>Loại phòng:</label>
                                                <p className="mx-2">{customer.room.kind}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-2">
                                        <div className="col-5 ">

                                            <div className=" d-flex ">
                                                <label>Phương thức thanh toán:</label>
                                                <p className="mx-2">{customer.pay}</p>
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Gói trả trước:</label>
                                                <p className="mx-2">{customer.costPackage}</p>
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className=" d-flex ">
                                                <label>Giá: </label>
                                                <p className="mx-2">{Intl.NumberFormat('vi-VN').format(customer.room.price)}vnđ</p>
                                            </div>
                                            <div className=" d-flex ">
                                                <label>Tiền cọc phòng:</label>
                                                <p className="mx-2">{customer.rentalDeposit}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-2">
                                        <div className="col-5 ">
                                            <div className=" d-flex ">
                                                <label >Hợp đồng:</label>
                                                {customer?.contract?.status ?
                                                    <button onClick={toggleVisibility} className="text-primary mx-2 border-0">Đang hoạt động</button>
                                                    :
                                                    <button onClick={toggleVisibility} className="text-primary mx-2">Đã kết thúc</button>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-5">
                                            <div className=" d-flex ">
                                                <label>Giá: </label>
                                                <p className="mx-2">{Intl.NumberFormat('vi-VN').format(customer.room.price)}vnđ</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {isVisible && (
                                    <div className="card mt-3 ">
                                        {contracts?.filter((item) => {
                                            return customer?.contract?._id === item._id
                                        }).map((item) => {
                                            return (
                                                <div className="contract-wrapper">
                                                    <div className='card mt-4'>
                                                        <div className='card mx-auto container-md width-card mt-4' >
                                                            <div className='row'>
                                                                <div className='col-12 text-center mt-4'>
                                                                    <div className='fs-6'>
                                                                        <b>CỘNG HÒA CHỦ NGĨA VIỆT NAM <br />
                                                                            <p className='text-decoration-underline'>Độc lập-Tự do-Hạnh phúc</p>
                                                                        </b>
                                                                    </div>
                                                                    <div className='fw-bold fs-6 mb-3'>
                                                                        {item.topic}
                                                                    </div>
                                                                </div>
                                                                <div className='container-body'>
                                                                    <div className='mt-3'>
                                                                        <p>Hôm nay, {item.user.date} , tại {item.room.title}</p>
                                                                        <p><b>Chúng tôi gồm:</b></p>
                                                                    </div>
                                                                    <div className=' mt-2 fw-600'>
                                                                        <p className='info-user'>BÊN CHO THUÊ PHÒNG TRỌ (gọi tắt là Bên A):</p>
                                                                        <p>Ông/bà (tên chủ hợp đồng) {item.host}</p>
                                                                        <p>CMND/CCCD số  {item.phoneHost}</p>
                                                                    </div>
                                                                    <div className=' mt-2 fw-600'>
                                                                        <p className='info-user'>BÊN THUÊ PHÒNG TRỌ (gọi tắt là Bên B):</p>
                                                                        <p>Ông/bà (tên chủ hợp đồng) {item.user.fullname} </p>
                                                                        <p>CMND/CCCD số {item.user.IDcard} </p>
                                                                    </div>
                                                                    <p className='fst-italic '>Sau khi thỏa thuận, hai bên thống nhất như sau:</p>

                                                                    <div className=''>
                                                                        <p className='info-user'>1.Nội dung phòng trọ</p>
                                                                        <p>Bên A cho Bên B thuê 01 phòng trọ {item.user.room.title}
                                                                            Với thời hạn là: {item.cycle}
                                                                            tháng, giá thuê:  {Intl.NumberFormat('vi-VN').format(item.user.room.price)} vnđ
                                                                            Thời gian bắt đầu:  {item.user.dateStart}
                                                                            . Thời hạn đến ngày:  {item.user.dateEnd}
                                                                            <br />Chưa bao gồm chi phí: điện sinh hoạt, nước.</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='info-user'>2.Trách nhiệm Bên A</p>
                                                                        <p>Đảm bảo căn nhà cho thuê không có tranh chấp, khiếu kiện.</p>
                                                                        <p>Đăng ký với chính quyền địa phương về thủ tục cho thuê phòng trọ.</p>
                                                                    </div>
                                                                    <div className=''>
                                                                        <p className='info-user'>3. Trách nhiệm Bên B</p>
                                                                        <p>Đặt cọc với số tiền là {item.user.pay}, thanh toán tiền thuê phòng hàng tháng vào ngày 10. + tiền điện + nước.<br />

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

                                                                            <p className='mt-4'>{item.signatureB}</p>

                                                                        </div>
                                                                        <div className='col-6'>
                                                                            <p className='info-user'>Bên A</p>
                                                                            <p>(Ký, ghi rõ họ tên)</p>
                                                                            <p className="mt-4">{item.signatureA}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className='col-2 mx-auto mt-4'>
                                                                            {checkSubmit(item)}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}