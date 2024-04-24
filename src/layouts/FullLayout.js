// FullLayout.js

import React, { useRef, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  const sidebarRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // State เพื่อติดตามสถานะโหมด mobile
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // เพิ่ม event listener สำหรับ scroll
  
    return () => {
      window.removeEventListener("scroll", handleScroll); // ถอด event listener เมื่อ component ถูก unmount
    };
  }, []); // ให้ useEffect ทำงานเมื่อ component โหลดครั้งแรกเท่านั้น
  
  // ใช้ตรวจสอบค่า isScrolled และใส่คลาส CSS ตามที่ต้องการใน Header
  const headerClass = isScrolled ? "stickyHeader" : "";


  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 0); // ตรวจสอบว่ามีการเลื่อนหน้าจอไหม
  };
  

  return (
    <main>
      {/* Header */}
      <div className={`header ${headerClass}`}>
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
