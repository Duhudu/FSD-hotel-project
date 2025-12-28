import React, { use, useEffect, useState } from "react";
import { homePageApiCalls } from "../APIs/homeAPI"
import Swal from "sweetalert2";
import GuestDropdown from "../components/UserHomeRoomPage/GuestDropdown";
import RoomCard from "../components/UserHomeRoomPage/RoomCard";
import {roomFilterService} from "../components/UserHomeRoomPage/roomFilters"
function UserRoomPage() {
  //rooms object
  const [rooms, setRooms] = useState([]);
  //for filter
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userSelectedType, setUserSelectedType] = useState("");
  const [userSelectedLocation, setUserSelectedLocation] = useState("");

  //total customers 
  const [totalCustomers, setTotalCustomers] = useState(2);

  //dropdown data
  //Room Type
  const roomTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "Deluxe Collection", label: "Deluxe Collection" },
    { value: "Executive Suites", label: "Executive Suites" },
    { value: "Standard Collection", label: "Standard Collection" },
  ];
  //Room Loaction
  const roomLocationOptions = [
    { value: "", label: "Select Location" },
    { value: "Kandy", label: "Kandy" },
    { value: "Colombo", label: "Colombo" },
  ];
  //handle the dropdown inputs 
  const handleDropDown = (e) => {
    if(e.target.name !== "Select"){
      if (e.target.name === "roomType") {
      setUserSelectedType(e.target.value);
      } else if (e.target.name === "location") {
        setUserSelectedLocation(e.target.value);
      }
    }
    
  }

  //Load Data 
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const response = await homePageApiCalls.getRooms();
        console.log("Room list from backend: ", response);
        let roomList = [];

        if (Array.isArray(response.data)) {
          roomList =  response.data
        } else if (Array.isArray(response.data.rooms)) {
          roomList = response.data.rooms;
        } else if (Array.isArray(response.data.data)) {
          roomList = response.data.data;
        }
        console.log("Final room list:", roomList);
        setRooms(roomList);

      } catch (error) {
        alert("Failed to load rooms from service.");
      }
    };
    loadRooms();
  }, []);

const deluxeData = roomFilterService.getDeluxeRooms(rooms,userSelectedType, userSelectedLocation, totalCustomers);  
console.log("deluxeData:", deluxeData);
console.log("deluxeData length:", deluxeData?.length);
const executiveData = roomFilterService.getExecutiveRooms(rooms,userSelectedType, userSelectedLocation, totalCustomers);
console.log("executive:", executiveData);
console.log("executiveData length:", executiveData?.length);
const standardData = roomFilterService.getStandardRooms(rooms, userSelectedType,userSelectedLocation, totalCustomers);
console.log("executive:", standardData);
console.log("executiveData length:", standardData?.length);
  return (
    <div className="mainDivUserRoomsPage">
      <div className="roomsCardDiv">
        <h2>Room Page</h2>
        {/**Filter dropdown section */}
        <div className="dropdownFilter">
          <div className="dropdown-Type">
            <label>Type</label>
            <select name="roomType" value={userSelectedType} onChange={handleDropDown}>
              {roomTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-Location">
            <label>Location</label>
            <select
              name="location"
              value={userSelectedLocation}
              onChange={handleDropDown}
            >
              {roomLocationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <GuestDropdown onTotalChange={setTotalCustomers} />
            <p>Current Total in Parent State: {totalCustomers}</p>
          </div>
        </div>
        {/* Room Card logic Section */}
        
        {/**Deluxe Collection section */}
       <div>
        <h3>Deluxe Collection</h3>
        {
          deluxeData.length > 0 ? (
            deluxeData.map(room => <RoomCard key={room._id} data={room}/>)
          ) : (
            <label>No Data</label>
          )
        }
          {/**  {deluxeData.length > 0 && deluxeData.map(room => <RoomCard key={room._id} data={room}/>)}*/}
      </div>
        {/**Executive Suites */}
        <div>
          <h3>Executive Suites</h3>
          {
            executiveData.length > 0 ? (
              executiveData.map(room => <RoomCard key={room._id} data={room}/>)
            ) :(
              <label>No Data</label>
            )
          }
          
          {/**{executiveData.length > 0 && executiveData.map(room => <RoomCard key={room._id} data={room}/>)}*/}
        
        </div>      
        <div>
          {/**Standard Collection Section*/}
          <h3>Standard Collection</h3>
          {
            standardData.length > 0 ? (
              standardData.map(room => <RoomCard key={room._id} data={room} />)
            ) : (
              <label>No Data</label>
            )
          }
        </div>
      </div>

    </div>
  )
}

export default UserRoomPage
