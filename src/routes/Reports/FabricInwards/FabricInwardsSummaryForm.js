import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import {baseURL} from '../../../api';
import MenuItem from "@material-ui/core/MenuItem";

const FabricInwardsSummaryForm = (props) => {
  let history = useHistory();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;

  var d = document.getElementById("inward_to_date");
  if (d) {
    document.getElementById("inward_to_date").setAttribute("min", "2023-03-01");
  }

  const [downloadFabricInwards, setFabricInwardsDownload] = useState({
    fabric_inward_supplier:"",
   inward_from_date: "2023-03-01", 
   inward_to_date: todayback,
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [supplier, setSupplier] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
  
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/fetch-supplier', requestOptions)
      .then(response => response.json())
      .then(data => setSupplier(data.supplier)); 
    }, []);

   useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){
  
        window.location = "/signin";
        
      }else{
  
      }
      
    });

  const onInputChange = (e) => {
   setFabricInwardsDownload({
      ...downloadFabricInwards,
      [e.target.name]: e.target.value,
    });

    if(e.target.name == 'indicomp_full_name'){

       setDonorName(e.target.value);
   }
  
  };


  const onSubmit = (e) => {
   e.preventDefault();
   let data = {
        fabric_inward_supplier:downloadFabricInwards.fabric_inward_supplier,
      inward_from_date: downloadFabricInwards.inward_from_date,
      inward_to_date: downloadFabricInwards.inward_to_date,
   };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-fabric-inwards-summary",
     method: "POST",
     data,
     headers: {
       Authorization: `Bearer ${localStorage.getItem("login")}`,
     },
   }).then((res) => {
     console.log("data : ",res.data);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fabric_inwards_summary.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Fabric Inwards Summary is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Fabric Inwards Summary is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };

 const onReportView = (e) => {
  e.preventDefault();

  localStorage.setItem('fabric_inward_supplier',downloadFabricInwards.fabric_inward_supplier);
  localStorage.setItem('inward_from_date',downloadFabricInwards.inward_from_date);
  localStorage.setItem('inward_to_date',downloadFabricInwards.inward_to_date);
  history.push("fabricinwardsReceipt");
  
}
  

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Fabric Inwards Summary" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    select
                    
                    label="Supplier"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="fabric_inward_supplier"
                    value={downloadFabricInwards.fabric_inward_supplier}
                    onChange={(e) => onInputChange(e)}
                    fullWidth
                    >
                        {supplier.map((fabric, key) => (
                    <MenuItem key={fabric.supplier_name} value={fabric.supplier_name}>
                        {fabric.supplier_name}
                    </MenuItem>
                    ))}
                </TextField>
                    
                </div>
                </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
             <div className="form-group">
             <TextField
                 fullWidth
                 label="Inward From Date"
                 required
                 type="date"
                 autoComplete="Name"
                 name="inward_from_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadFabricInwards.inward_from_date}
                 onChange={(e) => onInputChange(e)}
               />
             </div>
           </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                id="inward_to_date"
                 fullWidth
                 label="Inward To Date"
                 type="date"
                 required
                 autoComplete="Name"
                 name="inward_to_date"
                 InputLabelProps={{ shrink: true }}
                 value={downloadFabricInwards.inward_to_date}
                 onChange={(e) => onInputChange(e)}
               />
              </div>
            </div>
            
            
            
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Download
            </Button>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-2">
            <Button
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onReportView(e)}
              disabled={isButtonDisabled}
            >
              View
            </Button>
            </div>
          </div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default FabricInwardsSummaryForm;
