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
    
    const [factory, setFactory] = useState({
        factory_name: "",
        factory_address: "",
        factory_gstin: "",
        factory_contact_name: "",
        factory_contact_mobile: "",
        factory_status: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

      const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }else{
          return false;
        }
      }
      
      const validateOnlyText = (inputtxt) => {

        var re = /^[A-Za-z ]+$/;
        if(inputtxt === "" || re.test(inputtxt)){
          return true;
        }else{
          return false;
        }
      }
  

      const onInputChange = (e) => {

        if(e.target.name=="factory_contact_mobile"){
          if(validateOnlyDigits(e.target.value)){
            setFactory({
              ...factory,
              [e.target.name]: e.target.value,
            });
          }
        }else if(e.target.name=="factory_contact_name"){
          if(validateOnlyText(e.target.value)){
            setFactory({
              ...factory,
              [e.target.name]: e.target.value,
            });
          }
        }else{
          setFactory({
          ...factory,
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
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/fetch-attr', requestOptions)
      .then(response => response.json())
      .then(data => setAttrs(data.attr)); 
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
            url: baseURL+"/fetch-factory-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setFactory(res.data.factory);
          });
        }, []);

    const onSubmit = (e) => {
      e.preventDefault();
      if((factory.factory_contact_mobile.length !== 10)){
        NotificationManager.error("Mobile Number allow only 10 Digits");
        return false;
      }
      let data = {
        factory_name: factory.factory_name,
        factory_address: factory.factory_address,
        factory_gstin: factory.factory_gstin ,
        factory_contact_name: factory.factory_contact_name,
        factory_contact_mobile: factory.factory_contact_mobile,
        factory_status: factory.factory_status,
      };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-factory/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Factory Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Factory" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                    fullWidth
                    required
                    label="Factory Name"
                    autoComplete="Name"
                    name="factory_name"
                    value={factory.factory_name}
                    onChange={(e) => onInputChange(e)}
                  />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-8">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Address"
                  autoComplete="Name"
                  name="factory_address"
                  value={factory.factory_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="GSTIN"
                  autoComplete="Name"
                  name="factory_gstin"
                  value={factory.factory_gstin}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
              <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Contact Name"
                  autoComplete="Name"
                  name="factory_contact_name"
                  value={factory.factory_contact_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile"
                  autoComplete="Name"
                  name="factory_contact_mobile"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={factory.factory_contact_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-3">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="factory_status"
                  value={factory.factory_status}
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
