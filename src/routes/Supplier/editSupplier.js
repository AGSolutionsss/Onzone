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
    const [supplier, setSupplier] = useState({
        supplier_name: "",
        supplier_mobile: "",
        supplier_email: "",
        supplier_address: "",
        supplier_state: "",
        supplier_city: "",
        supplier_status: "",
        supplier_gst: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
        axios({
          url: baseURL+"/fetch-supplier-by-Id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
            setSupplier(res.data.supplier)
    
        });
      }, []);

      const [state, setState] = useState([]);
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


    fetch(baseURL+'/fetch-state', requestOptions)
    .then(response => response.json())
    .then(data => setState(data.state)); 
  }, []);


  const validateOnlyDigits = (inputtxt) => {

 
  var phoneno = /^\d+$/;
  if(inputtxt.match(phoneno) || inputtxt.length==0){
      return true;
        }
      else
        {
        
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

    if(e.target.name=="supplier_mobile"){

      if(validateOnlyDigits(e.target.value)){
        setSupplier({
          ...supplier,
          [e.target.name]: e.target.value,
        });
      }
        
      
       
    }else if(e.target.name=="supplier_city"){
      if(validateOnlyText(e.target.value)){
        setSupplier({
          ...supplier,
          [e.target.name]: e.target.value,
        });
      }
    } else{

        setSupplier({
      ...supplier,
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

  const onSubmit = (e) => {
    let data = {
      supplier_name: supplier.supplier_name,
      supplier_mobile: supplier.supplier_mobile,
      supplier_email: supplier.supplier_email,
      supplier_address: supplier.supplier_address,
      supplier_state: supplier.supplier_state,
      supplier_city: supplier.supplier_city,
      supplier_status: supplier.supplier_status,
      supplier_gst: supplier.supplier_gst,
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    var v = document.getElementById("addIndiv").checkValidity();
    var v = document.getElementById("addIndiv").reportValidity();
    e.preventDefault();

    if (v) {
      setIsButtonDisabled(true)
      axios({
        url: baseURL+"/update-supplier/"+id,
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
      <PageTitleBar title="Edit Supplier" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  autoComplete="Name"
                  name="supplier_name"
                  value={supplier.supplier_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile Phone"
                  type="text"
                  style={{ MozAppearance:'textfield'}}
                  autoComplete="Name"
                  name="supplier_mobile"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={supplier.supplier_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="Name"
                  name="supplier_email"
                  value={supplier.supplier_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-8">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Address"
                  autoComplete="Name"
                  name="supplier_address"
                  value={supplier.supplier_address}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  select
                  label="State"
                  autoComplete="Name"
                  name="supplier_state"
                  SelectProps={{
                    MenuProps: {},
                }}
                  value={supplier.supplier_state}
                  onChange={(e) => onInputChange(e)}
                >
                  {state.map((fabric, key) => (
                    <MenuItem key={fabric.state_name} value={fabric.state_name}>
                        {fabric.state_name}
                    </MenuItem>
                    ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="City"
                  autoComplete="Name"
                  name="supplier_city"
                  value={supplier.supplier_city}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="GST"
                  autoComplete="Name"
                  name="supplier_gst"
                  value={supplier.supplier_gst}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-xl-4">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="supplier_status"
                  value={supplier.supplier_status}
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
            <div className="col-sm-6 col-md-6 col-xl-12">
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