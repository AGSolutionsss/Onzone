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

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];

const Edit = (props) => {

    let history = useHistory();
    const [attributes, setAttributes] = useState({
        fabric_type_category: "",
        fabric_type_types: "",
        fabric_type_status: "",
        fabric_type_images: ""
    });
    
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const onInputChange = (e) => {

        setAttributes({
        ...attributes,
        [e.target.name]: e.target.value,
        });
    
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/fetch-attr-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setAttributes(res.data.attr);
          });
        }, []);

        const [attributesTypes, setAttributesTypes] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-attr-types', requestOptions)
      .then(response => response.json())
      .then(data => setAttributesTypes(data.attrType)); 
    }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("fabric_type_category",attributes.fabric_type_category);
        data.append("fabric_type_types",attributes.fabric_type_types);
        data.append("fabric_type_images",selectedFile);
        data.append("fabric_type_status",attributes.fabric_type_status);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-attr/"+id+'?_method=PUT',
            method: "POST",
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
      <PageTitleBar title="Edit Attributes" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off" style={{paddingLeft:'10%',paddingRight:'10%'}}>
          <div className="row">
          <div className="col-md-4 col-12 mt-4">
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
              <img src={"https://houseofonzone.com/admin/storage/app/public/Attributes/"+attributes.fabric_type_images} style={{width:'180px',height:'180px'}}/>
              </div>
              </div>
          </div>
          <div className="col-md-8 col-12 mt-4">
            <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
              <TextField
                  id="select-corrpreffer"
                  select
                  label="Category"
                  SelectProps={{
                      MenuProps: {},
                  }}
                  name="fabric_type_category"
                  value={attributes.fabric_type_category}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                  >
                    {attributesTypes.map((chapter, key) => (
                  <MenuItem key={chapter.attr_type} value={chapter.attr_type}>
                    {chapter.attr_type}
                  </MenuItem>
                ))}
              </TextField>
                
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Attributes Types"
                  autoComplete="Name"
                  name="fabric_type_types"
                  value={attributes.fabric_type_types}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  autoComplete="Name"
                  name="fabric_type_images"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="fabric_type_status"
                  value={attributes.fabric_type_status}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
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
