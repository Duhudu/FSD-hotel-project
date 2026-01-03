import React, { useState, useEffect } from 'react';
import {serviceAddOnsList} from "../../APIs/serviceAddOns";
import {validateServiceData} from "../../helpers/AddService_validations"
import Swal from "sweetalert2";

function ServicesEditForm({ serviceId, closeForm, onUpdateSuccess }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [currentIcon, setCurrentIcon] = useState("");
    const [newIcon, setNewIcon] = useState(null);
    //load the data when the form opens 
    useEffect(() => {
        const loadSingleService = async () =>{
            try{
                if (!serviceId) return;
                const response = await serviceAddOnsList.getOneService(serviceId);
                if(response.data){
                    //set the data to the input box
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setPrice(response.data.price);
                    setCurrentIcon(response.data.icon[0] || "");
                }
            }
            catch(err) {
                 console.error("Failed to load service", err);
             }
        };
        loadSingleService();
    }, [serviceId]);

    //image change 
    const handleIconChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewIcon(e.target.files[0]);
        }
    };

    //form submit function
    const handleSubmit = async (e) => {
        console.log("Edit Form Hit")
        e.preventDefault();
        try{
            //check validation 
            const validationFormData = {
                name,
                description,
                price,
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
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            // Only append new icon if user selected one
            if (newIcon) {
                formData.append("icon", newIcon); 
            }
            //send the requset 
            const response = await serviceAddOnsList.updateService(serviceId, formData);
            if (response.success) {
                Swal.fire("Success", "Service updated successfully", "success");
            } else {
                 Swal.fire("Error", response.message || "Update Failed", "error");
            }
        }
        catch (error) {
            console.error("Update Error:", error);
            alert(`Error: ${error.message}`);
        }
    }


  return (
    <div className="mainEditForm-container">
        <div className="editForm-container">
            <h3>Edit Form</h3>
            <form className="serviceEditForm" onSubmit={handleSubmit}>
                <label>Name</label><br/>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br/>
                <label>Description</label><br/>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/><br/>
                <label>Price</label><br/>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br/>
                <label>Current Image:</label><br/>
                {currentIcon && <img src={`http://localhost:82/${currentIcon.replace("src/", "")}`} alt="current" width="100" />} 
                <br/>
                <label>Change Image:</label><br/>
                <input type="file" accept="image/*" onChange={handleIconChange} /><br/><br/>
                <button type="submit">Update</button>
                <button type="button" onClick={closeForm} style={{marginLeft: "10px"}}>Cancel</button>
            </form>
        </div> 
    </div>
  )
}
export default ServicesEditForm
