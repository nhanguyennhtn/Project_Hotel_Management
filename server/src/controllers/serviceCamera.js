const registerVehicle = require('../models/registerVehicle')
const infoVehicle = require('../models/infoVehicle')
const Account = require('../models/accountModel')
const User = require('../models/userMotel')
const CardVehicle = require('../models/cardVehicle')
const moment = require('moment')
const CostList = require('../models/costList')
const VehicleIn = require('../models/VehicleIn')
const VehicleOut = require('../models/VehicleOut')

const serviceCamera = {
    search_by_plate: async (req, res) => {
        const bienso_xe = req.query.bienso_ND
        const current_time = moment().format('YYYY-MM-DD HH:mm:ss')

        try {
            if (bienso_xe) {
                const TTX = await infoVehicle.findOne({ biensoxe_TTX: bienso_xe }).exec()
                if (TTX) {
                    const dangky = await registerVehicle.findOne({ ma_TTX: TTX._id }).exec()
                    const thexe = await CardVehicle.findOne({ _id: dangky.ma_the._id }).exec()
                    const nguoidung = await User.findOne({ _id: dangky.user._id }).exec()
                    console.log(dangky.ma_the);
                    if (dangky) {
                        console.log(thexe.ma_the);
                        if (nguoidung.username.username === 'nhanguyen') {
                            return res.json({
                                chucvu: 'chutro',
                                bienso_xe: bienso_xe,
                                ma_the: thexe.ma_the ? thexe.ma_the : null,
                                ten: nguoidung.fullname,
                                anh_xe: TTX ? TTX.anhxe_TTX : null,
                                thoigian: current_time,

                                idthexe: thexe ? thexe._id : null,
                                registerVehicle: dangky ? dangky._id : null,
                            })
                        }
                        return res.json({
                            chucvu: 'khachtro',
                            bienso_xe: bienso_xe,
                            ma_the: thexe ? thexe.ma_the : null,
                            ten: nguoidung.fullname,
                            anh_xe: TTX ? TTX.anhxe_TTX : null,
                            thoigian: current_time,

                            idthexe: thexe ? thexe._id : null,
                            registerVehicle: dangky ? dangky._id : null,
                        })
                    }
                    return res.json({
                        chucvu: 'khachtro',
                        bienso_xe: bienso_xe,
                        ma_the: thexe ? thexe.ma_the : null,
                        ten: nguoidung.fullname,
                        anh_xe: TTX ? TTX.anhxe_TTX : null,
                        thoigian: current_time,

                        idthexe: thexe ? thexe._id : null,
                        registerVehicle: dangky ? dangky._id : null,
                    })
                }
                return res.json({
                    chucvu: 'khach',
                    biensoxe: bienso_xe,
                    MSSV: null,
                    congchuc: null,
                    anh_xe: null,
                    thoigian: current_time,
                })
            }
            return res.json({
                chucvu: '',
                biensoxe: null,
                MSSV: null,
                congchuc: null,
                anh_xe: null,
                thoigian: null,
            })
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    search_by_card: async (req, res) => {
        const the_xe = req.query.sothe
        try {
            if (the_xe) {
                const nguoidung = await registerVehicle.findOne({ ma_the: the_xe }).exec()
                return res.json({
                    nguoidung
                })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Có lỗi trong quá trình thực hiện!' })
        }
    },
    filter_customerByRoom: async (req, res) => {
        const idRoom = req.query.idRoom
        const nguoidung = await user.find({ room: idRoom }).exec()
    },
    AddStaff: async (req, res) => {
        const { name, username, password, fullname, phone, IDcard, licenseDate, licenseAddress, date, status } = req.body
        const current_time = moment().format('YYYY-MM-DD HH:mm:ss')
        try {
            const account = new Account({ name, username, password, role: 2 })
            await account.save()

            const User = new user({ username: account._id, fullname, phone, IDcard, licenseDate, licenseAddress, date: current_time, status })
            await User.save()
            res.status(200).json({ message: 'Nhân viên được thêm thành công' })
        } catch (error) {
            res.status(400).json({ message: 'Xảy ra lỗi trong quá trình thêm nhân viên', error })
        }

    },
    updateStaff: async (req, res) => {
        const staffId = req.params.id;

        const { name, username, password, fullname, phone, IDcard, licenseDate, licenseAddress, status } = req.body;
        const current_time = moment().format('YYYY-MM-DD HH:mm:ss');

        try {
            // Find the staff by its ID and populate the username field
            const staff = await User.findById(staffId).populate('username'); // populates the related account
            if (!staff) {
                return res.status(404).json({ message: 'Nhân viên không tồn tại' });
            }

            // Find the related account using the username reference in the staff
            const account = await Account.findById(staff.username._id);
            if (account) {
                account.name = name || account.name;
                account.username = username || account.username;
                if (password) account.password = password; // only update the password if provided
                await account.save();
            }

            // Update staff details
            staff.fullname = fullname || staff.fullname;
            staff.phone = phone || staff.phone;
            staff.IDcard = IDcard || staff.IDcard;
            staff.licenseDate = licenseDate || staff.licenseDate;
            staff.licenseAddress = licenseAddress || staff.licenseAddress;
            staff.date = current_time; // update the modified time
            staff.status = status !== undefined ? status : staff.status;

            // Save updated staff
            await staff.save();

            // Respond with a success message
            res.status(200).json({ message: 'Thông tin nhân viên đã được cập nhật thành công' });

        } catch (error) {
            console.error("Error updating staff:", error); // Log the full error details
            res.status(400).json({ message: 'Xảy ra lỗi trong quá trình cập nhật nhân viên', error });
        }
    },
    Tinhtien: async (req, res) => {
        try {
            const latestBangGia = await CostList.findOne().sort({ ngaylap_G: -1 })
            let freengay, freedem;
            if (latestBangGia) {
                freengay = parseInt(latestBangGia.trongngay);
                freedem = parseInt(latestBangGia.quadem);
            }
            const bienso_xe = req.query.bienso_ND;

            if (!bienso_xe) {
                return res.status(400).json({ error: 'Biển số xe không được để trống' });
            }
            const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            const currentDate = moment();

            const xevao = await VehicleIn.findOne({ biensoxe_XV: bienso_xe, trangthai: "Trong bãi"}).sort({ thoigian_XV: -1 });
            
            
            let thoigian_XV = xevao ? moment(xevao.thoigian_XV).format('YYYY-MM-DD HH:mm:ss') : null;
            let delta_day2s = xevao ? currentDate.diff(moment(xevao.thoigian_XV), 'days') : null;

            let gia_xe = (currentDate.hour() >= 6 && currentDate.hour() < 19) ? freengay : freedem;

            if (delta_day2s === 0) {
                delta_day2s += 1;
            }
            const TTX = await infoVehicle.findOne({ biensoxe_TTX: bienso_xe })
            // xevao.ma_the === nguoidung.mathe
            if (TTX) {
                const nguoidung = await registerVehicle.findOne({ ma_TTX: TTX._id })
                if (nguoidung.ma_the === xevao.ma_the) {
                    const sothang_kt = parseInt(nguoidung.ngayketthuc);
                    const ngaydangky = moment(nguoidung.ngaydangky);
                    const ngayketthuc = ngaydangky.clone().add(sothang_kt, 'months');

                    const delta_days = ngayketthuc.diff(currentDate, 'days');
                    let warning_message = null;
    
                    if (delta_days < 7 && delta_days > 0) {
                        warning_message = 'Sắp hết hạn';
                    } else if (delta_days === 0) {
                        warning_message = 'Đã hết hạn';
                    }
    
                    if (delta_days > 0) {
                        gia_xe = 0;
                    }
                    return res.json({
                        chucvu: 'khachtro',
                        biensoxe: TTX.biensoxe_TTX,
                        thoigian: currentTime,
                        NgayXeVao: thoigian_XV,
                        sotien: gia_xe,
                        DayGive: delta_day2s,
                        GiaTienTong: delta_day2s * gia_xe,
                        thoiGianDK: ngaydangky.format('YYYY-MM-DD'),
                        Sothang: sothang_kt,
                        ngayketthuchopdong: ngayketthuc.format('YYYY-MM-DD'),
                        dochenhlech: delta_days,
                        warning_message
                    });
                }
            }
            return res.json({
                chucvu: 'khach',
                GiaTienTong: delta_day2s * gia_xe
            });

        } catch {

        }
    },
    get_chart_data: async (req, res) => {
        const { month, year, start_date, end_date } = req.query

        const query = {}

        if (month && year) {
            const startOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
            const endOfMonth = moment(`${year}-${month}-01`, 'YYYY-MM-DD').endOf('month').toDate();
            query.thoigian_XR = { $gte: moment(startOfMonth).format('YYYY-MM-DD HH:mm:ss'), $lte: moment(endOfMonth).format('YYYY-MM-DD HH:mm:ss') };
        } else if (start_date && end_date) {
            try {
                const startDate = moment(start_date, 'YYYY-MM-DD HH:mm:ss').startOf('day').toDate(); // Định dạng giống trong MongoDB
                const endDate = moment(end_date, 'YYYY-MM-DD HH:mm:ss').endOf('day').toDate();

                if (startDate.getTime() === endDate.getTime()) {
                    query.thoigian_XR = { $gte: moment(startDate).format('YYYY-MM-DD HH:mm:ss'), $lte: moment(startDate).format('YYYY-MM-DD HH:mm:ss') };
                } else {
                    query.thoigian_XR = { $gte: moment(startDate).format('YYYY-MM-DD HH:mm:ss'), $lte: moment(endDate).format('YYYY-MM-DD HH:mm:ss') };
                }
            } catch (error) {
                return res.status(400).json({ error: 'Invalid date format' });
            }
        } else {
            // Default to filtering by the current day
            const startOfToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            const endOfToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
            query.thoigian_XR = {
                $gte: moment(startOfToday).format('YYYY-MM-DD HH:mm:ss'),
                $lte: moment(endOfToday).format('YYYY-MM-DD HH:mm:ss')
            };
        }
        try {
            console.log(query);

            const XeRa = await VehicleOut.find(query).populate('ma_XV')
            // console.log(XeRa);

            const data = {
                chutro: {
                    count: 0,
                    total_money: 0,
                    details: []
                },
                khachtro: {
                    count: 0,
                    total_money: 0,
                    details: []
                },
                khach: {
                    count: 0,
                    total_money: 0,
                    details: []
                }

            }

            XeRa.forEach(entry => {
                const giatien = parseFloat(entry.giatien) || 0;
                const entryObj = entry.toObject();

                if (entry.chucvu === 'chutro') { // Replace with actual field checking logic for Sinhvien
                    data.chutro.count += 1;
                    data.chutro.total_money += giatien;
                    data.chutro.details.push(entryObj);
                } else if (entry.chucvu === 'khachtro') { // Replace with actual field checking logic for Congchuc
                    data.khachtro.count += 1;
                    data.khachtro.total_money += giatien;
                    data.khachtro.details.push(entryObj);
                } else {
                    data.khach.count += 1;
                    data.khach.total_money += giatien;
                    data.khach.details.push(entryObj);
                }
            });

            res.json(data);

        } catch {

        }
    }


}

module.exports = serviceCamera