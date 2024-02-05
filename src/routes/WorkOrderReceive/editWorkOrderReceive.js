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

const work_receive = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
];

const Edit = (props) => {

    let history = useHistory();
    
    const [workorder, setWorkOrderReceive] = useState({
        work_order_rc_factory_no: "",
        work_order_rc_id: "",
        work_order_rc_date: "",
        work_order_rc_dc_no: "",
        work_order_rc_dc_date: "",
        work_order_rc_brand: "",
        work_order_rc_box: "",
        work_order_rc_pcs: "",
        work_order_rc_fabric_received: "",
        work_order_rc_received_by: "",
        work_order_rc_count: "",
        work_order_rc_remarks: "",
        workorder_sub_rc_data: "",
        
    });

    

    const useTemplate = {id:"",work_order_rc_sub_barcode:""};
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
    if(e.target.name=="work_order_rc_box"){
      if(validateOnlyDigits(e.target.value)){
        setWorkOrderReceive({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    }else if(e.target.name=="work_order_rc_pcs"){
      if(validateOnlyDigits(e.target.value)){
        setWorkOrderReceive({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    }else{
      setWorkOrderReceive({
        ...workorder,
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
    
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/fetch-work-order-received-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setWorkOrderReceive(res.data.workorderrc);
            setUsers(res.data.workorderrcsub);
          });
        }, []);

        

    const onSubmit = (e) => {
      
        let data = {
            work_order_rc_dc_no: workorder.work_order_rc_dc_no ,
            work_order_rc_dc_date: workorder.work_order_rc_dc_date,
            work_order_rc_box: workorder.work_order_rc_box,
            work_order_rc_pcs: workorder.work_order_rc_pcs,
            work_order_rc_fabric_received: workorder.work_order_rc_fabric_received,
            work_order_rc_remarks:workorder.work_order_rc_remarks,
            workorder_sub_rc_data: users,
            work_order_rc_count:workorder.work_order_rc_count,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-work-orders-received/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Receive Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Update Work Order Receive" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        required
                        label="Factory"
                        disabled
                        name="work_order_rc_factory_no"
                        value={workorder.work_order_rc_factory_no}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                            required
                            label="Work Order ID"
                            disabled
                            name="work_order_rc_id"
                            value={workorder.work_order_rc_id}
                            onChange={(e) => onInputChange(e)}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        disabled
                        label="Receive Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="Name"
                        name="work_order_rc_date"
                        value={workorder.work_order_rc_date}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="DC No"
                        disabled
                        autoComplete="Name"
                        name="work_order_rc_dc_no"
                        value={workorder.work_order_rc_dc_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        disabled
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="DC Date"
                        autoComplete="Name"
                        name="work_order_rc_dc_date"
                        value={workorder.work_order_rc_dc_date}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        
                        required
                        label="Brand"
                        disabled
                        name="work_order_rc_brand"
                        value={workorder.work_order_rc_brand}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                    />
                </div>
            </div>           
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="No of Box"
                  required
                  name="work_order_rc_box"
                  value={workorder.work_order_rc_box}
                  onChange={(e) => onInputChange(e)}
                />
                    
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Total No of Pcs"
                  autoComplete="Name"
                  required
                  name="work_order_rc_pcs"
                  value={workorder.work_order_rc_pcs}
                  onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Fabric Received By"
                  autoComplete="Name"
                  required
                  name="work_order_rc_received_by"
                  value={workorder.work_order_rc_received_by}
                  onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Fabric Received"
                  autoComplete="Name"
                  required
                  select
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="work_order_rc_fabric_received"
                  value={workorder.work_order_rc_fabric_received}
                  onChange={(e) => onInputChange(e)}
                >
                  {work_receive.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="work_order_rc_remarks"
                  value={workorder.work_order_rc_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            
            </div>
            <hr/>
            {
              users.map((user, index)=> (
                <div className="row" key={index}>
                <div className="col-sm-12 col-md-12 col-xl-12">
                  <div className="form-group">
                  <TextField
                      fullWidth
                      label="sub id"
                      hidden
                      required
                      autoComplete="Name"
                      name="id"
                      value={user.id}
                      onChange={e => onChange(e, index)}
                    />
                    
                <TextField
                  fullWidth
                  label="T Code"
                  autoComplete="Name"
                  required
                    name="work_order_rc_sub_barcode"
                  value={user.work_order_rc_sub_barcode}
                  onChange={e => onChange(e, index)}
                />
                    
                </div>
                </div>
              </div>
              ))
            }
            
            <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              
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