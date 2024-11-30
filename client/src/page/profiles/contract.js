import { useEffect, useState } from "react";
import { apiContractsRead, apiContractsUpdate, apiUsersUpdate } from "../../axios/axios";

import '../../assets/scss/admin/Contract.scss'
import Headers from '../../components/Header.js'

export default function UserContract() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))._id
    const [contracts, setContracts] = useState()

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const ngay = today.toLocaleDateString("vi-VN", options)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await apiContractsRead()
        setContracts(res.contracts)
    }
    console.log(contracts);
    

    const   handleSuccess = async (item) => {
        try {
            if (window.confirm('Xác nhận ký kết hợp đồng?')) {
                const res = await apiContractsUpdate({ item, _id: item._id, status: true, date: ngay })
                await apiUsersUpdate({ _id: item.user._id, contract: item._id, status: true })
                console.log(res);
                fetchData()
            }

        } catch (e) {
            console.log(e);
        }
    }

    const handleExport = (item) => {

    }
    const handleCheckIn = (data) => {
        if (data.status === true) {
            return <button className=" btn border-primary ml-auto my-3 disabled" onClick={() => handleExport(data)}> Đã Xác nhận</button>
        } else if (data.status === null) {
            return <button className='btn btn-outline-success mb-4 mx-auto' onClick={() => handleSuccess(data)}>Xác nhận ký kết </button>
        } else if (data.status === false) return <button className='btn btn-outline-secondary mb-4 mx-auto disabled' onClick={() => handleSuccess(data)}>Ngưng hoạt động </button>
    }
    const contractLenght = contracts?.filter((item) => {
        return item.user?.username === userInfo
    })
    return (
        <div>
            <Headers />
            <div className=" container-xxl card ">
                {contractLenght?.length > 0 ?
                    contractLenght.map((item) => {
                        return (
                            <div className="contract-wrapper">
                                <div className='card mt-4 '>
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
                                                    <p>Bên A cho Bên B thuê 01 phòng trọ {item.room.title} Với thời hạn là: {parseInt(item.cycle)} tháng,
                                                        giá thuê: {Intl.NumberFormat('vi-VN').format(item.room.price)} vnđ
                                                        Thời gian bắt đầu:   {item.user.dateStart}.
                                                        Thời hạn đến ngày:<br /> {item.user.dateEnd}.
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
                                                        {handleCheckIn(item)}
                                                        {/* {item.status ?
                                                        <button className=" border-primary ml-auto my-3" onClick={() => handleExport(item)}> Xuất file</button>
                                                        // <button className='btn btn-block mb-4 mx-auto ' disabled>Đã xác nhận </button>
                                                        :
                                                        <button className='btn btn-outline-success mb-4 mx-auto' onClick={() => handleSuccess(item)}>Xác nhận ký kết </button>
                                                    } */}


                                                    </div>
                                                </div>
                                                {/* <div className="row" >
                                                <div className="col-12 ml-auto">
                                                    <button className=" border-primary ml-auto my-3"> Xuất file</button>
                                                </div>
                                            </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                     :
                    <div className=" row " style={{marginTop: 100}}>
                        <h5 className="d-flex justify-content-center align-items-center">không tìm thấy dữ liệu</h5>
                    </div>
                }
            </div>

        </div>

    )
}