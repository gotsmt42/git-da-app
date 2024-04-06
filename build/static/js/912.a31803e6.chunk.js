(self.webpackChunkda_app=self.webpackChunkda_app||[]).push([[912],{1120:(e,t,o)=>{"use strict";o.d(t,{c:()=>n});const n=o(8372).c.create({baseURL:"http://localhost:5000/api",headers:{Accept:"application/json","X-API-Key":"your_api_key","X-Secret":"API_secret_key"}})},5800:(e,t,o)=>{"use strict";o.d(t,{c:()=>i});var n=o(1120);const i={async getUserData(){const e=localStorage.getItem("token");if(e)try{n.c.defaults.headers.common.Authorization="Bearer ".concat(e);return(await n.c.get("/auth/user")).data}catch(t){throw console.error("Error fetching user data:",t),t}},async UpdateUser(e,t){const o=localStorage.getItem("token");try{if(o){const o=await n.c.put("/auth/user/".concat(e),t);return console.log("Update User data",o.data),o.data.user}}catch(i){throw console.error("Error updating user data:",i),i}}}},992:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>C});var n=o(9060),i=o(1782),r=o(6444),a=o(9016),l=o(336),c=o(9012),s=o.n(c),d=o(3415),u=o(9500),p=o(6584),v=o(1120),f=o(5800);const g={async getEvents(){try{if(await f.c.getUserData()){return(await v.c.get("/events")).data}}catch(e){throw console.error("Error fetching user events:",e),e}},async LineNotify(){try{await f.c.getUserData()&&await v.c.get("/events/linenotify")}catch(e){throw console.error("Error fetching user linenotify:",e),e}},async AddEvent(e){try{if(await f.c.getUserData()){return(await v.c.post("/events",e)).data.events}}catch(t){throw console.error("Error fetching Event:",t),t}},async UpdateEvent(e,t){try{if(await f.c.getUserData()){return(await v.c.put("/events/".concat(e),t)).data}}catch(o){throw console.error("Error fetching user event:",o),o}},async DeleteEvent(e){try{if(await f.c.getUserData()){const t=await v.c.delete("/events/".concat(e));console.log("Delete Event Success",t.data)}}catch(t){throw console.error("Error Delete event:",t),t}}};var h=o(2496);d.Un.create({page:{flexDirection:"row",backgroundColor:"#ffffff",padding:10},section:{margin:10,padding:10,flexGrow:1},title:{fontSize:24,marginBottom:10},event:{fontSize:16,marginBottom:5}});const y=function(){const[e,t]=(0,n.useState)([]),[o,c]=(0,n.useState)("#FFFFFF"),[d,v]=(0,n.useState)("#FF638E"),[f,y]=(0,n.useState)(12);(0,n.useEffect)((()=>{C()}),[]);const C=async()=>{try{const e=(await g.getEvents()).userEvents.map((e=>({...e,id:e._id})));t(e)}catch(e){console.error("Error fetching events:",e)}},m=()=>"_"+Math.random().toString(36).substr(2,9),b=o=>{try{s().fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!"}).then((async n=>{if(n.isConfirmed){await g.DeleteEvent(o);const n=e.filter((e=>e._id!==o));t(n),C(),s().fire({title:"Deleted!",text:"Your file has been deleted.",icon:"success"})}}))}catch(n){console.error("Error deleting event:",n)}};return(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{className:"mb-3",children:(0,h.jsxs)("button",{className:"btn btn-success ",onClick:()=>{try{s().fire({title:"\u0e2a\u0e48\u0e07\u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15",text:"\u0e2a\u0e48\u0e07\u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e01\u0e32\u0e23\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15\u0e15\u0e32\u0e23\u0e32\u0e07\u0e41\u0e1c\u0e19\u0e07\u0e32\u0e19\u0e44\u0e1b\u0e17\u0e35\u0e48 Line Notify",icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Confirm"}).then((async e=>{e.isConfirmed&&(await g.LineNotify(),s().fire({title:"\u0e2a\u0e48\u0e07\u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19 Line \u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08!",icon:"success"}))}))}catch(e){console.error("Error deleting event:",e)}},children:[(0,h.jsx)(u.u,{icon:p.Yrq})," \u0e2a\u0e48\u0e07\u0e41\u0e08\u0e49\u0e07\u0e40\u0e15\u0e37\u0e2d\u0e19\u0e2d\u0e31\u0e1e\u0e40\u0e14\u0e15\u0e1c\u0e48\u0e32\u0e19 LINE"]})}),(0,h.jsx)(i.c,{plugins:[r.c,a.cp,l.c],initialView:"dayGridMonth",selectable:!0,events:e,dateClick:n=>{s().fire({title:"Enter details for your event:",html:'\n        <label for="fontSize">Font Size:</label><br>\n        <select id="fontSize" class="swal2-input">\n        \n          <option selected>'.concat(f,'</option>\n          <option value="8">8</option>\n          <option value="9">9</option>\n          <option value="10">10</option>\n          <option value="11">11</option>\n          <option value="12" >12</option>\n          <option value="14">14</option>\n          <option value="16">16</option>\n          <option value="18">18</option>\n          <option value="20">20</option>\n          <option value="22">22</option>\n          <option value="24">24</option>\n          <option value="26">26</option>\n          <option value="28">28</option>\n          <option value="36">36</option>\n          <option value="48">48</option>\n          <option value="72">72</option>\n        </select><br><br>\n\n        <label for="textColorPicker">Text Color:</label><br>\n        <input id="textColorPicker" type="color" value="').concat(o,'" style="margin-bottom: 1rem;"><br>\n  \n        <label for="backgroundColorPicker">Background Color:</label><br>\n        <input id="backgroundColorPicker" type="color" value="').concat(d,'" style="margin-bottom: 1rem;"><br>\n  \n  \n        <input id="eventTitle" type="text" class="swal2-input" placeholder="Event Title">\n      '),showCancelButton:!0,confirmButtonText:"Save",cancelButtonText:"Cancel",didOpen:()=>{s().getPopup().querySelector("#textColorPicker").setAttribute("value",o);s().getPopup().querySelector("#backgroundColorPicker").setAttribute("value",d)},preConfirm:()=>{const e=document.getElementById("eventTitle").value,t=document.getElementById("backgroundColorPicker").value,o=document.getElementById("textColorPicker").value,n=document.getElementById("fontSize").value;return e||s().showValidationMessage("Please enter a title"),{title:e,backgroundColor:t,textColor:o,fontSize:n}}}).then((async o=>{if(o.isConfirmed){const{title:i,backgroundColor:r,textColor:a,fontSize:l}=o.value,s={id:m(),title:i,date:n.dateStr,backgroundColor:r,textColor:a,fontSize:l};t([...e,s]),await(async e=>{try{await g.AddEvent(e)}catch(t){console.error("Error saving event:",t)}})(s),c(a),v(r),y(l),C()}}))},eventContent:e=>(0,h.jsx)("div",{style:{backgroundColor:e.event.backgroundColor,color:e.event.textColor,display:"flex",justifyContent:"space-between",alignItems:"center",marginLeft:"5px",marginRight:"5px",overflow:"hidden",textOverflow:"ellipsis"},children:(0,h.jsx)("span",{style:{whiteSpace:"nowrap",padding:"5px",fontSize:e.event.extendedProps.fontSize},children:e.event.title})}),eventClick:o=>{const n=document.createElement("input");n.type="color",n.value=o.event.backgroundColor;const i=document.createElement("input");i.type="color",i.value=o.event.textColor;const r=o.event.id,a=o.event.title,l=o.event.extendedProps.fontSize;s().fire({title:"Edit Event",html:'\n        <label for="editTitle">Title:</label><br>\n        <input id="editTitle" class="swal2-input" type="text" value="'.concat(a,'" style="margin-bottom: 1rem;"><br>\n  \n        <label for="editFontSize">Font Size:</label><br>\n        <select id="editFontSize" class="swal2-input">\n          <option value="').concat(l,'">').concat(l,'</option>\n          <option value="8">8</option>\n          <option value="9">9</option>\n          <option value="10">10</option>\n          <option value="11">11</option>\n          <option value="12">12</option>\n          <option value="14">14</option>\n          <option value="16">16</option>\n          <option value="18">18</option>\n          <option value="20">20</option>\n          <option value="22">22</option>\n          <option value="24">24</option>\n          <option value="26">26</option>\n          <option value="28">28</option>\n          <option value="36">36</option>\n          <option value="48">48</option>\n          <option value="72">72</option>\n        </select><br><br>\n  \n        <label for="editBackgroundColor">Background Color:</label><br>\n        <div id="backgroundColorPickerContainer"></div><br>\n  \n        <label for="editTextColor">Text Color:</label><br>\n        <div id="textColorPickerContainer"></div><br>\n  \n        \n      '),didOpen:()=>{document.getElementById("backgroundColorPickerContainer").appendChild(n),document.getElementById("textColorPickerContainer").appendChild(i)},showDenyButton:!0,showCancelButton:!0,confirmButtonColor:"#0ECC00",confirmButtonText:"Save Update",denyButtonText:"Delete Event",preConfirm:()=>{const e=document.getElementById("editTitle").value,t=i.value,o=n.value,a=document.getElementById("editFontSize").value;return e||s().showValidationMessage("Please enter a title"),{id:r,title:e,textColor:t,backgroundColor:o,fontSize:a}}}).then((async n=>{if(n.isConfirmed){const{id:o,title:i,textColor:r,backgroundColor:a,fontSize:l}=n.value,c={title:i,textColor:r,backgroundColor:a,fontSize:l};await g.UpdateEvent(o,c);const d=e.map((e=>e.id===o?{...c}:e));t(d),C(),s().fire({title:"Updated Successfully",icon:"success",showConfirmButton:!1,timer:1e3})}else n.isDenied&&b(o.event.id)}))},headerToolbar:{start:"title",center:"",end:"today prev,next"},dayMaxEventRows:window.innerWidth>=576?4:0,views:{dayGridMonth:{dayMaxEventRows:window.innerWidth>=576?4:0},timeGridWeek:{dayMaxEventRows:window.innerWidth>=576?4:0},timeGridDay:{dayMaxEventRows:window.innerWidth>=576?4:0}}})]})},C=()=>(0,h.jsx)("div",{className:"container",children:(0,h.jsx)(y,{})})},9392:()=>{}}]);
//# sourceMappingURL=912.a31803e6.chunk.js.map