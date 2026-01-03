import React, {  useEffect, useState } from 'react';
import {bookingDataApi} from "../../APIs/bookingAPI"
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
//calendar importss 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function BookingPage() {
  console.log("Booking page hit")
  const { userId, roomId } = useParams();
  const [rooms, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [availability, setAvailability] = useState(null);//T/F vals here
  const [suggestedRoomId, setSuggestedRoomId] = useState(null);
  
  
  //Get room details 
  useEffect(() => {
    if (!roomId) return;
    const roomDetails = async () => {
      const response = await bookingDataApi.selectedRoom(roomId);
      if(response.success){
        setRoom(response.data.data)
      }else{
        Swal.fire("Error", response.message, "error");
      }
    }
    roomDetails();
  }, [roomId])
  
  //take user data
  const userDates = (dates) => {
    const [startDate, endDate] = dates;
    setCheckIn(startDate);
    setCheckOut(endDate);
  }

  //Check Availability using rooms.roomTypeId
  useEffect(() =>{
    //get the user inputs and see if the rooms are loaded 
    if(!checkIn || !checkOut ||!rooms) return;
    
    const verifyDates = async () =>{
      const typeId = rooms.roomTypeId?._id;
      if(!typeId){
        console.log("Room Type ID missing from room data");
        return;
      }
      const response = await bookingDataApi.checkAvailability(typeId, checkIn,checkOut);
      if(response.success && response.available){
        //set room if its ava
        setSuggestedRoomId(response.suggestedRoomId);
        
      }else {
        //fallback
        setAvailability(false);
        setSuggestedRoomId(null);
      }
    }
    verifyDates();
  }, [checkIn, checkOut, rooms])

  //Get add on serveris 
  //debugger
  useEffect(() =>{
    console.log("Data from booking controller", rooms)
    console.log("Selected Room", roomId)
    console.log("User", userId)
    console.log("SuggestedRoomID: ",suggestedRoomId)
  })
  return (
    <div className="booking-page-main">
      <h1>Book Your Stay</h1>
      {/* Pick Date */}
      <div className="calendar-container">
        <label>Select your dates:</label>
        <DatePicker 
          selected={checkIn}
          onChange={userDates}
          startDate={checkIn}
          endDate={checkOut}
          selectsRange
          inline
          minDate={new Date()}/* Disable past dates */
          monthsShown={2}
          dateFormat="yyyy/MM/dd"
        />
        {/* Debugging: Show selected dates */}
      <div className="selected-dates-info">
        <p>Check In: {checkIn ? checkIn.toLocaleDateString() : "Select date"}</p>
        <p>Check Out: {checkOut ? checkOut.toLocaleDateString() : "Select date"}</p>
      </div>
      </div>
      {/* Selected Room Details */}
      {rooms && (
        <div className="room-details-container">
          <h4>Selected Room Details</h4>
          <p>Name {rooms.roomTypeId?.type} - {rooms.roomTypeId?.name}</p>
          <p>Location {rooms.roomTypeId?.hotelId?.location}</p>
          <p>up to {rooms.roomTypeId?.capacity} guests</p>
        </div>
      )}
      {/* Show if rooms are aviable or not if not display some recommendation rooms with the same location and capacity */}
      <div className="recommendations-container"></div>
      {/* Display Add ons */}
      <div className="add-ons-container"></div>
      {/* Display live auto updated price*/}
      <div className="live-price-container"></div>
        

    </div>
  )
}

export default BookingPage
