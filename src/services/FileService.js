// productService.js
import API from "../API/axiosInstance";
import AuthService from "./authService";

const FileService = {
  async getUserFiles() {
    try {
      const userData = await AuthService.getUserData(); // ดึงข้อมูลผู้ใช้และ Token
      if (userData) {
        const response = await API.get(`/files`); // เรียกข้อมูลไฟล์ของผู้ใช้
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user files:", error);
      throw error;
    }
  },

  async uploadFiles(acceptedFiles) {
    try {
      const userData = await AuthService.getUserData();
      if (userData) {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append("files", file); // ส่งไฟล์ผ่านฟิลด์ที่ชื่อ "files" แทน "file"
        });
        const response = await API.post(`/files`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }); // อัปโหลดไฟล์
        return response.data;
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  },

  async deleteFile(fileId) {
    try {
      const userData = await AuthService.getUserData(); // ดึงข้อมูลผู้ใช้และ Token
      if (userData) {
        const response = await API.delete(`/files/${fileId}`); // ลบไฟล์
        console.log("Delete File Success", response.data);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  },
};

export default FileService;
