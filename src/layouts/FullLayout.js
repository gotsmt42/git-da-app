// FullLayout.js

import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // State เพื่อติดตามสถานะโหมด mobile

  useEffect(() => {

    const handleOutsideClick = (e) => {
      // ตรวจสอบว่าคลิกอยู่นอกเหนือจาก contentArea
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };


    const checkIsMobile = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 768); // ตั้งค่าให้เป็น mobile เมื่อหน้าจอน้อยกว่าหรือเท่ากับ 768px
    };
    checkIsMobile(); // เรียกฟังก์ชันเมื่อโหลดหน้าเว็บ

   // เพิ่ม event listener เมื่อ component ถูก mount
   document.addEventListener("mousedown", handleOutsideClick);

   // ถอด event listener เมื่อ component ถูก unmount
   return () => {
     document.removeEventListener("mousedown", handleOutsideClick);
   };
  }, []);

  

  const closeSidebar = () => {
    if (isMobile) {
      document.getElementById("sidebarArea").classList.remove("showSidebar");
    }
  };

  const handleMenuClick = () => {
    closeSidebar(); // เมื่อคลิกที่เมนูให้ปิด Slidebar
  };

  return (
    <main>
      {/* Header */}
      <div className="header-fixed">
        <Header />
      </div>
      
      <div className="pageWrapper d-lg-flex">
        {/* Sidebar */}
        <aside className={`sidebarArea shadow ${isMobile ? "" : "showSidebar"}`} id="sidebarArea" ref={sidebarRef}>
          <Sidebar handleMenuClick={handleMenuClick} />
        </aside>

        {/* Content Area */}
        <div className="contentArea" onClick={isMobile ? closeSidebar : null}>
          {/* Middle Content */}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
