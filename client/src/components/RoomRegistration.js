import React, { useState, useEffect } from 'react';

function RoomRegistration() {
  const [registrationTime, setRegistrationTime] = useState(null);

  useEffect(() => {
    // Lưu thời gian đăng ký khi component được render
    setRegistrationTime(Date.now());
  }, []);

  // Hàm để tính thời gian còn lại
  const calculateRemainingTime = () => {
    const ONE_MINUTE = 60 * 1000; // 60 giây
    const currentTime = Date.now();
    const elapsedTime = currentTime - registrationTime;
    const remainingTime = ONE_MINUTE - (elapsedTime % ONE_MINUTE);
    return Math.ceil(remainingTime / 1000); // Chuyển đổi sang giây và làm tròn lên
  };

  return (
    <div>
      <p>Thời gian còn lại để hủy đăng ký: {calculateRemainingTime()} giây</p>
      {/* Hiển thị nút hủy đăng ký nếu thời gian còn lại là 0 hoặc âm */}
      {calculateRemainingTime() >= 0 && <button >Hủy đăng ký</button>}
    </div>
  );
}

export default RoomRegistration;
