const axios = require("axios");

module.exports = async (uploadedFiles) => {
    const totalFiles = uploadedFiles.length;
    const maxLinesPerMessage = 15;

    // แบ่งรายชื่อไฟล์ออกเป็นกลุ่ม
    let message = `\nมีการอัปโหลดไฟล์เข้ามาจำนวน ${totalFiles} ไฟล์คือ:\n`;
    let lines = 0;
    for (const [index, file] of uploadedFiles.entries()) {
        message += `\n${index + 1}. ${file.filename}\n`; // เพิ่มจำนวน index ข้างหน้า filename
        lines++;
        if (lines >= maxLinesPerMessage) {
            await sendLineNotification(`\n${message}`);
            message = ''; // รีเซ็ตข้อความ
            lines = 0; // รีเซ็ตจำนวนบรรทัด
        }
    }

    // ส่งข้อความที่เหลือ
    if (message.trim() !== '') {
        await sendLineNotification(`\n${message}`);
    }
}

async function sendLineNotification(message) {
    const url_line_notification = "https://notify-api.line.me/api/notify";
    const footer = "\nข้อความนี้ถูกส่งโดยระบบแจ้งเตือนอัปโหลดไฟล์สำหรับข้อมูลเพิ่มเติมกรุณาเข้าชมที่: http://localhost:3000/files";

    // เพิ่ม footer ในข้อความ
    message += footer;

    // ส่งข้อความผ่าน Line Notify
    await axios.post(url_line_notification, null, {
        params: {
            message: message,
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${process.env.APP_TOKEN_LINE_NOTIFY}`,
        },
    });
}
