import React, { useState } from "react";
import Swal from "sweetalert2";
import {serviceAddOnsList} from "../APIs/serviceAddOns";
import { useNavigate } from "react-router-dom";
import {validateServiceData} from "../helpers/AddService_validations"
function ServiceAddOns() {
    //variables
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon,setIcon] =useState([]);
    const [price, setPrice] = useState("");
    const status = 'Active';

    //handle icon selection
    const handleIconChange = (e) =>{
      if (e.target.files && e.target.files.length > 0) {
        // grab the image file
        setIcon(e.target.files[0]); 
      }
    };
    //Submit form function
    const submit = async (e) =>{
        //cancel the default browser action
        e.preventDefault();
        //Check validation 
        const validationFormData = {
          name,
          description,
          price,
          icon
        }
        const validation = validateServiceData(validationFormData);
        if (!validation.isValid) {
            Swal.fire({
            title: "Validation Error",
            text: Object.values(validation.errors)[0],
            icon: "error",
          });
          //stop the submit function
          return;
        }
        console.log("ser: Submit function working");
        console.log("Name: ", name);
        console.log("Des: ", description)
        //Create the service object
        const formData = new FormData();
        //Data the data
        formData.append("name",name);
        formData.append("description",description);
        formData.append('status', status);
        formData.append('price',price)
        if (icon) {
          formData.append("icon", icon); 
        }
        //call the API and get the restult
        const result = await serviceAddOnsList.addService(formData);
        if(result.success){
            if(result.success){
                Swal.fire("Success", "Service Added successfully", "success");
                //Clear the form
                clearFunction();
            }else{
                Swal.fire("Error", result.message || "Add Failed", "error");
            }
        }else {
              Swal.fire("Error", result.message || "Add Failed", "error");
        }
    }
    //Clear form function 
    const clearFunction = async () =>{
        setName("");
        setDescription("");
        setPrice("");
        setIcon([]);
    }
    //Back Btn
    //Btn navigate section
    const navigate = useNavigate();
    const handleBackBtnClick = async () =>{
      navigate('/service/edit-delete')
    }
    
  return (
    <div className="mainDiv">
      <div className="addServiceForm">
        <h4>Add Service</h4>
        <form>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <label>Upload 1 Icon</label>
            <input type="file" accept="image/*" onChange={handleIconChange} />
            <button onClick={submit}>Add Service</button>
        </form>
        {/* BakcBtn */}
        <button className="backBtn" onClick={handleBackBtnClick}>Back</button>

      </div>
    </div>
  )
}

export default ServiceAddOns
