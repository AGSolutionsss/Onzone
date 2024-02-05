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
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from 'react-select';
import Selectdonor from "./selectdonor";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Add = (props) => {

    let history = useHistory();
    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  var d = document.getElementById("fabric_inward_lr_date");
  
  var today1 = new Date();
  var dd1 = String(today1.getDate()-10).padStart(2, "0");
  var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
  var yyyy1 = today1.getFullYear();
  today1 = mm1 + "/" + dd1 + "/" + yyyy1;
  var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

  if (d) {
    document.getElementById("fabric_inward_lr_date").setAttribute("max", todayback);
    document.getElementById("fabric_inward_lr_date").setAttribute("min", todayback1);
  }

    const [fabricinward, setFabricInward] = useState({
        fabric_inward_supplier: "",
        fabric_inward_lr_no: "",
        fabric_inward_lr_date: todayback,
        fabric_inward_lr_no_bundles: "",
        fabric_inward_remarks: "",
        fabric_inward_sub_data: "",
        fabric_inward_count: "",
        fabric_inward_invoice: "",
        fabric_inward_width: "",
        fabric_inward_brand: ""
    });

    const [fabric_inward_count, setCount] = useState(1);

    const [showmodal, setShowmodal] = useState(false);
    const closegroupModal = () => {
      setShowmodal(false);
    };

    const openmodal = () => {
      setShowmodal(true);
    };
    
    const useTemplate = {fabric_inward_sub_name:"",  fabric_inward_sub_color:"",fabric_inward_sub_design:"",fabric_inward_sub_type:"",fabric_inward_sub_color_theme:"", fabric_inward_sub_occasion:"",fabric_inward_sub_other:"", fabric_inward_sub_length:"", fabric_inward_sub_rate: "", fabric_inward_sub_shrinkage:""};
    //TODO:change variable name to somethig meaningfull
    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
      setUsers([...users,useTemplate]);
      setCount(fabric_inward_count + 1);
    }
    //TODO::change onChange to onItemChange 
    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

    const removeUser = (index) => {
      const filteredUsers = [...users];
      filteredUsers.splice(index, 1);
      setUsers(filteredUsers);
      setCount(fabric_inward_count - 1);
    }

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const validateOnlyDigits = (inputtxt) => {
      var phoneno = /^\d+$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
        return false;
      }
    }
    const [activeProductIndex,setActiveProductIndex] = useState(0);
    const populateCoreName = (selectedProduct) => {
      const tempUsers = [...users];
      tempUsers[activeProductIndex].fabric_inward_sub_name = selectedProduct.core_items_name;
      
      tempUsers[activeProductIndex].fabric_inward_sub_color = selectedProduct.core_items_attr_color;
      tempUsers[activeProductIndex].fabric_inward_sub_design = selectedProduct.core_items_attr_design;
      tempUsers[activeProductIndex].fabric_inward_sub_type = selectedProduct.core_items_attr_type;
      tempUsers[activeProductIndex].fabric_inward_sub_color_theme = selectedProduct.core_items_attr_color_theme;
      tempUsers[activeProductIndex].fabric_inward_sub_occasion = selectedProduct.core_items_attr_occasion;
      tempUsers[activeProductIndex].fabric_inward_sub_rate = selectedProduct.core_items_rate;
      
      setUsers(tempUsers);
      setShowmodal(false);
    }
    
    const [types, setType] = useState([]);
    const setActiveDesignIndex = (e, index) => {
      console.log('debug',e.target.value);
      console.log('debug1',index);

      axios({
        url: baseURL+"/fetch-fab-type-by-id/" + e.target.value,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          setType(res.data.type);
      });
    }
      
    const onInputChange = (e) => {

      if(e.target.name=="fabric_inward_lr_no_bundles"){
        if(validateOnlyDigits(e.target.value)){
          setFabricInward({
            ...fabricinward,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setFabricInward({
        ...fabricinward,
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

    const [types1, setType1] = useState([]);
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
      .then(data => setType1(data.type)); 
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

    

    const [width, setWidth] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-width', requestOptions)
      .then(response => response.json())
      .then(data => setWidth(data.width)); 
    }, []);

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

    

  const [shrinkage, setShrinkage] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-shrinkage', requestOptions)
      .then(response => response.json())
      .then(data => setShrinkage(data.shrinkage)); 
    }, []);

    const onSubmit = (e) => {
      
        let data = {
          fabric_inward_supplier: fabricinward.fabric_inward_supplier,
          fabric_inward_lr_no: fabricinward.fabric_inward_lr_no,
          fabric_inward_lr_date: fabricinward.fabric_inward_lr_date ,
          fabric_inward_lr_no_bundles: fabricinward.fabric_inward_lr_no_bundles,
          fabric_inward_remarks: fabricinward.fabric_inward_remarks,
          fabric_inward_sub_data: users,
          fabric_inward_count:fabric_inward_count,
          fabric_inward_width:fabricinward.fabric_inward_width,
          fabric_inward_invoice:fabricinward.fabric_inward_invoice,
          fabric_inward_brand:fabricinward.fabric_inward_brand,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-fabric-inward",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Fabric Inward" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    select
                    required
                    label="Supplier"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="fabric_inward_supplier"
                    value={fabricinward.fabric_inward_supplier}
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
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="LR No"
                  autoComplete="Name"
                  name="fabric_inward_lr_no"
                  value={fabricinward.fabric_inward_lr_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  id="fabric_inward_lr_date"
                  label="LR Date"
                  type="date"
                  autoComplete="Name"
                  name="fabric_inward_lr_date"
                  InputLabelProps={{ shrink: true }}
                  value={fabricinward.fabric_inward_lr_date}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Invoice"
                  autoComplete="Name"
                  name="fabric_inward_invoice"
                  value={fabricinward.fabric_inward_invoice}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                select
                  fullWidth
                  label="Width"
                  SelectProps={{
                    MenuProps: {},
                }}
                  autoComplete="Name"
                  required
                  name="fabric_inward_width"
                  value={fabricinward.fabric_inward_width}
                  onChange={(e) => onInputChange(e)}
                >
                  {width.map((fabric, key) => (
                    <MenuItem key={fabric.width_mea} value={fabric.width_mea}>
                        {fabric.width_mea}
                    </MenuItem>
                    ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="No of Bundles"
                  autoComplete="Name"
                  name="fabric_inward_lr_no_bundles"
                  value={fabricinward.fabric_inward_lr_no_bundles}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                  <div className="form-group">
                    <TextField
                      id="select-corrpreffer"
                      select
                      required
                      label="Brand"
                      SelectProps={{
                          MenuProps: {},
                      }}
                      name="fabric_inward_brand"
                      value={fabricinward.fabric_inward_brand}
                      onChange={e => onInputChange(e)}
                      fullWidth
                      >
                          {brand.map((fabric, key) => (
                      <MenuItem key={key} value={fabric.fabric_brand_brands}>
                          {fabric.fabric_brand_brands}
                      </MenuItem>
                      ))}
                    </TextField>
                </div>
              </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="fabric_inward_remarks"
                  value={fabricinward.fabric_inward_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <hr/>
            {
              users.map((user, index)=> (
                <div className="row" key={index}>
                <div className="col-sm-12 col-md-12 col-xl-1">
                <div className="form-group">
                  <TextField
                    fullWidth
                    InputLabelProps={{style: {fontSize: 12},shrink: !!user.fabric_inward_sub_name}}
                    label="P Code"
                    autoComplete="Name"
                    name="fabric_inward_sub_name"
                    value={user.fabric_inward_sub_name}
                    onChange={e => onChange(e, index)}
                    onClick={() => {
                      setActiveProductIndex(index)
                      openmodal();
                    }}
                    />
                    
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                <TextField
                  fullWidth
                  label="Length"
                  InputLabelProps={{style: {fontSize: 12}}}
                  autoComplete="Name"
                  required
                  name="fabric_inward_sub_length"
                  value={user.fabric_inward_sub_length}
                  onChange={e => onChange(e, index)}
                />
                </div>
                </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Color"
                  InputLabelProps={{style: {fontSize: 12}}}
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_color"
                  value={user.fabric_inward_sub_color}
                  onChange={e => onChange(e, index)}
                  fullWidth
                  >
                    {colors.map((color, key) => (
                  <MenuItem key={key} value={color.attr_colour_name}>
                    {color.attr_colour_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-2">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Design"
                  InputLabelProps={{style: {fontSize: 12}}}
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_design"
                  value={user.fabric_inward_sub_design}
                  onChange={(e) => {
                    onChange(e, index),
                    setActiveDesignIndex(e, index)
                  }}
                  fullWidth
                  >
                    {designs.map((design, key) => (
                  <MenuItem key={key} value={design.attr_design_name}>
                    {design.attr_design_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-2">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Type"
                  InputLabelProps={{style: {fontSize: 12}}}
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_type"
                  value={user.fabric_inward_sub_type}
                  onChange={e => onChange(e, index)}
                  fullWidth
                  >
                    {types.map((design, key) => (
                  <MenuItem key={key} value={design.attr_fabric_type_name}>
                    {design.attr_fabric_type_name}
                  </MenuItem>
                ))}
              </TextField>
              {user.fabric_inward_sub_type}
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Theme"
                  InputLabelProps={{style: {fontSize: 12}}}
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_color_theme"
                  value={user.fabric_inward_sub_color_theme}
                  onChange={e => onChange(e, index)}
                  fullWidth
                  >
                    {colortheme.map((colortheme, key) => (
                  <MenuItem key={colortheme.attr_colour_theme_name} value={colortheme.attr_colour_theme_name}>
                    {colortheme.attr_colour_theme_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Occasion"
                  InputLabelProps={{style: {fontSize: 12}}}
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_inward_sub_occasion"
                  value={user.fabric_inward_sub_occasion}
                  onChange={e => onChange(e, index)}
                  fullWidth
                  >
                    {occasion.map((occasion, key) => (
                  <MenuItem key={key} value={occasion.occasion_name}>
                    {occasion.occasion_name}
                  </MenuItem>
                ))}
              </TextField>
              
              </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
                <div className="form-group">
                  <TextField
                    fullWidth
                    SelectProps={{
                      MenuProps: {},
                    }}
                  select
                    label="Shrinkage"
                    InputLabelProps={{style: {fontSize: 12}}}
                    autoComplete="Name"
                    name="fabric_inward_sub_shrinkage"
                    value={user.fabric_inward_sub_shrinkage}
                    onChange={e => onChange(e, index)}
                  >
                    {shrinkage.map((fabric, key) => (
                      <MenuItem key={key} value={fabric.shrinkage_length+"x"+fabric.shrinkage_width}>
                          {fabric.shrinkage_length}{"x"}{fabric.shrinkage_width}
                      </MenuItem>
                    ))}    
                  </TextField>
                </div>
                </div>
                
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                <TextField
                  fullWidth
                  label="Rate"
                  autoComplete="Name"
                  InputLabelProps={{style: {fontSize: 12}}}
                  name="fabric_inward_sub_rate"
                  value={user.fabric_inward_sub_rate}
                  onChange={e => onChange(e, index)}
                />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-1">
                          <IconButton onClick={() => removeUser(index)}>
                          <DeleteIcon/>
                          </IconButton>
              </div>
              </div>
              ))
            }
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem(e)}>
                  Add More</Button>
              </div>
            </div>
            <div className="row mt-4">
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
      <Modal isOpen={showmodal} toggle={() => closegroupModal()} size="lg" style={{maxWidth: '705px', width: '100%'}}>
        <ModalHeader toggle={() => closegroupModal()}>Select P Code</ModalHeader>
        <ModalBody>
          <Selectdonor populateCoreName={populateCoreName}/>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};
export default Add;