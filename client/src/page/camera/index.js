import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from 'react-webcam';
import axios from "axios";
import Headers from "../../components/camera/Header";
import '../../assets/scss/HomePage.scss';
import QRCodeScanner from '../../components/camera/QRcodeRenderComponent'
import { image0 } from "../../assets/img/panner";

export default function HomePage() {
    const [biensoND1, setBiensoND1] = useState('');
    const [biensoND2, setBiensoND2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [result, setResult] = useState([]);
    const [result0, setResult0] = useState([]);
    const [result1, setResult1] = useState([]);
    // const [devices, setDevices] = useState([]);
    const [device1, setDevice1] = useState(null);
    const [device2, setDevice2] = useState(null);
    const [device3, setDevice3] = useState(null);

    const webcamRef1 = useRef(null);
    const webcamRef2 = useRef(null);

    const [imageSrc1, setImageSrc1] = useState('');
    const [imageSrc2, setImageSrc2] = useState('');
    const [imgResult1, setImgResult1] = useState('');
    const [imgResult2, setImgResult2] = useState('');

    const [capturing1, setCapturing1] = useState(true);
    const [capturing2, setCapturing2] = useState(true);
    const [models1, setModels1] = useState(true);
    const [models2, setModels2] = useState(true);

    const [camQR, setcamQR] = useState(false);
    const [camQROut, setcamQROut] = useState(false);

    const result_BXS1 = useRef([]);
    const result_BXS2 = useRef([]);

    const [sothe, setSothe] = useState('')
    const [sothe_XR, setSothe_XR] = useState('')
    const [giatien, setGiatien] = useState('')

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error])

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                // setDevices(videoDevices);
                if (videoDevices.length > 0) setDevice1(videoDevices[0].deviceId);
                if (videoDevices.length > 1) setDevice2(videoDevices[1].deviceId);
                if (videoDevices.length > 2) setDevice3(videoDevices[2].deviceId);
            });

    }, []);

    const videoConstraints = {
        width: 1280 + 'px',
        height: 720 + 'px',
        facingMode: "environment"
    };

    useEffect(() => {
        if (capturing1) {
            const interval = setInterval(() => {
                capture1();
            }, 500);
            return () => clearInterval(interval);
        }
        fetchData()
    }, [capturing1, biensoND1]);

    useEffect(() => {
        if (capturing2) {
            const interval = setInterval(() => {
                capture2();
            }, 500);
            return () => clearInterval(interval);
        }
        fetchData2()
    }, [capturing2, biensoND2]);

    useEffect(() => {
        fetchData()
        if (result?.ma_the) {
            if (sothe === result.ma_the) {
                return setSothe(result.ma_the)
            }
            setSothe(sothe)
        } else if (biensoND1 && sothe === '') {
            setcamQR(true)
        }
    }, [biensoND1])
    useEffect(() => { if (biensoND2) { setcamQROut(true) } }, [biensoND2])

    const [isCardVehicles, setIsCardVehicles] = useState([])
    const [NVs, setNVs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3535/api/cardVehicles/read')
            .then((isCardVehicle) => {
                setIsCardVehicles(isCardVehicle?.data.cardVehicle)
            })
        axios.get('http://localhost:3535/api/users/read')
        .then((user) => {
            setNVs(user.data.user)
        })
    }, [sothe])
    const filterCard = Array.isArray(isCardVehicles) ? isCardVehicles.filter((item) => item.ma_the === sothe) : []
    const filterNV = NVs.filter(nv => {return nv.username._id === sessionStorage.getItem('staffInfo')})
    
    const fetchData = () => {
        axios.get(`http://localhost:3535/api/search_by_plate`, {
            params: { bienso_ND: biensoND1 },
        })
            .then(response => {
                setResult(response.data);
            })
            .catch(error => {
                console.error("Lỗi trong quá trình xử lý", error);
                setResult(null);
            });
    };
    useEffect(() => {
        fetchData2()
        if (result1?.thexe) {
            setcamQROut(true)
        }
    }, [biensoND2])

    const fetchData2 = async () => {
        await axios.get(`http://localhost:3535/api/search_by_plate`, {
            params: { bienso_ND: biensoND2 },
        })
            .then(response => {
                setResult0(response.data);
            })
            .catch(error => {
                console.error("Lỗi trong quá trình xử lý", error);
                setResult0(null);
            });
        await axios.get(`http://localhost:3535/api/XeVao/${biensoND2}`)
            .then(response => {
                if (response.data.vehicleIn.trangthai === "Trong bãi"){
                    setResult1({ ...result1, ...response.data.vehicleIn });
                } else {
                    setResult1({})
                }
            })
            .catch(error => {
                console.error("Lỗi trong quá trình xử lý", error);
                setResult1(null);
            });
    }

    const check_BXS1 = () => {
        if (!models1) {
            return ''
        } else {
            if (result_BXS1.current.length > 3) {
                result_BXS1.current.shift();
            }
            if (result_BXS1.current.length === 3 && result_BXS1.current.every(res => res === result_BXS1.current[0] && res !== '')) {
                setCapturing1(false);
                setModels1(false)
                setBiensoND1(result_BXS1.current[1]);
                result_BXS1.current = [];
            }
        }

    };

    const check_BXS2 = () => {
        if (result_BXS2.current.length > 2) {
            result_BXS2.current.shift();
        }
        if (result_BXS2.current.length === 2 && result_BXS2.current.every(res => res === result_BXS2.current[0] && res !== '')) {
            setCapturing2(false)
            setModels2(false)
            setBiensoND2(result_BXS2.current[1]);
            // fetchData(result_BXS2.current[2]);
            result_BXS2.current = [];
        }
    };
    const capture1 = useCallback(() => {
        const imageSrc = webcamRef1?.current?.getScreenshot();
        setImageSrc1(imageSrc);
        if (models1) {
            axios.post('https://fc4a-34-125-144-214.ngrok-free.app/api/webcam-model', { image: imageSrc })
                .then(response => {
                    const { yl_result, image_base64, yl_result_sort } = response.data;
                    if (yl_result && yl_result !== '' && yl_result_sort.length > 5) {
                        result_BXS1.current.push(yl_result_sort);
                        check_BXS1();
                    }
                    setImgResult1(image_base64);
                })
                .catch(error => {

                });
        }
    }, [webcamRef1]);


    useEffect(() => {
        if (!camQR) {
            setSothe('')
            fetchData()
        }
    }, [camQR, biensoND1])

    useEffect(() => {
        if (!camQROut) {
            setSothe_XR('')
            fetchData2()
        }
    }, [camQROut, biensoND2])

    const capture2 = useCallback(() => {
        const imageSrc = webcamRef2?.current?.getScreenshot();
        setImageSrc2(imageSrc);
        axios.post('https://fc4a-34-125-144-214.ngrok-free.app/api/webcam-model', { image: imageSrc })
            .then(response => {
                const { yl_result, image_base64, yl_result_sort } = response.data;
                if (models2) {
                    if (yl_result && yl_result !== '') {
                        result_BXS2.current.push(yl_result_sort);
                        check_BXS2();
                    }
                    setImgResult2(image_base64);
                }
            })
            .catch(error => {
                console.error("There was an error processing the image!", error);
            });
    }, [webcamRef2]);


    const handleSubmit_XV = async (event) => {
        event.preventDefault();
        const plateRegex = /^[A-Z0-9]{2}-[A-Z0-9]{2} \d{3}\.\d{2}$|^[A-Z0-9]{2}-[A-Z0-9]{2} \d{4}$/
        if (!plateRegex.test(biensoND1)) {
            alert('Biển số xe không đúng định dạng!');
            return;
        }
        if (!sothe) {
            alert('Số thẻ không được để trống!');
            return;
        }
        

        const response = await axios.get('http://localhost:3535/api/XeVao/read');
        const vehiclesInLot = response.data.vehicleIn?.filter(vehicle => vehicle.trangthai === "Trong bãi");
        // const cardFilter = response.data.vehicleIn?.filter(cardInLot => cardInLot?.ma_the.sothe === sothe && cardInLot?.ma_the.trangthai_the === "Đang dùng")

        const duplicateVehicle = vehiclesInLot.find(vehicle => vehicle.biensoxe_XV === biensoND1);
        if (duplicateVehicle) {
            alert('Biển số xe đã tồn tại trong bãi!');
            return;
        }

        const newxeVao = {
            biensoxe_XV: biensoND1,
            anh_XV: imageSrc1,
            anhBS_XV: imgResult1,
            chucvu_XV: result?.chucvu,
            thoigian_XV: result.thoigian,

            ma_the: result?.idthexe ? result?.idthexe : filterCard[0]?._id,
            trangthai: "Trong bãi",
            ma_DKX: result?.registerVehicle,
        };
        // setCapturing1(true);
        if (!filterCard?.map((item) => item.ma_the).includes(sothe)) {
            setBiensoND1('')
            setCapturing1(true)
            setcamQR(false)
            alert('Thẻ không tồn tại')
            return fetchData();
        }
        await axios.post('http://localhost:3535/api/XeVao/create', newxeVao)
        const ma_the = result?.idthexe ? result?.idthexe : filterCard[0]?._id
        await axios.put(`http://localhost:3535/api/cardVehicles/update/${ma_the}`, { trangthai_the: 'Đang dùng' });
        setSuccess('Xevao đã được thêm');
        setImageSrc1('');
        setBiensoND1('');
        setIsCardVehicles('');
        setcamQR(false);
        setCapturing1(true)
        setSothe('');
        setResult([]);
        setModels1(true);

    };
    
    const handleSubmit_XR = (event) => {
        event.preventDefault();
        const newxeRa = {
            biensoxe_XR: result1?.bienso_XV,
            anh_XR: imageSrc2,
            anhBS_XR: imgResult2,
            chucvu: result1?.chucvu_XV,
            thoigian_XR: result0?.thoigian,
            giatien: giatien?.GiaTienTong,

            ma_NV: filterNV[0]?._id || null,
            ma_XV: result1?._id,
        };
        try {
            if (sothe_XR === result1?.ma_the.ma_the) {
                const xevao = axios.put(`http://localhost:3535/api/XeVao/${biensoND2}`, {trangthai: 'Rời bãi'});
                const ma_the = result1?.ma_the._id
                const thexe = axios.put(`http://localhost:3535/api/cardVehicles/update/${ma_the}`, {trangthai_the: 'Hoạt động'});
                if (xevao && thexe ) {
                    axios.post('http://localhost:3535/api/Xera/create', newxeRa);
                    console.log('Xera added successfully');
                    setCapturing2(true)
                    setImgResult2('')
                    setcamQROut(false)
                    setImageSrc2('');
                    setBiensoND2('');
                    setResult1([]);
                    setGiatien('')
                    fetchData2()
                    setSothe_XR('')
                    setModels2(true)
                }
                setResult1([]);

            } else {
                alert('QR không trùng khớp')
            }
        } catch (error) {
            console.error('Error adding Xera:', error);
        }
    }

    useEffect(() => {
        if (biensoND2) {
            axios.get('http://localhost:3535/api/tinhtien_xera', {
                params: { bienso_ND: biensoND2 }
            })
                .then(response => {
                    setGiatien(response.data);
                })
                .catch(error => {
                    setGiatien('khong co du lieu');
                });
        }
    }, [biensoND2]);


    const total = (giatien?.GiaTienTong) ? (Intl.NumberFormat('vi-vn').format(giatien?.GiaTienTong) + ' VNĐ') : ''

    return (
        <div>
            <div className="home-wrapper card container-xxl">
                <div className=" bg-white ">
                    <Headers />
                    <div style={{ zIndex: 1100, display: 'block' }}>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <div className="row container-fluid mt-2">
                        <div className="d-flex justify-content-evenly gap-2">
                            <div className="card algin col-xxl-4">
                                <div className="row w-100">
                                    <label className="text-center text-uppercase fw-bold">Cổng vào</label>
                                    <div className="card algin col-xxl-12 ms-2">
                                        <label className="text-center text-uppercase fw-bold">Thông tin xe vào</label>
                                        <div className="card">
                                            {device1 && <Webcam
                                                audio={false}
                                                ref={webcamRef1}
                                                screenshotFormat="image/jpeg"
                                                width={640}
                                                height={480}
                                                videoConstraints={{ deviceId: device1, facingMode: 'environment' }}
                                                style={{ width: 100 + '%', height: 'auto' }}
                                            />}
                                        </div>
                                        <div className="d-inline-flex gap-3 ms-1">
                                            <div className="card col ">
                                                {imageSrc1 ? (
                                                    <div>
                                                        <img src={imageSrc1}
                                                            style={{ width: '9em', height: '8em' }}
                                                            alt="Captured" className="w-100"
                                                        />
                                                    </div>
                                                ) : (
                                                    <img src="" alt='' style={{ width: '9em', height: '8em' }} />
                                                )}
                                            </div>
                                            <div className="card col">
                                                {imgResult1 && biensoND1 ?
                                                    <img src={`data:image/jpeg;base64,${imgResult1}` || ''} alt="anh_bienso" style={{ width: '100%', height: '8em' }} />
                                                    :
                                                    <img src={image0} alt="anh_bienso" style={{ width: '100%', height: '8em' }} />
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column ms-2 pt-2">
                                            <div className="pb-2 pe-2">
                                                <label className="col-3">Biển số</label>
                                                <input type="text" className="col-4" value={biensoND1} onChange={(e) => setBiensoND1(e.target.value)} />
                                                <button className="submit ms-2" type='submit' onClick={handleSubmit_XV}>xác nhận</button>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column ms-2">
                                            <div className="py-2 pe-2 d-flex">
                                                <label className="col-3">Thông tin</label>
                                                <input type="text" className="col-4" value={result?.chucvu} placeholder={result?.chucvu} readOnly />
                                                {/* <div className="col-1 ms-2 p-0" style={{ width: '40px'}}>
                                                    {camQR ?
                                                        <QRCodeScanner
                                                            setSothe={setSothe}
                                                            active={camQR}
                                                            videoConstraints={{ deviceId: device3 }}
                                                        /> :
                                                        ''
                                                    }

                                                </div> */}
                                            </div>
                                            <div className="pb-2 pe-2">
                                                <label className="col-3">Biển số</label>
                                                <input type="text" className="col-9" value={biensoND1} readOnly />
                                            </div>
                                            <div className="pb-2 pe-2">
                                                <label className="col-3">Số thẻ</label>

                                                <input type="text" className="col-9" value={sothe} readOnly />

                                            </div>
                                            {biensoND1
                                                ?
                                                <div className="pb-2 pe-2">
                                                    <label className="col-3">Thời gian</label>
                                                    <input type="text" className="col-9" value={result?.thoigian} readOnly />
                                                </div>
                                                :
                                                <div className="pb-2 pe-2">
                                                    <label className="col-3">Thời gian</label>
                                                    <input type="text" className="col-9" value={''} readOnly />
                                                </div>
                                            }
                                        </div>
                                        <div className="col-2">
                                            {camQR ?
                                                <>
                                                    <label >Quét QR</label>
                                                    <QRCodeScanner
                                                        setSothe={setSothe}
                                                        active={camQR}
                                                        videoConstraints={{ deviceId: device1 }}
                                                    />
                                                </> :
                                                ''
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Camera ra */}
                            <div className="card algin col-xxl-8">
                                <div className="row w-100 ms-1 p-1">
                                    <label className="text-uppercase text-center fw-bold">Cổng ra</label>
                                    <div className="card algin col-xxl-6">
                                        <label className="text-center text-uppercase fw-bold">Thông tin xe ra</label>
                                        <div className="card">
                                            {device2 && <Webcam
                                                audio={false}
                                                ref={webcamRef2}
                                                screenshotFormat="image/jpeg"
                                                width={640}
                                                height={480}
                                                videoConstraints={{ deviceId: device2, ...videoConstraints }}
                                                style={{ width: '100%', height: 'auto' }}
                                            />}
                                        </div>
                                        <div className="d-inline-flex gap-3 ms-1">
                                            <div className="card col ">
                                                {imageSrc2 ? (
                                                    <div>
                                                        <img src={imageSrc2}
                                                            style={{ width: '9em', height: '8em' }}
                                                            alt="Captured" className="w-100"
                                                        />
                                                    </div>
                                                ) : (
                                                    <img src="" alt="anh_xera" style={{ width: '9em', height: '8em' }} />
                                                )}
                                            </div>
                                            <div className="card col">
                                                {biensoND2 && imageSrc2 ?
                                                    <img src={`data:image/jpeg;base64,${imgResult2}`} alt="image_thanhvien" style={{ width: '100%', height: '8em' }} />
                                                    :
                                                    <img src={image0} alt="image_thanhvien" style={{ width: '100%', height: '8em' }} />

                                                }
                                            </div>
                                        </div>
                                        {/* <div className="d-flex flex-column ms-2 pt-2">
                                        </div> */}
                                        <div className="pb-2 pe-2 mt-2">
                                            <label className="col-3">Biển số</label>
                                            <input type="text" className="col-9" value={biensoND2} onChange={(e) => setBiensoND2(e.target.value)} />
                                            {/* <button className="submit ms-2" type='submit' onClick={handleSubmit_XR}>xác nhận</button> */}
                                        </div>
                                        {biensoND2 ?
                                            <div className="pb-2 pe-2">
                                                <label className="col-3">Thời gian ra</label>
                                                <input type="text" className="col-9" value={result0?.thoigian} readOnly />
                                            </div>
                                            :
                                            <div className="pb-2 pe-2">
                                                <label className="col-3">Thời gian ra</label>
                                                <input type="text" className="col-9" value={''} readOnly />
                                            </div>

                                        }
                                    </div>
                                    <div className="card algin col-xxl-6">
                                        <label className="text-center text-uppercase fw-bold">Thông tin đối chiếu</label>
                                        <div className="d-inline-flex gap-3 ms-1">
                                            <div className="card col">
                                                {biensoND2 ? (
                                                    <>

                                                        <img src={result1?.anh_XV} alt="Captured" className="w-100" />

                                                    </>
                                                ) : (
                                                    <>
                                                        <img src={image0} alt="anh_xevao" style={{ width: '100%', height: '8em' }} />
                                                    </>
                                                )}
                                            </div>
                                            {biensoND2 && result1 ?
                                                <div className="card col">
                                                    <img src={`data:image/jpeg;base64,${result1?.anhBS_XV}` || ''} alt="image_thanhvien" style={{ width: '100%', height: '8em' }} />
                                                </div>
                                                :
                                                <div className="card col">
                                                    <img src={image0} alt="image_thanhvien" style={{ width: '100%', height: '8em' }} />
                                                </div>
                                            }
                                        </div>
                                        {biensoND2 ?
                                            <>
                                                <div className="d-flex flex-column ms-2 pt-2">
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Biển số</label>
                                                        <input type="text" className="col-4" value={result1?.biensoxe_XV} readOnly />
                                                    </div>

                                                </div>
                                                <div className="d-flex flex-column ms-2">
                                                    <div className="py-2 pe-2">
                                                        <label className="col-3">Thông tin</label>
                                                        <input type="text" className="col-4" value={result1?.chucvu_XV} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Số thẻ</label>
                                                        <input type="text" className="col-9" value={result1?.ma_the?.ma_the} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Thời gian vào</label>
                                                        <input type="text" className="col-9" value={result1?.thoigian_XV} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Quét QR</label>
                                                        {result1?.ma_the && camQROut ?
                                                            <div className="col-4">
                                                                <QRCodeScanner
                                                                    setSothe={setSothe_XR}
                                                                    active={camQROut}
                                                                    videoConstraints={{ deviceId: device2, facingMode: "environment" }}
                                                                />
                                                            </div>
                                                            :
                                                            ''
                                                        }
                                                        {sothe_XR !== result1?.ma_the?.ma_the ?
                                                            <div>
                                                                <input value={sothe_XR} readOnly className='d-block' />
                                                                <span className="text-danger "> QR và thẻ xe không khớp</span>
                                                            </div>
                                                            :
                                                            <div>
                                                                <input value={sothe_XR} readOnly />
                                                                <span className="text-success"> Xin mời xe ra</span>
                                                            </div>

                                                        }
                                                    </div>
                                                    {/* <div className="pb-2 pe-2">
                                                <label className="col-3 fw-bold">Tổng tiền</label>
                                                <input type="text" className="col-9 p-2" value={''} readOnly />
                                            </div> */}
                                                </div>
                                            </> :
                                            <>
                                                <div className="d-flex flex-column ms-2 pt-2">
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Biển số</label>
                                                        <input type="text" className="col-4" value={''} readOnly />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column ms-2">
                                                    <div className="py-2 pe-2">
                                                        <label className="col-3">Thông tin</label>
                                                        <input type="text" className="col-4" value={''} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Số thẻ</label>
                                                        <input type="text" className="col-9" value={''} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Thời gian vào</label>
                                                        <input type="text" className="col-9" value={''} readOnly />
                                                    </div>
                                                    <div className="pb-2 pe-2">
                                                        <label className="col-3">Quét QR</label>
                                                        {result1?.thexe && camQROut ?
                                                            <div className="col-4">
                                                                <QRCodeScanner
                                                                    setSothe={setSothe_XR}
                                                                    active={camQROut}
                                                                    videoConstraints={{ deviceId: device1, facingMode: "environment" }}
                                                                />
                                                            </div>
                                                            :
                                                            ''
                                                        }
                                                        {sothe_XR !== '' ?
                                                            <>
                                                                {sothe_XR !== result1?.ma_the?.ma_the ?
                                                                    <div>
                                                                        <input value={sothe_XR} className='d-block' />
                                                                        <span className="text-danger "><i class="bi bi-exclamation-diamond-fill text-danger"></i> QR và thẻ xe không khớp</span>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <input value={sothe_XR} />
                                                                        <span className="text-success"><i class="bi bi-check-circle text-success"></i> Xin mời xe ra</span>
                                                                    </div>
                                                                }
                                                            </>
                                                            :
                                                            <div><input value={sothe_XR} className='d-block' /></div>
                                                        }

                                                    </div>
                                                </div>
                                            </>
                                        }

                                    </div>
                                </div>
                                <div className="row w-100 ms-1 p-1">
                                    <div className="pb-2 pe-2">
                                        <label className="col-2 fw-bold">Thành tiền</label>
                                        <div className="d-flex col-9 gap-2">
                                            <input type="text" className="col p-2 fs-5 " value={total} onChange={(e) => setGiatien(e.target.value)} />
                                            <button className="submit ms-auto " type='submit' onClick={handleSubmit_XR}>xác nhận</button>
                                            <div className="col-3">
                                                {giatien.warning_message ?
                                                    <span className="fs-4 text-danger"><i class="bi bi-exclamation-diamond-fill text-danger"></i>{giatien?.warning_message}</span>
                                                    :
                                                    <span></span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

