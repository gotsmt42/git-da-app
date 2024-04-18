import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useRef, useEffect } from "react";

const FullLayout = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // ตรวจสอบว่าคลิกอยู่นอกเหนือจาก contentArea
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };

    // เพิ่ม event listener เมื่อ component ถูก mount
    document.addEventListener("mousedown", handleOutsideClick);

    // ถอด event listener เมื่อ component ถูก unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const closeSidebar = () => {
    document.getElementById("sidebarArea").classList.remove("showSidebar");
  };

  return (
    <main>
      {/* Header */}
      <div >

        <div  className="header-fixed">
        <Header />
        </div>
      

        <div className="pageWrapper d-lg-flex">
          {/* Sidebar */}
          <aside className="sidebarArea shadow" id="sidebarArea" ref={sidebarRef}>
            <Sidebar />
          </aside>

          {/* Content Area */}
          <div className="contentArea" onClick={closeSidebar}>
            {/* Middle Content */}
            <Container className="p-4" fluid>
              <Outlet />
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
