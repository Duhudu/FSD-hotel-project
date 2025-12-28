import React from 'react'


function RoomCard({ data }) {
    console.log("Card code hit")
    if(data !== null){
        console.log(data);
    }else{
        console.log("Data is null in RoomCards")
    }

  return (
    <div className="single-room-card">
        {/**Image section in the card */}
        <div className="card-image">
            <img src={data.roomTypeId?.images?.[0]} alt={data.roomTypeId?.name} />
        </div>
        {/* Text information */}
        <div className="card-text-info">            
            <h4>{data.roomTypeId?.type} - {data.roomTypeId?.name}</h4>
            <p>{data.roomTypeId?.hotelId?.location}</p>
            {/**Add Heading here */}
            <p>{data.roomTypeId?.capacity}</p>
            <p>{data.roomTypeId?.size}</p>
            <p>{data.roomTypeId?.view}</p>
            <p>{data.roomTypeId?.price}</p>

            <button>Room Details</button>
            <button>RESERVE NOW</button>
        </div>
      
    </div>
  )
}

export default RoomCard
