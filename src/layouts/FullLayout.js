import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  // รับค่า pageTitle ผ่านการ object destructuring

  const closeSidebar = () => {
    document.getElementById("sidebarArea").classList.remove("showSidebar");
  };

  return (
    <main>
      {/* Header */}
      <Header />

      <div className="pageWrapper d-lg-flex">
        {/* Sidebar */}
        <aside className="sidebarArea shadow" id="sidebarArea">
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
    </main>
  );
};

export default FullLayout;
