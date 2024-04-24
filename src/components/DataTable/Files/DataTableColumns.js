import { useState, useEffect } from "react";
import moment from "moment"; // Import moment library for date formatting
import IconButton from "@mui/material/IconButton";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import the download icon

import { styled } from "@mui/material/styles";
import Delete from "@mui/icons-material/Delete";
import CustomCell from "../Files/customCell";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const DataTableColumns = ({
  setSelectedRow,
  handleDeleteRow,
  setSelectedFile,
  downloadFile
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedRowMenu, setSelectedRowMenu] = useState(null);

  const handleClick = (event, row) => {
    setSelectedRowMenu(row);
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setSelectedRowMenu(null);
    setAnchorEl(null);
    setSelectedFile(null);
  };

  // เพิ่ม state เพื่อเก็บค่าหน้าจอขนาดเล็กหรือไม่
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // ตรวจสอบขนาดหน้าจอเมื่อโหลด component
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // เรียกใช้งานเมื่อโหลด component เพื่อตรวจสอบขนาดหน้าจอในครั้งแรก
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = [
    {
      name: "File Name",
      cell: (row) => <CustomCell row={row} isSmallScreen={isSmallScreen} />,
      sortable: true,
      selector: (row) => row.filename, // เพิ่ม selector เพื่อให้สามารถเรียงลำดับได้ตามค่า filename

    },

    {
      name: "Created",
      selector: (row) => moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss"),
      sortable: true,
    },

    {
      cell: (row) => (
        <div>
          <IconButton
            key="icon-button"
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            onClick={(event) => handleClick(event, row)} // ส่ง row ไปยัง handleClick
          >
            <MoreVertIcon />
          </IconButton>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open && selectedRowMenu === row}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                downloadFile(row.path, row.filename); // เรียกใช้งานฟังก์ชัน downloadFile โดยส่งพาธของไฟล์ไปด้วย
                handleClose(); // ปิดเมนูหลังจากการคลิก
              }}
              disableRipple
            >
              <GetAppIcon />
              Download
            </MenuItem>
{/* 
            <Divider sx={{ my: 0.5 }} /> */}
            {/* <MenuItem onClick={handleClose} disableRipple>
              <ArchiveIcon />
              Archive
            </MenuItem> */}
            <MenuItem
              onClick={() => {
                handleDeleteRow(row._id); // เรียกใช้ handleDelete โดยส่ง parameter row._id
                handleClose();
              }}
            >
              <Delete />
              Delete
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <MoreHorizIcon />
              More
            </MenuItem>
           
          </StyledMenu>
        </div>
      ),
      width: "80px",
    },
  ];

  return columns;
};

export default DataTableColumns;
