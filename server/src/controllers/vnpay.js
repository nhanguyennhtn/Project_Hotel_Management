// controllers/vnpay.js
const querystring = require('qs');
const crypto = require('crypto');

exports.createPayment = (req, res) => {
    const tmnCode = 'VNPAY_TMN_CODE';
    const secretKey = 'VNPAY_SECRET_KEY';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = 'http://localhost:3000/payment-return';

    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const date = new Date();
    const createDate = date.toISOString().replace(/[-:]/g, '').split('.')[0];
    const orderId = date.getTime().toString();
    const amount = req.body.amount * 100; // VNPay yêu cầu số tiền tính bằng VND * 100

    let vnpParams = {
        'vnp_Version': '2.1.0',
        'vnp_Command': 'pay',
        'vnp_TmnCode': tmnCode,
        'vnp_Locale': 'vn',
        'vnp_CurrCode': 'VND',
        'vnp_TxnRef': orderId,
        'vnp_OrderInfo': 'Thanh toan don hang',
        'vnp_OrderType': 'other',
        'vnp_Amount': amount,
        'vnp_ReturnUrl': returnUrl,
        'vnp_IpAddr': ipAddr,
        'vnp_CreateDate': createDate,
        'vnp_ExpireDate': createDate + '10000',
    };

    vnpParams = sortObject(vnpParams);

    const signData = querystring.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const secureHash = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnpParams['vnp_SecureHash'] = secureHash;

    const paymentUrl = vnpUrl + '?' + querystring.stringify(vnpParams, { encode: false });
    res.status(200).json({ paymentUrl });
};

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach(key => {
        sorted[key] = obj[key];
    });
    return sorted;
}
