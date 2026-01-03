import React, { useEffect, useState } from "react";
import { allRoomsList } from "../APIs/RoomAPI";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EditFormValidation } from "../helpers/EditRoomForm_validation";

function EditRoomsForm() {
  const navigate = useNavigate();
  //Get id from the path
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  //Load data
  useEffect(() => {
    const fetchRoom = async () => {
      const response = await allRoomsList.getUpdateRoom(id);
      if (response.success) {
        setRoom(response.data);
        setLoading(false);
      } else {
        Swal.fire("Error", response.message, "error");
      }
    };
    fetchRoom();
  }, [id]);

  //Edit Section
  const [roomType, setRoomType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomLocation, setRoomLocation] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomSize, setRoomSize] = useState(""); // the size of the room
  const [roomView, setRoomView] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [defaultStatus, setDefaultStatus] = useState("");
  const [floor, setFloor] = useState("");
  const [bedType, setBedType] = useState("");
  const [tagline, setTagline] = useState("");
  //for new image
  const [newImages, setNewImages] = useState([]);
  
  useEffect(() =>{
    console.log("Room Data in Edit Room page",room)
  },[room])
  //set the data when the room data changes or arrives
  useEffect(
    () => {
      // Check if room and the nested data actually exist before setting
      if (room?.roomTypeId?.type) {
        setRoomType(room.roomTypeId?.type);
      }
      if (room?.roomTypeId?.name) {
        setRoomName(room.roomTypeId.name);
      }
      if (room?.roomTypeId?.hotelId?.location) {
        setRoomLocation(room.roomTypeId.hotelId.location);
      }
      if (room?.roomTypeId?.description) {
        setRoomDescription(room.roomTypeId.description);
      }
      if (room?.roomTypeId?.price) {
        setRoomPrice(room.roomTypeId.price);
      }
      if (room?.roomTypeId?.capacity) {
        setRoomCapacity(room.roomTypeId.capacity);
      }
      if (room?.roomTypeId?.size) {
        setRoomSize(room.roomTypeId.size);
      }
      if (room?.status) {
        setDefaultStatus(room.status);
      }
      if (room?.roomTypeId?.view) {
        setRoomView(room.roomTypeId.view);
      }
      if (room?.floor) {
        setFloor(room.floor);
      }
      if(room?.roomTypeId?.bedType){
        setBedType(room.roomTypeId.bedType);
      }
      if(room?.roomTypeId?.tagline){
        setTagline(room.roomTypeId.tagline)
      }
      if (room?.roomTypeId?.images) {
        setExistingImages(room.roomTypeId.images);
      }
    },
    [room] //stop from auto updating without new data
  );
  //Handle NEW  image selection
  const handleImageChange = (e) => {
    // Convert the FileList to a standard Array
    const files = Array.from(e.target.files);
    setNewImages(files);
  };
  // Handle removing an EXISTING image (from the DB list)
  const handleRemoveExisting = (indexToRemove) => {
    setExistingImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };
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
    { value: "Mountains", label: "Mountains" },
    { value: "Sea", label: "Sea" },
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

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //check validation
      const editRoomDataToCheck = {
        roomType,
        roomName,
        roomLocation,
        roomDescription,
        roomPrice,
        roomCapacity,
        roomSize,
        roomView,
        defaultStatus,
        floor,
        bedType,
        tagline,
        existingImages,
        newImages,
      };
      const validation = EditFormValidation(editRoomDataToCheck);
      if (!validation.isValid) {
        Swal.fire({
          title: "Validation Error",
          text: Object.values(validation.errors)[0],
          icon: "error",
        });
        //stop the submit function
        return;
      }
      const formData = new FormData();
      //Append data
      formData.append("roomType", roomType);
      formData.append("roomName", roomName);
      formData.append("roomLocation", roomLocation);
      formData.append("roomDescription", roomDescription);
      formData.append("roomPrice", roomPrice);
      formData.append("roomCapacity", roomCapacity);
      formData.append("roomSize", roomSize);
      formData.append("roomView", roomView);
      formData.append("defaultStatus", defaultStatus);
      formData.append("floor", floor);
      formData.append("bedType",bedType);
      formData.append("tagline",tagline);

      //Append "Existing/old Images"
      formData.append("existingImages", JSON.stringify(existingImages));
      //Append "New Images"
      newImages.forEach((file) => {
        formData.append("images", file);
      });
      //Send the Request
      const typeId = room.roomTypeId._id;
      const response = await allRoomsList.updateRooms(typeId, formData);
      if (response.success) {
        Swal.fire("Success", "Room updated successfully", "success");
      } else {
        Swal.fire("Error", response.message || "Update Failed", "error");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert(`Error: ${error.message}`);
    }
  };
  //If loading is true OR room is null
  if (loading || !room) return <p>Loading Room Details...</p>;
  //BackBtn

  const handleBackBtn = async () => {
    navigate(`/edit-delete`);
  };
  return (
    <div className="mainDiv">
      <div className="EditFormDiv">
        {/**BackBtn */}
        <button className="backBtn" onClick={handleBackBtn}>
          Back
        </button>
        <h2>Edit Room</h2>

        {/**Heading */}
        <h3>
          You are editing Room "{room.roomTypeId.name}" -{" "}
          {room.roomTypeId.hotelId.location}
        </h3>
        {/** Edit Form section */}
        <form className="EditForm" onSubmit={handleSubmit}>
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
          <label>Bed Type</label>
          <input type="text" value={bedType} onChange={(e) => setBedType(e.target.value)} />
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
          <label>View</label>
          <select name="roomView" value={roomView} onChange={handleDropDown}>
            {roomViewOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
          {/* --- IMAGE SECTION --- */}
          <div className="image-section">
            <label>Images</label>
            {/*Existing Images List */}
            <div className="existing-images">
              <label>Current Images</label>
              {existingImages.map((imgUrl, index) => (
                <div key={index} className="image-item">
                  {/**Show image name */}
                  <span>{imgUrl.split("/").pop()}</span>
                  {/* Remove btn */}
                  <button
                    type="button"
                    onClick={() => handleRemoveExisting(index)}
                    style={{ color: "red", marginLeft: "10px" }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/**New Image Upload */}
            <div className="new-images">
              <label>New Images</label>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
          </div>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRoomsForm;
