import React, { useEffect, useState } from 'react'
import {serviceAddOnsList} from "../APIs/serviceAddOns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ServicesEditForm from "../components/Services/ServicesEditForm"
function ServicesManagement() {
    const [services, setService] = useState([]);
    //edit states
    // Controls visibility
    const [isEditing, setIsEditing] = useState(false); 
    // selected service
    const [selectedServiceId, setSelectedServiceId] = useState(null); 
    //get the list 
    const loadService = async () => {
         try{
            const response = await serviceAddOnsList.getService();
            console.log("service list", response);
            //Access the data from the get pull
            if(response.data){
                setService(response.data)
            }else{
                setService(response)
            }
        }
        catch (error) {
            alert("Failed to load rooms from service.");
        }
    };
    //Load Data
    useEffect(() =>{
        loadService();
    }, []);
    useEffect(() =>{
        console.log("Service Data: ",services);
    }, [services])

    //Edit form trigger when the edit btn is clicked 
    const handleEditBtnClick = (id) => {
        setSelectedServiceId(id);
        // Show the form
        setIsEditing(true); 
    }
    //close the form
    const handleCloseForm = () => {
        setIsEditing(false);
        setSelectedServiceId(null);
    }
    //refresh list after update
    const refreshData = () => {
        loadService();
    }

    //Delete Btn
    const handleDeleteBtnClick = async (id) =>{
        Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
        }).then(async(result) =>{
            if(result.isConfirmed){
                //call API 
                const apiResult = await serviceAddOnsList.deleteService(id);
                //only display the message if the api worked 
                if(apiResult.success){
                    Swal.fire({
                        title: "Deleted!",
                        text: "The room has been marked as deleted.",
                        icon: "success",
                    });
                    //update the iu
                    setService((preService) => preService.filter((service) => service._id !== id))
                }else {
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong.",
                        icon: "error",
                    });
                }
            }
        })
    }
    
    //Btn navigate section
    const navigate = useNavigate();
    //Add btn click 
    const handleAddBtnClick = async () => {
        navigate(`/service/add`)
    }
  return (
    <div className="mainServicesManagementDiv">
        <div className="addServicesBtn">
            <button className="addServicesBtn" onClick={handleAddBtnClick}>Add Service</button>
        </div>
      <div className="serviceTable">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {services.length > 0 ? (
                    services.map((service, index) => (
                        <tr key={service._id || index}>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            {/* Btn section */}
                            <td>
                                <button className="btnEdit" onClick={() => handleEditBtnClick(service._id)}>
                                    Edit
                                </button>
                                <button className="btnDelete" onClick={() => handleDeleteBtnClick(service._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ): (
                    <tr>
                        <td>No Data</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
      <div className="editForm-container ">
        <div>
            {isEditing && (
                <ServicesEditForm 
                    serviceId={selectedServiceId}
                    closeForm={handleCloseForm}
                    onUpdateSuccess={refreshData}
                /> 
            )}
            
        </div>

      </div>
    </div>
  )
}

export default ServicesManagement
