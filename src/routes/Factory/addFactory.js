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
import { Select, Chip,InputLabel } from '@material-ui/core';

const Add = (props) => {

    let history = useHistory();

    const [factory, setFactory] = useState({
        factory_name: "",
        factory_address: "",
        factory_gstin: "",
        factory_contact_name: "",
        factory_contact_mobile: ""
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
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-factory",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Factory Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Factory" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    required
                    label="Factory Name"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="factory_name"
                    value={factory.factory_name}
                    onChange={(e) => onInputChange(e)}
                    fullWidth
                    />
                    
                    
                </div>
                </div>
            <div className="col-sm-12 col-md-12 col-xl-8">
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
            <div className="col-sm-12 col-md-12 col-xl-4">
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
            
            <div className="col-sm-12 col-md-12 col-xl-4">
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
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Mobile"
                  autoComplete="Name"
                  name="factory_contact_mobile"
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  value={factory.factory_contact_mobile}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
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
    </div>
  );
};

export default Add;