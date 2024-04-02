import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/authService";
import { useAuth } from "../auth/AuthContext";

import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
// import Logo from "./Logo";
// import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";
import { swalLogout } from "../functions/user";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

import API from "../API/axiosInstance";

const Header = () => {
  const [modalOpenEdit, setModalOpenEdit] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const { logout } = useAuth();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserData();
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const getUserData = async () => {
    const getUser = await AuthService.getUserData();
    setUser(getUser.user);
  };


  const handleLogout = async () => {
    await swalLogout().then((result) => {
      if (result.isConfirmed) {
        logout();

        Swal.fire("Logout Success!", "", "success");
      }
    });
  };

  return (
    <Navbar
      style={{ backgroundColor: "#FF638E" }}
      dark
      expand="md"
      className="fix-header"
    >
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">{/* <Logo /> */}</div>
        <NavbarBrand href="/">
          <h2>Logo</h2>

          {/* <LogoWhite className=" d-lg-none" /> */}
        </NavbarBrand>
        <Button
          style={{ backgroundColor: "#FF638E" }}
          className=" d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          style={{ backgroundColor: "#FF638E" }}
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/starter" className="nav-link">
              Starter
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Menu
            </DropdownToggle>
            <DropdownMenu end>
              <Link to="/files" style={{ textDecoration: "none" }}>
                <DropdownItem>Files </DropdownItem>
              </Link>
              <Link to="/product" style={{ textDecoration: "none" }}>
                <DropdownItem>Product </DropdownItem>
              </Link>
              <DropdownItem divider />
              <a href="/starter" style={{ textDecoration: "none" }}>
                <DropdownItem>Reset</DropdownItem>
              </a>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={`${API.defaults.baseURL}/${user.imageUrl}`}
              alt="profile"
              className="rounded-circle"
              width="30"
              height="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <Link to={"/account"} style={{ textDecoration: "none" }}>
              <DropdownItem>My Account</DropdownItem>
            </Link>

            <DropdownItem divider />
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
