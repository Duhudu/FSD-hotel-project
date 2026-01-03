import React, { use, useEffect, useState } from "react";
import { homePageApiCalls } from "../../APIs/homeAPI"
import GuestDropdown from "../../components/UserHomeRoomPage/GuestDropdown";
import RoomCard from "../../components/UserHomeRoomPage/RoomCard";
import {roomFilterService} from "../../components/UserHomeRoomPage/roomFilters"

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

  //Check if the user selected anything
  const isFiltering = userSelectedType !== "" || userSelectedLocation !== "" || String(totalCustomers) !== "2";
  //Set filter function to display correct daat to the user
  const deluxeData = roomFilterService.getDeluxeRooms(rooms,userSelectedType, userSelectedLocation, totalCustomers);  
  const executiveData = roomFilterService.getExecutiveRooms(rooms,userSelectedType, userSelectedLocation, totalCustomers);
  const standardData = roomFilterService.getStandardRooms(rooms, userSelectedType,userSelectedLocation, totalCustomers);
  const filteredData = roomFilterService.filteredRooms(rooms, userSelectedType, userSelectedLocation, totalCustomers);
  return (
    <div className="mainDivUserRoomsPage">
      <div className="roomsCardDiv">
        <h2>Room Page</h2>
        {/*Filter dropdown section */}
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
            
          </div>
        </div>
        {/* Room Card logic Section */}
        {/* Filter section */}
        {isFiltering ? (
          <div className="filteredSection">
          {/*Group Too Big (> 8) */}
          {parseInt(totalCustomers) > 8 ? (
             <div className="error">
                <h3>Group too large</h3>
                <p>Please contact the hotel directly for groups larger than 8.</p>
             </div>
          ) : filteredData.length > 0 ? (
             /*Success Show Filtered Cards */
             filteredData.map((room) => (
                <RoomCard key={room._id} data={room} />
             ))
          ) : (
             /* empty: No Rooms Found for these filters */
             <div className="warning">
                <h3>No Rooms Found</h3>
                <p>We couldn't find any rooms matching your specific criteria.</p>
             </div>
          )}
        </div>
        ) : (
          <div className="default-mode">
            {/* Deluxe Collection */}
            {deluxeData.length > 0 && (
              <div className="deluxeSection">
                <h3>Deluxe Collection</h3>
                {deluxeData.map((room) => (
                  <RoomCard key={room._id} data={room} />
                ))}
              </div>
            )}
            {/* Executive Suites */}
            {executiveData.length > 0 && (
              <div className="executiveSection">
                <h3>Executive Suites</h3>
                {executiveData.map((room) => (
                  <RoomCard key={room._id} data={room} />
                ))}
              </div>
            )}
            {/* Standard Collection */}
            {standardData.length > 0 && (
              <div className="standardSection">
                <h3>Standard Collection</h3>
                {standardData.map((room) => (
                  <RoomCard key={room._id} data={room} />
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}

export default UserRoomPage
