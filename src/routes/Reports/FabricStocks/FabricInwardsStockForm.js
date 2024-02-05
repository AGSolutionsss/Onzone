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
import { Select, Chip,InputLabel, FormControl } from '@material-ui/core';

const FabricInwardsStockForm = (props) => {
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
    fabric_inward_sub_brand:"",
    fabric_inward_sub_color: "",
    fabric_inward_sub_design: "",
    fabric_inward_sub_type: "",
    fabric_inward_sub_color_theme: "",
    fabric_inward_sub_occasion: "",
    inward_from_date: "2023-03-01", 
    inward_to_date: todayback,
  });

  var url = new URL(window.location.href);
  var id = url.searchParams.get("id");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  const [brand, setBrand] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-brand', requestOptions)
      .then(response => response.json())
      .then(data => setBrand(data.brand)); 
    }, []);

    const [colors, setColors] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-color', requestOptions)
      .then(response => response.json())
      .then(data => setColors(data.color)); 
    }, []);

    const [designs, setDesigns] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-design', requestOptions)
      .then(response => response.json())
      .then(data => setDesigns(data.design)); 
    }, []);

    const [types, setType] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-fab-type', requestOptions)
      .then(response => response.json())
      .then(data => setType(data.type)); 
    }, []);

    const [others, setOther] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-other', requestOptions)
      .then(response => response.json())
      .then(data => setOther(data.other)); 
    }, []);

    const [colortheme, setColorTheme] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-color-theme', requestOptions)
      .then(response => response.json())
      .then(data => setColorTheme(data.colortheme)); 
    }, []);

    const [occasion, setOccasion] = useState([]);
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
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/fetch-occasion', requestOptions)
      .then(response => response.json())
      .then(data => setOccasion(data.occasion)); 
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
        fabric_inward_sub_brand:downloadFabricInwards.fabric_inward_sub_brand,
      inward_from_date: downloadFabricInwards.inward_from_date,
      inward_to_date: downloadFabricInwards.inward_to_date,
      fabric_inward_sub_color: downloadFabricInwards.fabric_inward_sub_color,
      fabric_inward_sub_design: downloadFabricInwards.fabric_inward_sub_design,
      fabric_inward_sub_type: downloadFabricInwards.fabric_inward_sub_type,
      fabric_inward_sub_color_theme: downloadFabricInwards.fabric_inward_sub_color_theme,
      fabric_inward_sub_occasion: downloadFabricInwards.fabric_inward_sub_occasion,
   };
   var v = document.getElementById('dowRecp').checkValidity();
   var v = document.getElementById('dowRecp').reportValidity();
   e.preventDefault();

if(v){
 setIsButtonDisabled(true)
   axios({
     url: baseURL+"/download-fabric-inwards-stock",
     method: "POST",
     data,
     headers: {
       Authorization: `Bearer ${localStorage.getItem("login")}`,
     },
   }).then((res) => {
     
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fabric_inwards_stock.csv');
    document.body.appendChild(link);
    link.click();
     NotificationManager.success("Fabric Inwards Stock is Downloaded Successfully");
       setIsButtonDisabled(false)
   }).catch((err) =>{
    NotificationManager.error("Fabric Inwards Stock is Not Downloaded");
    setIsButtonDisabled(false)
  });
 }
 };
  
 const onReportView = (e) => {
  e.preventDefault();

  localStorage.setItem('fabric_inward_sub_brand',downloadFabricInwards.fabric_inward_sub_brand);
  localStorage.setItem('inward_from_date',downloadFabricInwards.inward_from_date);
  localStorage.setItem('inward_to_date',downloadFabricInwards.inward_to_date);
  localStorage.setItem('fabric_inward_sub_color',downloadFabricInwards.fabric_inward_sub_color);
  localStorage.setItem('fabric_inward_sub_design',downloadFabricInwards.fabric_inward_sub_design);
  localStorage.setItem('fabric_inward_sub_type',downloadFabricInwards.fabric_inward_sub_type);
  localStorage.setItem('fabric_inward_sub_color_theme',downloadFabricInwards.fabric_inward_sub_color_theme);
  localStorage.setItem('fabric_inward_sub_occasion',downloadFabricInwards.fabric_inward_sub_occasion);
  history.push("fabricinwardsStockReceipt");
  
}

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Fabric Stocks" match={props.match} />
      <RctCollapsibleCard>
        
        <form id="dowRecp" autoComplete="off">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Color"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_color"
                  value={downloadFabricInwards.fabric_inward_sub_color}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {colors.map((color, key) => (
                  <MenuItem key={color.attr_colour_name} value={color.attr_colour_name}>
                    {color.attr_colour_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Design"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_design"
                  value={downloadFabricInwards.fabric_inward_sub_design}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {designs.map((design, key) => (
                  <MenuItem key={design.attr_design_name} value={design.attr_design_name}>
                    {design.attr_design_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Type"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_type"
                  value={downloadFabricInwards.fabric_inward_sub_type}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {types.map((design, key) => (
                  <MenuItem key={design.attr_fabric_type_name} value={design.attr_fabric_type_name}>
                    {design.attr_fabric_type_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Color Theme"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_color_theme"
                  value={downloadFabricInwards.fabric_inward_sub_color_theme}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {colortheme.map((other, key) => (
                  <MenuItem key={other.attr_colour_theme_name} value={other.attr_colour_theme_name}>
                    {other.attr_colour_theme_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Occasion"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_occasion"
                  value={downloadFabricInwards.fabric_inward_sub_occasion}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {occasion.map((other, key) => (
                  <MenuItem key={other.occasion_name} value={other.occasion_name}>
                    {other.occasion_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    select
                    label="Brand"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="fabric_inward_sub_brand"
                    value={downloadFabricInwards.fabric_inward_sub_brand}
                    onChange={(e) => onInputChange(e)}
                    fullWidth
                    >
                        {brand.map((fabric, key) => (
                    <MenuItem key={fabric.fabric_brand_brands} value={fabric.fabric_brand_brands}>
                        {fabric.fabric_brand_brands}
                    </MenuItem>
                    ))}
                </TextField>
                    
                </div>
            </div>
            
            <div className="col-sm-6 col-md-6 col-xl-3">
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
            <div className="col-sm-6 col-md-6 col-xl-3">
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

export default FabricInwardsStockForm;
