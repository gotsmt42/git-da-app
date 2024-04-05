import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid"; // for dayClick
import Swal from "sweetalert2";
import axios from "axios"; // Import Axios library
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component

import { faBell, faLineChart, faPersonDotsFromLine } from "@fortawesome/free-solid-svg-icons"; // Import ไอคอนต่างๆ

import EventService from "../../services/EventService";

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  event: {
    fontSize: 16,
    marginBottom: 5,
  },
});

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [defaultTextColor, setDefaultTextColor] = useState("#FFFFFF"); // สีข้อความเริ่มต้น
  const [defaultBackgroundColor, setDefaultBackgroundColor] =
    useState("#FF638E"); // สีพื้นหลังเริ่มต้น
  const [defaultFontSize, setDefaultFontSize] = useState(12); // สีพื้นหลังเริ่มต้น

  // Function to generate PDF content from calendar events
  const generatePdfContent = (events) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Event Calendar</Text>
          {events.map((event) => (
            <Text key={event.id} style={styles.event}>
              Title: {event.title}, Date: {event.date}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );

  const handleExportPdf = () => {
    const pdfContent = generatePdfContent(events); // สร้างเนื้อหา PDF
    // สร้าง URL สำหรับเปิดไฟล์ PDF
    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    // เปิดไฟล์ PDF ในหน้าต่างใหม่
    window.open(url);
  };

  useEffect(() => {
    fetchEventsFromDB(); // Fetch events when component mounts
  }, []);

  // Function to save event to database
  const saveEventToDB = async (newEvent) => {
    try {
      // Send POST request to API endpoint
      await EventService.AddEvent(newEvent);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  // Function to fetch events from database
  const fetchEventsFromDB = async () => {
    try {
      const res = await EventService.getEvents();

      const eventsWithId = res.userEvents.map((event) => ({
        ...event,
        id: event._id, // Assuming the ID field is named _id in the database
      }));
      setEvents(eventsWithId); // Update local state with events from database
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDateClick = (arg) => {
    Swal.fire({
      title: "Enter details for your event:",
      html: `
        <label for="fontSize">Font Size:</label><br>
        <select id="fontSize" class="swal2-input">
        
          <option selected>${defaultFontSize}</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12" >12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="22">22</option>
          <option value="24">24</option>
          <option value="26">26</option>
          <option value="28">28</option>
          <option value="36">36</option>
          <option value="48">48</option>
          <option value="72">72</option>
        </select><br><br>

        <label for="textColorPicker">Text Color:</label><br>
        <input id="textColorPicker" type="color" value="${defaultTextColor}" style="margin-bottom: 1rem;"><br>
  
        <label for="backgroundColorPicker">Background Color:</label><br>
        <input id="backgroundColorPicker" type="color" value="${defaultBackgroundColor}" style="margin-bottom: 1rem;"><br>
  
  
        <input id="eventTitle" type="text" class="swal2-input" placeholder="Event Title">
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const textColorPicker =
          Swal.getPopup().querySelector("#textColorPicker");
        textColorPicker.setAttribute("value", defaultTextColor);
        const backgroundColorPicker = Swal.getPopup().querySelector(
          "#backgroundColorPicker"
        );
        backgroundColorPicker.setAttribute("value", defaultBackgroundColor);
      },
      preConfirm: () => {
        const title = document.getElementById("eventTitle").value;
        const backgroundColor = document.getElementById(
          "backgroundColorPicker"
        ).value;
        const textColor = document.getElementById("textColorPicker").value;
        const fontSize = document.getElementById("fontSize").value;
        if (!title) {
          Swal.showValidationMessage("Please enter a title");
        }
        return { title, backgroundColor, textColor, fontSize };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { title, backgroundColor, textColor, fontSize } = result.value;
        const newEvent = {
          id: generateId(),
          title,
          date: arg.dateStr,
          backgroundColor,
          textColor,
          fontSize,
        };
        setEvents([...events, newEvent]); // Update local state
        await saveEventToDB(newEvent); // Save event to database
        setDefaultTextColor(textColor);
        setDefaultBackgroundColor(backgroundColor);
        setDefaultFontSize(fontSize);
        fetchEventsFromDB(); // Fetch events from database
      }
    });
  };

  const handleEventClick = (eventInfo) => {
    const inputBackgroundColor = document.createElement("input");
    inputBackgroundColor.type = "color";
    inputBackgroundColor.value = eventInfo.event.backgroundColor;

    const inputTextColor = document.createElement("input");
    inputTextColor.type = "color";
    inputTextColor.value = eventInfo.event.textColor;

    const eventId = eventInfo.event.id;
    const eventTitle = eventInfo.event.title;
    const eventFontSize = eventInfo.event.extendedProps.fontSize;

    Swal.fire({
      title: "Edit Event",
      html: `
        <label for="editTitle">Title:</label><br>
        <input id="editTitle" class="swal2-input" type="text" value="${eventTitle}" style="margin-bottom: 1rem;"><br>
  
        <label for="editFontSize">Font Size:</label><br>
        <select id="editFontSize" class="swal2-input">
          <option value="${eventFontSize}">${eventFontSize}</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="22">22</option>
          <option value="24">24</option>
          <option value="26">26</option>
          <option value="28">28</option>
          <option value="36">36</option>
          <option value="48">48</option>
          <option value="72">72</option>
        </select><br><br>
  
        <label for="editBackgroundColor">Background Color:</label><br>
        <div id="backgroundColorPickerContainer"></div><br>
  
        <label for="editTextColor">Text Color:</label><br>
        <div id="textColorPickerContainer"></div><br>
  
        
      `,
      didOpen: () => {
        document
          .getElementById("backgroundColorPickerContainer")
          .appendChild(inputBackgroundColor);
        document
          .getElementById("textColorPickerContainer")
          .appendChild(inputTextColor);
      },
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#0ECC00",
      confirmButtonText: "Save Update",
      denyButtonText: `Delete Event`,
      preConfirm: () => {
        const title = document.getElementById("editTitle").value;
        const textColor = inputTextColor.value;
        const backgroundColor = inputBackgroundColor.value;
        const fontSize = document.getElementById("editFontSize").value;

        if (!title) {
          Swal.showValidationMessage("Please enter a title");
        }

        return { id: eventId, title, textColor, backgroundColor, fontSize };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { id, title, textColor, backgroundColor, fontSize } =
          result.value;
        const updatedEvent = {
          title,
          textColor,
          backgroundColor,
          fontSize,
        };

        await EventService.UpdateEvent(id, updatedEvent);

        const updatedEvents = events.map((event) =>
          event.id === id ? { ...updatedEvent } : event
        );
        setEvents(updatedEvents);

        fetchEventsFromDB();

        Swal.fire({
          title: "Updated Successfully",
          icon: "success",
          showConfirmButton: false,

          timer: 1000,
        });
      } else if (result.isDenied) {
        handleDeleteEvent(eventInfo.event.id);
      }
    });
  };

  const generateId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const handleDeleteEvent = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Send DELETE request to server with event ID
          await EventService.DeleteEvent(id);
          // Update events state after deletion
          const updatedEvents = events.filter((event) => event._id !== id);
          setEvents(updatedEvents);
          fetchEventsFromDB();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleLineNotify = () => {
    try {
      Swal.fire({
        title: "ส่งแจ้งเตือนการอัพเดต",
        text: "ส่งแจ้งเตือนการอัพเดตตารางแผนงานไปที่ Line Notify",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await EventService.LineNotify();
          Swal.fire({
            title: "ส่งแจ้งเตือน Line สำเร็จ!",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-success " onClick={handleLineNotify}>
        <FontAwesomeIcon icon={faBell} /> ส่งแจ้งเตือนอัพเดตผ่าน LINE 
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        events={events}
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <div
            style={{
              backgroundColor: eventInfo.event.backgroundColor,
              color: eventInfo.event.textColor,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "5px",
              marginRight: "5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                padding: "5px",
                fontSize: eventInfo.event.extendedProps.fontSize, // ใช้ fontSize ที่มาจาก extendedProps
              }}
            >
              {eventInfo.event.title}
            </span>
          </div>
        )}
        eventClick={handleEventClick}
        headerToolbar={{
          start: "title",
          center: "",
          end: "today prev,next",
        }}
        dayMaxEventRows={window.innerWidth >= 576 ? 4 : 0}
        views={{
          dayGridMonth: {
            dayMaxEventRows: window.innerWidth >= 576 ? 4 : 0,
          },
          timeGridWeek: {
            dayMaxEventRows: window.innerWidth >= 576 ? 4 : 0,
          },
          timeGridDay: {
            dayMaxEventRows: window.innerWidth >= 576 ? 4 : 0,
          },
        }}
      />
    </div>
  );
}

export default EventCalendar;
