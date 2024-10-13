import React, { useState, useEffect } from "react";

const parseVietnameseDate = (dateString) => {
    const months = {
        "tháng 1,": "01", "tháng 2,": "02", "tháng 3,": "03", "tháng 4,": "04",
        "tháng 5,": "05", "tháng 6,": "06", "tháng 7,": "07", "tháng 8,": "08",
        "tháng 9,": "09", "tháng 10,": "10", "tháng 11,": "11", "tháng 12,": "12"
    }

    let dateParts = dateString.replace(/^\w+,/, '').trim().split(' ');

    let day = dateParts[2];
    let month = months[`${dateParts[3]} ${dateParts[4]}`]; // Chuyển tháng từ chuỗi sang số
    let year = dateParts[5];

    let formattedDate = `${year}-${month}-${day}`
    return new Date(formattedDate);
}

const DateDifference = ({ dateStart, dateEnd }) => {
    const [daysDiff, setDaysDiff] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (dateStart && dateEnd) {
            const startDate = parseVietnameseDate(dateStart);
            const endDate = parseVietnameseDate(dateEnd);
            const currentDate = new Date()

            const timeDiff = endDate - currentDate;
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            setDaysDiff(daysDiff);

            if (daysDiff <= 0) {
                setStatus("Đã hết hạn");
            } else if (daysDiff < 10) {
                setStatus("Sắp hết hạn");
            } else {
                setStatus(""); // Không có thông báo nếu không nằm trong hai điều kiện trên
            }
        }
    }, [dateStart, dateEnd]);

    return (
        <div>
            {daysDiff !== null ? (
                <p>{daysDiff} Ngày</p>
            ) : (
                <p>Đang tính toán...</p>
            )}
            {status && <p>{status}</p>}
        </div>
    );
};

export default DateDifference;
