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

const retailer_type = [
    {
      value: "Agent",
      label: "Agent",
    },
    {
      value: "Wholesale",
      label: "Wholesale",
    },
    {
        value: "Distributor",
        label: "Distributor",
    },
    {
      value: "Retailers",
      label: "Retailers",
    },
];

const Edit = (props) => {

    let history = useHistory();
    const [customer, setCustomer] = useState({
        customer_name: "",
        customer_type: "",
        customer_mobile: "",
        customer_email: "",
        customer_address: "",
        customer_status: "",
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
        if(e.target.name=="customer_mobile"){
            if(validateOnlyDigits(e.target.value)){
                setCustomer({
                ...customer,
                [e.target.name]: e.target.value,
              });
            }
        }else{
            setCustomer({
                ...customer,
                [e.target.name]: e.target.value,
            });
        }
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
            url: baseURL+"/fetch-customer-by-Id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setCustomer(res.data.customer)
      
          });
        }, []);

    const onSubmit = (e) => {
        let data = {
            customer_name: customer.customer_name,
            customer_type: customer.customer_type,
            customer_mobile: customer.customer_mobile ,
            customer_email: customer.customer_email,
            customer_address: customer.customer_address,
            customer_status: customer.customer_status,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-customer/"+id,
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
      <PageTitleBar title="Edit Retailer" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Retailer Name"
                  autoComplete="Name"
                  name="customer_name"
                  value={customer.customer_name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Type"
                  autoComplete="Name"
                  name="customer_type"
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  value={customer.customer_type}
                  onChange={(e) => onInputChange(e)}
                >
                {retailer_type.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
              
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Mobile No"
                  autoComplete="Name"
                  name="customer_mobile"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={customer.customer_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="email"
                  label="Email Id"
                  autoComplete="Name"
                  name="customer_email"
                  value={customer.customer_email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-8">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Address"
                  autoComplete="Name"
                  name="customer_address"
                  value={customer.customer_address}
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
                  name="customer_status"
                  value={customer.customer_status}
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