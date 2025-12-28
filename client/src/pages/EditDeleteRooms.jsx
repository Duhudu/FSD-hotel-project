import React, { useEffect, useState } from "react";
import { allRoomsList } from "../APIs/RoomAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditDeleteRooms() {
  //save
  const [rooms, setRooms] = useState([]);

  //Load Data
  useEffect(() => {
    //get all rooms list
    const loadRooms = async () => {
      try {
        const response = await allRoomsList.getRooms();
        console.log("Full Backend Response:", response);
        //access the data from the get request
        if (response.data) {
          setRooms(response.data);
        } else {
          //fallback
          setRooms(response);
        }
      } catch (error) {
        alert("Failed to load rooms from service.");
      }
    };
    loadRooms();
  }, []);

  //check if the data is set correctly
  useEffect(() => {
    console.log("room data has been updated in room variable", rooms);
  }, [rooms]);

  //Function to handle the Delete button Click
  const handleDeleteBtnClick = async (id) => {
    //Pop-up notification
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
        //Call API function
        const apiResult = await allRoomsList.removeRooms(id);
        //Only show success message if API worked
        if (apiResult.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The room has been marked as deleted.",
            icon: "success",
          });
          //Update the UI state immediately (removes row from table)
          setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };
  //filter function
  const [selectedRoom, setSelectedRoom] = useState(null);

  const uniqueRoom = Array.from(
    new Map(
      rooms.map((room) => [
        `${room.roomTypeId?.type}::${room.roomTypeId.name}::${room.roomTypeId.hotelId.location}`,
        room,
      ])
    ).values()
  );
  //Get and store the user selected data to filter the table
  const selectedRoomType = selectedRoom?.roomTypeId?.type;
  const selectedRoomName = selectedRoom?.roomTypeId.name;
  const selectedRoomLocation = selectedRoom?.roomTypeId.hotelId.location;
  console.log("Selected Room Type", selectedRoomType);
  console.log("Selected Room Name", selectedRoomName);
  console.log("Selected Room Location", selectedRoomLocation);

  //filter logic to display data in the table correctly
  const filteredRooms = rooms.filter((room) => {
    //remove rooms in where the status is Deleted
    const isActive = room.status !== "Deleted";
    //check the conditions to filter data
    const matchesName =
      !selectedRoomName || room.roomTypeId?.name === selectedRoomName;
    const matchesType =
      !selectedRoomType || room.roomTypeId?.type === selectedRoomType;
    const matchesLocation =
      !selectedRoomLocation ||
      room.roomTypeId?.hotelId?.location === selectedRoomLocation;
    //Return true only if ALL conditions are met
    return isActive && matchesName && matchesType && matchesLocation;
  });

  //Edit form Section
  const navigate = useNavigate();
  const handleEditBtnClick = async (id) => {
    //change the page (same tab) using the path in the app.js
    navigate(`/rooms/edit/${id}`);
  };
  //Navigate to AddRooms.js page
  const handleAddBtnClick = async () => {
    //Change this later in the main project after i get the home page for admin
    navigate(`/rooms/add`);
  };
  return (
    <div className="mainDiv">
      <h3>Room management</h3>
      {/**Btn to go to Add Rooms page */}
      <div className="addBtnDiv">
        <button className="addRoomsBtn" onClick={handleAddBtnClick}>
          Add Room
        </button>
      </div>
      <div className="displayRoomsTable">
        {/**Filter dropdown Section */}
        <select
          //Bind the select value to the ID or empty string if null
          value={selectedRoom?._id || ""}
          onChange={(e) => {
            //define selectedId
            const selectedId = e.target.value;
            //Find by ID, matching the option value
            const room = uniqueRoom.find((r) => r._id === selectedId);
            setSelectedRoom(room);
          }}
        >
          <option value="">All Room</option>
          {/* null the value */}
          {uniqueRoom.map((room, index) => (
            <option key={index} value={room._id}>
              {room.roomTypeId?.type} {room.roomTypeId.name} (
              {room.roomTypeId.hotelId.location})
            </option>
          ))}
        </select>
        {/* Table Section */}
        <table className="editDeleteTable">
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Location</th>
              <th>No of Rooms</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body Section*/}
          <tbody>
            {/** Check if data is getting sent to the table correct */}
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room, index) => (
                <tr key={rooms._id || index}>
                  {/** method to display Type bcs it comes from a fk in room (its like jumping from 1 tb to another R -> RT -> H  ) */}
                  <td>{room.roomTypeId?.type}</td>
                  <td>{room.roomTypeId.name}</td>
                  <td>{room.roomTypeId.hotelId.location}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.roomTypeId.price}</td>
                  {/** Edit and Delete Btn section */}
                  <td>
                    <button
                      className="editBtn"
                      onClick={() => handleEditBtnClick(room._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteBtn"
                      onClick={() => handleDeleteBtnClick(room._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No rooms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditDeleteRooms;
