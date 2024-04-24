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

import API from "../API/axiosInstance";

const Header = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const getUser = await AuthService.getUserData();
        setUser(getUser.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".navbar")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await swalLogout().then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logout Success!", "", "success");
      }
    });
  };

  return (
    <Navbar dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">{/* <Logo /> */}</div>

        <NavbarBrand tag={Link} to="/dashboard">
          <div class="gradiant-bg">
            <h2>Logo App</h2>
          </div>
        </NavbarBrand>

        <Button
          style={{
            backgroundColor: "transparent", // กำหนดให้พื้นหลังเป็นโปร่งใส

            border: "none",
          }}
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          style={{
            backgroundColor: "transparent", // กำหนดให้พื้นหลังเป็นโปร่งใส

            border: "none",
          }}
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
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/event" className="nav-link">
              Event
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
                <DropdownItem>Files</DropdownItem>
              </Link>
              <Link to="/product" style={{ textDecoration: "none" }}>
                <DropdownItem>Product</DropdownItem>
              </Link>
              <DropdownItem divider />
              <Link to="/dashboard" style={{ textDecoration: "none" }}>
                <DropdownItem>Reset</DropdownItem>
              </Link>
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
            />
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
