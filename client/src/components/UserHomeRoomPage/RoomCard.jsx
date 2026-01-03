import React, { useEffect, useState } from 'react';
import RoomDetailsPopUp from "./RoomDetailsPopUp";
import { useNavigate } from "react-router-dom";
import {UserDetails} from "../../APIs/UserAPI"
function RoomCard({ data }) {
    //User id if they are logged in 
    const [user, setUser] = useState(null);//Change this later after the login is made and i get the cookie or the token 
    //const user = getUserFromToken(); //later 
    console.log("Card code hit")
    if(data !== null){
        console.log(data);
    }else{
        console.log("Data is null in RoomCards")
    }

    //Get the user from the backend (remove later)
    useEffect(() =>{
        const loadUser = async () =>{
            try{
                const response = await UserDetails.getAllUsers();
                console.log("Full Backend Response:", response);
                if(response.data && response.data.length > 0){
                    setUser(response.data[0]);
                }else{
                    //fallback
                    console.error("Failed to get test user");
                }
            }
             catch (error) {
                alert("Failed to load rooms from service.");
            }
        }
        loadUser();
    }, []);
    //check if the user is logged into the system 
    //

    // Helper to clean image URL 
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        return `http://localhost:82/${imagePath.replace("src/", "")}`;
    };
    //room details pop-up function 
    const [showPopUp, setShowPopUp] = useState(false);
    //handle booking btn
    const navigate = useNavigate();
    const handleBookBtn = async (userId,id) => {
        if(!user){
            //create a popupwindow later 
            alert("Please sign up or log in to book a room");
            return;
        }
        navigate(`/user/booking/${user._id}/${data._id}`);
    }


  return (
    <div className="single-room-card">
        
        {/* Text information */}
        <div className="card-text-info">
            {/**Image section in the card */}
            <h4>{data.roomTypeId?.type} - {data.roomTypeId?.name}</h4>
            <div className="card-image">
                    {data.roomTypeId?.images?.length > 0 && (
                        <img
                            src={getImageUrl(data.roomTypeId.images[0])}
                            alt={data.roomTypeId?.name}
                            width="100"
                        />
                    )}
            </div>           
            <p>{data.roomTypeId?.hotelId?.location}</p>
            <p>up to {data.roomTypeId?.capacity} guests</p>
            <p>up to {data.roomTypeId?.bedType} Bed</p>
            <p>{data.roomTypeId?.size} sq.m.</p>
            <p>{data.roomTypeId?.view} View </p>
            <p>up to {data.roomTypeId?.tagline} (Remove this in later from RoomCard TagLine)</p>
            <p>$ {data.roomTypeId?.price}</p>

            <button onClick={() => setShowPopUp(true)}>Room Details</button>
            <button className="bookBtn" onClick={() => handleBookBtn(user._id, data._id)}>RESERVE NOW</button>
        </div>
        {/* Call the popup */}
        {showPopUp && (
            <RoomDetailsPopUp PopUPdata={data} closePopUp={() => setShowPopUp(false)} />
        )}
                    
    </div>
  )
}

export default RoomCard
