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

const Edit = (props) => {

    let history = useHistory();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var midate = "04/04/2022"
    var todayback = yyyy + "-" + mm + "-" + dd;
    var d = document.getElementById("fabric_inward_lr_date");
    if (d) {
      document.getElementById("fabric_inward_lr_date").setAttribute("max", todayback);
      
    }
    const [fabricinward, setFabricInward] = useState({
      fabric_inward_supplier: "",
      fabric_inward_lr_no: "",
      fabric_inward_lr_date: "",
      fabric_inward_lr_no_bundles: "",
      fabric_inward_remarks: "",
      fabric_inward_sub_data: "",
      fabric_inward_count: "",
      fabric_inward_invoice: "",
      fabric_inward_width: ""
    });

    const useTemplate = {fabric_inward_sub_name:"", fabric_inward_sub_brand:"", fabric_inward_sub_color:"",fabric_inward_sub_design:"",fabric_inward_sub_type:"",fabric_inward_sub_other:"", fabric_inward_sub_length:"", fabric_inward_sub_rate: "",fabric_inward_sub_id:"",fabric_inward_sub_shrinkage:"",fabric_inward_sub_color_theme:"", fabric_inward_sub_occasion:""};
    const [users, setUsers] = useState([useTemplate]);
    
    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

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

    

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/fetch-fabric-inward-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setFabricInward(res.data.fabricInward);
            setUsers(res.data.fabricInwardSub);
          });
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

          const [coreitems, setCoreitems] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-core-items', requestOptions)
      .then(response => response.json())
      .then(data => setCoreitems(data.coreitems)); 
    }, []);

    const [coreotheritem, setCoreOtherItem] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-core-items-by-code/'+users.fabric_inward_sub_name, requestOptions)
      .then(response => response.json())
      .then(data => setCoreOtherItem(data.coreotheritem)); 
    }, [users.fabric_inward_sub_name]);

    const onSubmit = (e) => {
      let data = {
        fabric_inward_supplier: fabricinward.fabric_inward_supplier,
        fabric_inward_lr_no: fabricinward.fabric_inward_lr_no,
        fabric_inward_lr_date: fabricinward.fabric_inward_lr_date ,
        fabric_inward_lr_no_bundles: fabricinward.fabric_inward_lr_no_bundles,
        fabric_inward_remarks: fabricinward.fabric_inward_remarks,
        fabric_inward_sub_data: users,
        fabric_inward_count: fabricinward.fabric_inward_count,
        fabric_inward_width:fabricinward.fabric_inward_width,
        fabric_inward_invoice:fabricinward.fabric_inward_invoice,
      };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-fabric-inward/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Fabric Inward" match={props.match} />
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
                        {supplier.map((chapter, key) => (
                    <MenuItem key={chapter.supplier_name} value={chapter.supplier_name}>
                        {chapter.supplier_name}
                    </MenuItem>
                    ))}
                </TextField>
                
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
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
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="LR Date"
                  id="fabric_inward_lr_date"
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
                  fullWidth
                  select
                  label="Width"
                  required
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                }}
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
            <div className="col-sm-12 col-md-12 col-xl-12">
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
                    label="Name"
                    autoComplete="Name"
                    name="fabric_inward_sub_id"
                    hidden
                    value={user.id}
                    onChange={e => onChange(e, index)}
                  />
                   <TextField
                    fullWidth
                    InputLabelProps={{style: {fontSize: 12}}}
                    label="P Code"
                    autoComplete="Name"
                    SelectProps={{
                      MenuProps: {},
                    }}
                  select
                    name="fabric_inward_sub_name"
                    value={user.fabric_inward_sub_name}
                    onChange={e => onChange(e, index)}
                    >
                    {coreitems.map((coreitem, key) => (
                <MenuItem key={coreitem.core_items_name} value={coreitem.core_items_name}>
                    {coreitem.core_items_name}
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
                      label="Brand"
                      InputLabelProps={{style: {fontSize: 12}}}
                      SelectProps={{
                          MenuProps: {},
                      }}
                      name="fabric_inward_sub_brand"
                      value={user.fabric_inward_sub_brand}
                      onChange={e => onChange(e, index)}
                      fullWidth
                      >
                          {brand.map((chapter, key) => (
                      <MenuItem key={chapter.fabric_brand_brands} value={chapter.fabric_brand_brands}>
                          {chapter.fabric_brand_brands}
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
                  <MenuItem key={color.attr_colour_name} value={color.attr_colour_name}>
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
                  onChange={e => onChange(e, index)}
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
              <div className="col-sm-12 col-md-12 col-xl-1">
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
                  <MenuItem key={design.attr_fabric_type_name} value={design.attr_fabric_type_name}>
                    {design.attr_fabric_type_name}
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
                  <MenuItem key={occasion.occasion_name} value={occasion.occasion_name}>
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
                      <MenuItem key={fabric.shrinkage_length} value={fabric.shrinkage_length+"x"+fabric.shrinkage_width}>
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
              </div>
              ))
            }
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
              Update
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

export default Edit;
