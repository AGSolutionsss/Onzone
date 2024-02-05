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
    const [type, setType] = useState({
        attr_fabric_type_design: "",
        attr_fabric_type_name: "",
        attr_fabric_type_status: "",
        attr_fabric_type_image: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const onInputChange = (e) => {

        setType({
        ...type,
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
            url: baseURL+"/fetch-fab-types-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setType(res.data.fabtype)
      
          });
        }, []);

    const onSubmit = (e) => {
        const data = new FormData();
        data.append("attr_fabric_type_design",type.attr_fabric_type_design);
        data.append("attr_fabric_type_name",type.attr_fabric_type_name);
        data.append("attr_fabric_type_image",selectedFile);
        data.append("attr_fabric_type_status",type.attr_fabric_type_status);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-fab-types/"+id+'?_method=PUT',
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Type Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    const [design, setDesign] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-design', requestOptions)
      .then(response => response.json())
      .then(data => setDesign(data.design)); 
    }, []);

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Type" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off" style={{paddingLeft:'10%',paddingRight:'10%'}}>
          <div className="row">
            <div className="col-md-4 col-12 mt-4">
              <img src={(type.attr_fabric_type_image  === null || type.attr_fabric_type_image === '' ? "https://houseofonzone.com/admin/storage/app/public/no_image.jpg" : "https://houseofonzone.com/admin/storage/app/public/Type/"+type.attr_fabric_type_image)} style={{width:'215px',height:'215px'}}/>
            </div>
            <div className="col-md-8 col-12 mt-4">
            <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Design"
                  autoComplete="Name"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  select
                  name="attr_fabric_type_design"
                  value={type.attr_fabric_type_design}
                  onChange={(e) => onInputChange(e)}
                  >
                  {design.map((fabric, key) => (
                  <MenuItem key={key} value={fabric.attr_design_name}>
                      {fabric.attr_design_name}
                  </MenuItem>
                  ))}
              </TextField>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-xl-12">
                <div className="form-group">
                  <TextField
                    fullWidth
                    required
                    label="Type"
                    autoComplete="Name"
                    name="attr_fabric_type_name"
                    value={type.attr_fabric_type_name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-12">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Image"
                  autoComplete="Name"
                  name="attr_fabric_type_image"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-12">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="attr_fabric_type_status"
                  value={type.attr_fabric_type_status}
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