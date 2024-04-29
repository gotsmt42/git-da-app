import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import timeGridPlugin from "@fullcalendar/timegrid"; // for dayClick
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import listPlugin from "@fullcalendar/list";

import Swal from "sweetalert2";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component

import { faBell } from "@fortawesome/free-solid-svg-icons"; // Import ไอคอนต่างๆ

import EventService from "../../services/EventService";
import moment from "moment";

function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [defaultAllDay, setdefaultAllDay] = useState(true); // สีข้อความเริ่มต้น
  const [defaultTextColor, setDefaultTextColor] = useState("#FFFFFF"); // สีข้อความเริ่มต้น
  const [defaultBackgroundColor, setDefaultBackgroundColor] =
    useState("#FF638E"); // สีพื้นหลังเริ่มต้น
  const [defaultFontSize, setDefaultFontSize] = useState(12); // สีพื้นหลังเริ่มต้น

  const calendarRef = useRef(null); // Reference to access FullCalendar component

  useEffect(() => {
    fetchEventsFromDB(); // Fetch events when component mounts
  }, []);

  const saveEventToDB = async (newEvent) => {
    try {
      await EventService.AddEvent(newEvent);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const fetchEventsFromDB = async () => {
    try {
      const res = await EventService.getEvents();
      const eventsWithId = res.userEvents.map((event) => ({
        ...event,
        id: event._id,
      }));
      setEvents(eventsWithId);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = (arg) => {
    Swal.fire({
      title: "Enter details for your event:",
      html: `
        <label for="fontSize">Font Size:</label><br>
        <select id="fontSize" class="swal2-input">
        
          <option selected disabled>${defaultFontSize}</option>
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
  
        <label for="start">Start:</label><br>
        <input id="start" type="date" class="swal2-input" value="${arg.dateStr}" style="margin-bottom: 1rem;"><br>
  
        <label for="end">End:</label><br>
        <input id="end" type="date" class="swal2-input"  value="${arg.dateStr}" style="margin-bottom: 1rem;"><br>

        <label for="fontSize">All-Day: </label><br>
        <select id="allDay" class="swal2-select">
        
          <option value="${defaultAllDay}">${defaultAllDay}</option>
          <option value="false">False</option>
         
        </select><br><br>


  
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
        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;

        // const startTime = document.getElementById("startTime").value;
        // const endTime = document.getElementById("endTime").value;

        const title = document.getElementById("eventTitle").value;
        const backgroundColor = document.getElementById(
          "backgroundColorPicker"
        ).value;
        const textColor = document.getElementById("textColorPicker").value;
        const fontSize = document.getElementById("fontSize").value;
        const allDay = document.getElementById("allDay").value;
        if (!title) {
          Swal.showValidationMessage("Please enter a title");
        }

        return {
          title,
          backgroundColor,
          textColor,
          fontSize,
          start,
          end,
          allDay,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {
          title,
          backgroundColor,
          textColor,
          fontSize,
          start,
          end,
          allDay,
        } = result.value;

        const newEnd = moment(end).add(1, "days");
        const newEvent = {
          title,
          date: arg.dateStr,
          backgroundColor,
          textColor,
          fontSize,
          start,
          end: newEnd.format("YYYY-MM-DD"),
          allDay,
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

  const handleEditEvent = (eventInfo) => {
    const inputBackgroundColor = document.createElement("input");
    inputBackgroundColor.type = "color";
    inputBackgroundColor.value = eventInfo.event.backgroundColor;

    const inputTextColor = document.createElement("input");
    inputTextColor.type = "color";
    inputTextColor.value = eventInfo.event.textColor;

    const eventId = eventInfo.event.id;
    const eventTitle = eventInfo.event.title;

    const eventFontSize = eventInfo.event.extendedProps.fontSize;

    const eventStart = moment(eventInfo.event.startStr);
    const eventEnd = moment(eventInfo.event.endStr);

    const eventAllDay = eventInfo.event.allDay;

    let newEnd;

    if (eventStart.isSame(eventEnd, "day")) {
      newEnd = eventEnd;
    } else {
      newEnd = eventEnd.subtract(1, "days"); // ลดวันลง 1 วัน
    }

    Swal.fire({
      title: "Edit Event",
      html: `
        <label for="editTitle">Title : </label><br>
        <input id="editTitle" class="swal2-input" type="text" value="${eventTitle}" 
        style="margin-bottom: 1rem;"><i id="copyEventDetails" title="Copied to clipboard!" class="fas fa-copy"></i>
        
        <br>
  
        <label for="editFontSize">Font Size : </label><br>
        <select id="editFontSize" class="swal2-input">
          <option selected disabled>${eventFontSize}</option>
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
  
        <label for="editBackgroundColor">Background Color : </label><br>
        <div id="backgroundColorPickerContainer"></div><br>
  
        <label for="editTextColor">Text Color : </label><br>
        <div id="textColorPickerContainer"></div><br>
  
        <label for="editStart">Start : </label><br>
        <input id="editStart" type="date" class="swal2-input" value="${eventStart.format(
          "YYYY-MM-DD"
        )}" style="margin-bottom: 1rem;"><br>
  
        <label for="editEnd">End :</label><br>
        <input id="editEnd" type="date" class="swal2-input"  value="${newEnd.format(
          "YYYY-MM-DD"
        )}" style="margin-bottom: 1rem;"><br>
  
        <label for="editAllDay">All-Day : </label><br>
        <select id="editAllDay" class="swal2-select">
          <option selected disabled>${eventAllDay}</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select><br><br>
      `,
      didOpen: () => {
        document
          .getElementById("backgroundColorPickerContainer")
          .appendChild(inputBackgroundColor);
        document
          .getElementById("textColorPickerContainer")
          .appendChild(inputTextColor);

        // สร้างการจัดการเหตุการณ์สำหรับปุ่มคัดลอกรายละเอียด
        document
          .getElementById("copyEventDetails")
          .addEventListener("click", () => {
            const details = `${eventTitle}`;
            copyToClipboard(details);

            Swal.fire({
              title: "Copied",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            });
          });
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
        const start = document.getElementById("editStart").value;
        const end = document.getElementById("editEnd").value;
        const allDay = document.getElementById("editAllDay").value;

        if (!title) {
          Swal.showValidationMessage("Please enter a title");
        }

        const newEnd = moment(end).add(1, "days");

        return {
          id: eventId,
          title,
          textColor,
          backgroundColor,
          fontSize,
          start,
          end: newEnd.format("YYYY-MM-DD"),
          allDay,
        };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const {
          id,
          title,
          textColor,
          backgroundColor,
          fontSize,
          start,
          end,
          allDay,
        } = result.value;

        const updatedEvent = {
          title,
          textColor,
          backgroundColor,
          fontSize,
          start,
          end,
          allDay,
        };

        const updatedEvents = await EventService.UpdateEvent(id, updatedEvent);

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

  const handleEventDrop = async (arg) => {
    const event = arg.event;

    const start = moment(event.startStr);
    const end = moment(event.endStr);

    let newEnd;

    if (start.isSame(end, "day")) {
      newEnd = end;
    } else {
      newEnd = end.subtract(1, "days");
    }

    const updatedEvent = {
      id: event.id,
      title: event.title,
      textColor: event.textColor,
      backgroundColor: event.backgroundColor,
      fontSize: event.extendedProps.fontSize.toString(),
      start: event.startStr,
      end: event.endStr, // ตรวจสอบ allDay ก่อนกำหนด end
      allDay: event.allDay,
    };

    // console.log(updatedEvent.start);
    // console.log(updatedEvent.end);

    try {
      // อัปเดตเหตุการณ์ในฐานข้อมูล

      const updatedEvents = await EventService.UpdateEvent(
        event.id,
        updatedEvent
      );

      // อัปเดต events ใน state ของ React component

      setEvents(updatedEvents);

      // ดึงข้อมูลเหตุการณ์จากฐานข้อมูลอีกครั้งเพื่อให้มั่นใจว่าข้อมูลเป็นปัจจุบัน
      fetchEventsFromDB();

      // แสดงข้อความแจ้งเตือนเมื่ออัปเดตเหตุการณ์สำเร็จ
      // Swal.fire("Event Updated", "", "success");
    } catch (error) {
      console.error("Error updating event:", error);
      // แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการอัปเดตเหตุการณ์
      Swal.fire("Error", "Failed to update event", "error");
    }
  };

  const handleEventResize = async (arg) => {
    const event = arg.event;

    const start = moment(event.startStr);
    const end = moment(event.endStr);

    let newEnd;

    if (start.isSame(end, "day")) {
      newEnd = end; // ใช้ end ตรงๆ เมื่อเริ่มและสิ้นสุดในวันเดียวกัน
    } else {
      newEnd = end;
    }

    const updatedEvent = {
      id: event.id,
      title: event.title,
      textColor: event.textColor,
      backgroundColor: event.backgroundColor,
      fontSize: event.extendedProps.fontSize.toString(),
      start: event.startStr,
      end: event.allDay ? newEnd.format("YYYY-MM-DD") : newEnd.format(), // ตรวจสอบ allDay ก่อนกำหนด end
      allDay: event.allDay,
    };

    const updatedEvents = await EventService.UpdateEvent(
      event.id,
      updatedEvent
    );

    setEvents(updatedEvents);

    console.log(updatedEvent.start);
    console.log(updatedEvent.end);

    console.log(events);

    fetchEventsFromDB();

    // Swal.fire("Event Updated", "", "success");
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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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

  const handleEventDragStart = (arg) => {
    // Check if CTRL key is pressed during event drag
    if (!arg.jsEvent.ctrlKey) {
      return; // Exit if CTRL key is not pressed
    }
    const draggedEvent = arg.event;
    const calendarApi = calendarRef.current.getApi();

    // Clone the event to be dragged
    const clonedEvent = {
      ...draggedEvent.toPlainObject(),
      start: draggedEvent.startStr,
      end: draggedEvent.endStr,
    };

    // Add the cloned event to FullCalendar
    calendarApi.addEvent(clonedEvent);
  };

  // ฟังก์ชันสำหรับการกำหนดรูปแบบเวลาในรูปแบบ 24 ชั่วโมง
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0"); // แสดงชั่วโมงในรูปแบบ 2 ตัวอักษร (00-23)
    const minutes = date.getMinutes().toString().padStart(2, "0"); // แสดงนาทีในรูปแบบ 2 ตัวอักษร (00-59)
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <div className="mb-3">
        <button className="btn btn-success " onClick={handleLineNotify}>
          <FontAwesomeIcon icon={faBell} /> ส่งแจ้งเตือนอัพเดตผ่าน LINE
        </button>
      </div>
      <FullCalendar
        ref={calendarRef}
        timeZone="local"
        plugins={[
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          momentTimezonePlugin,
          listPlugin,
        ]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        dateClick={handleAddEvent}
        eventClick={ondblclick}
        eventDragStart={handleEventDragStart} // Handle event drag start
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        eventContent={(eventInfo) => (
          <div
            style={{
              backgroundColor: eventInfo.event.backgroundColor,
              color: eventInfo.event.textColor,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              style={{
                whiteSpace: "nowrap",
                padding: "5px",
                fontSize: eventInfo.event.extendedProps.fontSize,
              }}
            >
              {eventInfo.event.allDay === false ? (
                <span
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: eventInfo.event.extendedProps.fontSize,
                  }}
                >
                  {moment(eventInfo.event.startStr).format("HH:mm")} -{" "}
                  {moment(eventInfo.event.endStr).format("HH:mm")} -{" "}
                  {eventInfo.event.title}
                </span>
              ) : (
                <span
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: eventInfo.event.extendedProps.fontSize,
                  }}
                >
                  {eventInfo.event.title}
                </span>
              )}
            </span>
          </div>
        )}
        dayMaxEventRows={true}
        views={{
          listWeek: {
            dayMaxEventRows: window.innerWidth >= 576 ? 5 : 0,
          },
          dayGridMonth: {
            dayMaxEventRows: window.innerWidth >= 576 ? 5 : 0,
          },
          timeGridWeek: {
            dayMaxEventRows: window.innerWidth >= 576 ? 5 : 0,
            selectConstraint: "businessHours",
          },
          timeGridDay: {
            dayMaxEventRows: window.innerWidth >= 576 ? 5 : 0,
            selectConstraint: "businessHours",
          },
        }}
      />
    </div>
  );
}

export default EventCalendar;