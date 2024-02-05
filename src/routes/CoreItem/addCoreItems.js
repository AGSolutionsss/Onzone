import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MenuItem from "@material-ui/core/MenuItem";
import { Select, Chip,InputLabel, FormControl } from '@material-ui/core';

const Add = (props) => {

    let history = useHistory();
    const [coreitem, setCoreItem] = useState({
        core_items_name: "",
        core_items_brand: "",
        core_items_attr_color: "",
        core_items_attr_design: "",
        core_items_attr_type: "",
        core_items_attr_color_theme: "",
        core_items_attr_occasion: "",
        core_items_image: "",
        core_items_rate: "",
        core_items_nick_name: ""
    });
    const [selectedFile, setSelectedFile] = React.useState(null);
   
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyDigits = (inputtxt) => {
       var phoneno = /^\d+$/;
       if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
     }

    const onInputChange = (e) => {
      if(e.target.name=="core_items_rate"){
        if(validateOnlyDigits(e.target.value)){
          setCoreItem({
            ...coreitem,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setCoreItem({
          ...coreitem,
          [e.target.name]: e.target.value,
        });
      }
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const [brands, setBrands] = useState([]);
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
      .then(data => setBrands(data.brand)); 
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
  
  
      fetch(baseURL+'/fetch-fab-type-by-id/'+coreitem.core_items_attr_design, requestOptions)
      .then(response => response.json())
      .then(data => setType(data.type)); 
    }, [coreitem.core_items_attr_design]);

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

    
    const onSubmitSave = (e) => {
      const data = new FormData();
      data.append("core_items_name",coreitem.core_items_name);
      data.append("core_items_brand",coreitem.core_items_brand);
      data.append("core_items_attr_color",coreitem.core_items_attr_color);
      data.append("core_items_attr_design",coreitem.core_items_attr_design);
      data.append("core_items_attr_type",coreitem.core_items_attr_type);
      data.append("core_items_attr_color_theme",coreitem.core_items_attr_color_theme);
      data.append("core_items_attr_occasion",coreitem.core_items_attr_occasion);
      data.append("core_items_image",selectedFile);
      data.append("core_items_rate",coreitem.core_items_rate);
      data.append("core_items_nick_name",coreitem.core_items_nick_name);
      
      var url = new URL(window.location.href);
      var id = url.searchParams.get("id");

      var v = document.getElementById("addIndiv").checkValidity();
      var v = document.getElementById("addIndiv").reportValidity();
      e.preventDefault();

      if (v) {
      setIsButtonDisabled(true)
      axios({
          url: baseURL+"/create-core-items",
          method: "POST",
          data,
          headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
          "Content-Type": "multipart/form-data"
          },
      }).then((res) => {
          if(res.data.code == '200'){
              NotificationManager.success("Core Item Created Sucessfully");
              setIsButtonDisabled(false)
          }else{
              NotificationManager.error("Duplicate Entry of P Code");
          }
          
      });
      }
  };

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("core_items_name",coreitem.core_items_name);
        data.append("core_items_brand",coreitem.core_items_brand);
        data.append("core_items_attr_color",coreitem.core_items_attr_color);
        data.append("core_items_attr_design",coreitem.core_items_attr_design);
        data.append("core_items_attr_type",coreitem.core_items_attr_type);
        data.append("core_items_attr_color_theme",coreitem.core_items_attr_color_theme);
        data.append("core_items_attr_occasion",coreitem.core_items_attr_occasion);
        data.append("core_items_image",selectedFile);
        data.append("core_items_rate",coreitem.core_items_rate);
        data.append("core_items_nick_name",coreitem.core_items_nick_name);
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-core-items",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            "Content-Type": "multipart/form-data"
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Core Item Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry of P Code");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Core Item" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  
                  label="Name"
                  autoComplete="Name"
                  name="core_items_nick_name"
                  value={coreitem.core_items_nick_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Brand"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="core_items_brand"
                  value={coreitem.core_items_brand}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {brands.map((chapter, key) => (
                  <MenuItem key={chapter.fabric_brand_brands} value={chapter.fabric_brand_brands}>
                    {chapter.fabric_brand_brands}
                  </MenuItem>
                ))}
              </TextField>
                
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Color"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="core_items_attr_color"
                  value={coreitem.core_items_attr_color}
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
                  name="core_items_attr_design"
                  value={coreitem.core_items_attr_design}
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
                  name="core_items_attr_type"
                  value={coreitem.core_items_attr_type}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {types.map((design, key) => (
                  <MenuItem key={key} value={design.attr_fabric_type_name}>
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
                  name="core_items_attr_color_theme"
                  value={coreitem.core_items_attr_color_theme}
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
                  name="core_items_attr_occasion"
                  value={coreitem.core_items_attr_occasion}
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
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  inputProps={{ maxLength: 8 }}
                  label="Rate"
                  autoComplete="Name"
                  name="core_items_rate"
                  value={coreitem.core_items_rate}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="P Code"
                  autoComplete="Name"
                  name="core_items_name"
                  value={coreitem.core_items_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  autoComplete="Name"
                  name="core_items_image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
            </Button>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmitSave(e)}
              disabled={isButtonDisabled}
            >
               Submit & Duplicate
            </Button>
            <Link to="listing">
              <Button className="mr-10 mb-10" color="success">
                Back
              </Button>
            </Link>
          </div>
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;