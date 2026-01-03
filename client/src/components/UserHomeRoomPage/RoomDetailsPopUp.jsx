import React, { useState, useEffect, useRef } from 'react';
import {serviceAddOnsList} from  "../../APIs/serviceAddOns"
function RoomDetailsPopUp({ closePopUp, PopUPdata }) {
    const [services, setServices] = useState([])
    //Track which image is currently getting displayed
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    //variable to see if the user clicked outside the popup 
    const popUpRef = useRef(null);
    //Get the services 
    useEffect(() =>{
        const loadServices = async () => {
            try{
                const response = await serviceAddOnsList.getService();
                if(response.data){
                    setServices(response.data)
                }else{
                    //fallback
                    setServices(response)
                }
            }
            catch(err) {
                 console.error("Failed to load service", err);
             }
        }
        loadServices();
    }, [])
    // Handle Click Outside
    useEffect(() =>{
        const handleClickOutside  = (click) =>{
            if(popUpRef.current && !popUpRef.current.contains(click.target)){
                //Call the function given by parent to close the popup
                closePopUp();
            }
        };
        //call fun
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [popUpRef, closePopUp])
    if (!PopUPdata) return null;
    //Image Section
    // Helper for images
    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        return `http://localhost:82/${imagePath.replace("src/", "")}`;
    };
    
    //variable to access images
    const images = PopUPdata.roomTypeId?.images || [];
    //function to Go Next and Previous images 
    const goNextimage = () => {
        //go back to 0. Otherwise add 1
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    };
    const goPrevImage = () => {
        //go to the last one. Otherwise subtract 1
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )

    }
  return (
    <div className="mainPopUpDiv" style={overlayStyle}>
        <div className="PopUp-container" ref={popUpRef} style={popupStyle}>
            <button onClick={closePopUp}>Close</button>
            <h4>{PopUPdata.roomTypeId?.type} - {PopUPdata.roomTypeId?.name}</h4>
            <p>{PopUPdata.roomTypeId?.tagline} (Remove this in later from RoomCard TagLine)</p>

            {/**Image section in popup */}
            <div className="card-image" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* only display the left btn if there is more than 1 image */}
                    {images.length > 1 && (
                        <button onClick={goPrevImage} style={arrowButtonStyle}>
                            {/* < btn  */}
                            &lt;
                        </button>
                    )}
                    {/* Image */}
                    {images.length > 0 ? (
                        <img
                            src={getImageUrl(images[currentImageIndex])}
                            alt={PopUPdata.roomTypeId?.name}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                    ) : (
                        <p>No Image Available</p>
                    )}
                    {/* Only show the right btn if theres more than 1 img */}
                    {images.length > 1 && (
                        <button onClick={goNextimage} style={arrowButtonStyle}>
                            {/* > btn */}
                            &gt;
                        </button>
                    )}
                    {/* Image counter */}
                    {images.length > 1 &&(
                        <span style={counterStyle}>
                            {currentImageIndex + 1} / {images.length}
                        </span>
                    )}
                    
            </div>
            {/* Room Details */}
            <div className="details-scroll" style={{maxHeight: '400px', overflowY: 'auto'}}>
                <p>{PopUPdata.roomTypeId?.hotelId?.location}</p>
                <p>up to {PopUPdata.roomTypeId?.bedType} Bed</p>
                <p>up to {PopUPdata.roomTypeId?.capacity} guests</p>
                <p>{PopUPdata.roomTypeId?.size} sq.m.</p>
                <p>{PopUPdata.roomTypeId?.view} View </p>
                <label>description</label>
                <p>{PopUPdata.roomTypeId?.description} </p>
                <h5>ADDITIONAL ROOM DETAILS</h5>
                <p>FLOOR: {PopUPdata?.floor} </p>
                <p>EXTRA BED: Available upon request</p>
                <p>BATHROOM: One full bathroom</p>
                <p>PRICE: $ {PopUPdata.roomTypeId?.price}</p>
                {/*services details */}
                <h5>SERVICES</h5>
                <p>24-hour in-room dining service</p>
                <p>Mini bar</p>
                <p>70-inch TV 4K resolution</p>
                <p>Coffee machine & tea-making facilities</p>
                {/* Add on services names */}
                <h5>ADDITIONAL ADD ON'S</h5>
                {services.length > 0 ? (
                    services.map((service) => {
                        // return JSX needed in map as well
                        return (
                                <p key={service._id}>
                                    {service.name}
                                </p>
                            )
                    })
                ): (
                    <p>Sorry no add-on services available at this time</p>
                )}
            </div>
        </div>
      
    </div>
  )
}
// Basic Inline Styles 
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};
const popupStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '500px',
    maxWidth: '90%',
    position: 'relative'
};
const arrowButtonStyle = {
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '18px',
    margin: '0 10px',
    borderRadius: '50%', 
    zIndex: 10
};

const counterStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '10px',
    fontSize: '12px'
};

export default RoomDetailsPopUp
