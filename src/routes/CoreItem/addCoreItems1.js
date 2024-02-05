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
        core_items_attr: "",
        core_items_image: "",
        core_items_rate: "",
        core_items_nick_name: ""
    });
    const [selectedFile, setSelectedFile] = React.useState(null);
   
    const [selected, setSelected] = useState([]);
    const selectionChangeHandler = (event) => {
        var new_id=[];
        setSelected(event.target.value);
        
        new_id = event.target.value
        localStorage.setItem("selectedAttr", new_id+'');
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

    const [attrs, setAttrs] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-attr', requestOptions)
      .then(response => response.json())
      .then(data => setAttrs(data.attr)); 
    }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("core_items_name",coreitem.core_items_name);
        data.append("core_items_brand",coreitem.core_items_brand);
        data.append("core_items_attr",localStorage.getItem("selectedAttr"));
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
      <PageTitleBar title="Create Core Item" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Core Item Name"
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
              <FormControl fullWidth>
              <InputLabel>Attributes</InputLabel>
              <Select
                    label="Attributes"
                    multiple
                    value={selected}
                    fullWidth
                    onChange={selectionChangeHandler}
                    renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                        <Chip key={value} label={value} />
                        ))}
                    </div>
                    )}
                >
                    {attrs.map((chapters, key) => (
                            <MenuItem key={chapters.id} value={chapters.fabric_type_types}>
                                {chapters.fabric_type_category}{" - "}{chapters.fabric_type_types}
                            </MenuItem>
                            ))}
                </Select>
                </FormControl>
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
                  
                  label="Nick Name"
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