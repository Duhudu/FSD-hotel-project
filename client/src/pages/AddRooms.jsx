import React, { useState } from "react";
import { validateRoomForm } from "../helpers/AddRooms_validations";
import { allRoomsList } from "../APIs/RoomAPI";
import Swal from "sweetalert2";


function AddRooms() {
  //get user inputs
  const [roomType, setRoomType] = useState("Deluxe Collection"); //
  const [roomName, setRoomName] = useState("");
  const [roomLocation, setRoomLocation] = useState("Kandy");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("2"); // number of ppl the room can hold
  const [roomSize, setRoomSize] = useState(""); // the size of the room
  const [roomView, setRoomView] = useState("Mountains");
  const [numberOfRooms, setNumberOfRooms] = useState(""); // this is bcs there can be many rooms from the same room type.
  const [roomImages, setRoomImages] = useState([]);
  //new
  const [defaultStatus, setDefaultStatus] = useState("Ready");
  const [startingRoomNumber, setStartingRoomNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [bedType, setBedType] = useState("");
  const [tagline, setTagline] = useState("");

  //Select Options Section

  //Room Type
  const roomTypeOptions = [
    { value: "Deluxe Collection", label: "Deluxe Collection" },
    { value: "Executive Suites", label: "Executive Suites" },
    { value: "Standard Collection", label: "Standard Collection" },
  ];
  //Room Capacity Section
  const roomCapacityOptions = [
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "6", label: "6" },
    { value: "8", label: "8" },
  ];
  //Room Loaction
  const roomLocationOptions = [
    { value: "Kandy", label: "Kandy" },
    { value: "Colombo", label: "Colombo" },
  ];
  //Roon View
  const roomViewOptions = [
    { value: "Panoramic Mountain View", label: "Panoramic Mountain View" },
    { value: "Direct Indian Ocean View ", label: "Direct Indian Ocean View " },
    { value: "Beach side", label: "Beach side" },
  ];

  const defaultStatusOptions = [
    { value: "Ready", label: "Ready" },
    { value: "Cleaning", label: "Cleaning" },
    { value: "Maintenance", label: "Maintenance" },
  ];

  //Handle the change event
  const handleDropDown = (e) => {
    //check the name of the drop down
    if (e.target.name === "roomType") {
      setRoomType(e.target.value);
    } else if (e.target.name === "location") {
      setRoomLocation(e.target.value);
    } else if (e.target.name === "roomCapacity") {
      setRoomCapacity(e.target.value);
    } else if (e.target.name === "roomView") {
      setRoomView(e.target.value);
    } else if (e.target.name === "defaultStatus") {
      setDefaultStatus(e.target.value);
    }
  };

  //Handle image selection
  const handleImageChange = (e) => {
    setRoomImages(e.target.files);
  };

  //submit function
  const formSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit Function Hit");

    //Validation Section
    const roomDataToCheck = {
      roomType,
      roomName,
      roomLocation,
      roomDescription,
      roomPrice,
      roomCapacity,
      roomSize,
      roomView,
      numberOfRooms,
      defaultStatus,
      floor,
      startingRoomNumber,
      roomImages,
      bedType,
      tagline
      
    };
    //run validation
    const validation = validateRoomForm(roomDataToCheck);
    if (!validation.isValid) {
      Swal.fire({
        title: "Validation Error",
        text: Object.values(validation.errors)[0],
        icon: "error",
      });
      //stop the submit function
      return;
    }
    console.log("Validation passed");

    //Create room Object
    // Create the "Shipping Box"
    const formData = new FormData();
    // Pack the text data
    formData.append("roomType", roomType);
    formData.append("roomName", roomName);
    formData.append("roomLocation", roomLocation);
    formData.append("roomDescription", roomDescription);
    formData.append("roomPrice", roomPrice);
    formData.append("roomCapacity", roomCapacity);
    formData.append("roomSize", roomSize);
    formData.append("roomView", roomView);
    formData.append("numberOfRooms", numberOfRooms); //here
    formData.append("defaultStatus", defaultStatus);
    formData.append("floor", floor);
    formData.append("startingRoomNumber", startingRoomNumber);
    formData.append("bedType",bedType);
    formData.append("tagline",tagline)

    // Pack the images
    //loop through the files and append them one by one
    for (let i = 0; i < roomImages.length; i++) {
      formData.append("roomImages", roomImages[i]);
    }
    const result = await allRoomsList.addRooms(formData);
    if (result.success) {
      if (result.success) {
        Swal.fire("Success", "Room Added successfully", "success");
        //clear form here
        clearForm();
      } else {
        Swal.fire("Error", result.message || "Update Failed", "error");
      }
    } else {
      Swal.fire("Error", result.message || "Update Failed", "error");
    }
  };
  //clear form function
  const clearForm = async () => {
    setRoomType("Deluxe Collection");
    setRoomName("");
    setRoomLocation("Kandy");
    setRoomDescription("");
    setRoomPrice("");
    setRoomCapacity("2");
    setRoomSize("");
    setRoomView("Mountains");
    setNumberOfRooms("");
    setRoomImages([]);
    setDefaultStatus("Ready");
    setStartingRoomNumber("");
    setFloor("");
    setBedType("");
    setTagline("");
  };
  return (
    <div className="mainDiv">
      <div className="addRoomsFormDiv">
        <form>
          <label>Type</label>
          <select name="roomType" value={roomType} onChange={handleDropDown}>
            {roomTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <label>Name</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <label>Location</label>
          <select
            name="location"
            value={roomLocation}
            onChange={handleDropDown}
          >
            {roomLocationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <label>Description</label>
          <input
            type="text"
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
          />
          <label>Tagline</label>
          <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} />
          <label>Price</label>
          <input
            type="text"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
          />
          <label>Room Size</label>
          <input
            type="number"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
          />
          <label>Capacity</label>
          <select
            name="roomCapacity"
            value={roomCapacity}
            onChange={handleDropDown}
          >
            {roomCapacityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label>Floor</label>
          <input
            type="number"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />

          <label>Upload Images (Max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <label>View</label>
          <select name="roomView" value={roomView} onChange={handleDropDown}>
            {roomViewOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <label>Bed Type</label>
          <input type="text" value={bedType} onChange={(e) => setBedType(e.target.value)} />

          <label>Room Status</label>
          <select
            name="defaultStatus"
            value={defaultStatus}
            onChange={handleDropDown}
          >
            {defaultStatusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label>Number of Rooms</label>
          <input
            type="number"
            value={numberOfRooms}
            onChange={(e) => setNumberOfRooms(e.target.value)}
          />

          <label>Starting Room Number</label>
          <input
            type="text"
            value={startingRoomNumber}
            onChange={(e) => setStartingRoomNumber(e.target.value)}
          />
          <button className="clearBtn" onClick={clearForm}>
            Clear
          </button>
          <button onClick={formSubmit}>Add Rooms</button>
        </form>
      </div>
    </div>
  );
}

export default AddRooms;
