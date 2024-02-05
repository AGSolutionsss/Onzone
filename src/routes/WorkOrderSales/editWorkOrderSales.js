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
    
    const [workorder, setWorkOrderSales] = useState({
        
        work_order_sa_date: "",
        work_order_sa_retailer_id: "",
        work_order_sa_dc_no: "",
        work_order_sa_dc_date: "",
        work_order_sa_retailer_name: "",
        work_order_sa_box: "",
        work_order_sa_pcs: "",
        work_order_sa_fabric_sale: "",
        work_order_sa_count: "",
        work_order_sa_remarks: "",
        workorder_sub_sa_data: "",
        
    });

    

    const useTemplate = {id:"",work_order_sa_sub_barcode:""};
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
    if(e.target.name=="work_order_sa_box"){
      if(validateOnlyDigits(e.target.value)){
        setWorkOrderSales({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    }else if(e.target.name=="work_order_sa_pcs"){
      if(validateOnlyDigits(e.target.value)){
        setWorkOrderSales({
          ...workorder,
          [e.target.name]: e.target.value,
        });
      }
    }else{
      setWorkOrderSales({
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
            url: baseURL+"/fetch-work-order-sales-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setWorkOrderSales(res.data.workordersales);
            setUsers(res.data.workordersalessub);
          });
        }, []);

        

    const onSubmit = (e) => {
      
        let data = {
            work_order_sa_dc_no: workorder.work_order_sa_dc_no ,
            work_order_sa_dc_date: workorder.work_order_sa_dc_date,
            work_order_sa_box: workorder.work_order_sa_box,
            work_order_sa_pcs: workorder.work_order_sa_pcs,
            work_order_sa_fabric_sale: workorder.work_order_sa_fabric_sale,
            work_order_sa_remarks:workorder.work_order_sa_remarks,
            workorder_sub_sa_data: users,
            work_order_sa_count:workorder.work_order_sa_count,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-work-orders-sales/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Sales Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Update Work Order Sales" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                        required
                        label="Retailers"
                        disabled
                        name="work_order_sa_retailer_name"
                        value={workorder.work_order_sa_retailer_name}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-4">
                    <div className="form-group">
                        <TextField
                            required
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Sales Date"
                            disabled
                            name="work_order_sa_date"
                            value={workorder.work_order_sa_date}
                            onChange={(e) => onInputChange(e)}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-4">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        label="DC No"
                        autoComplete="Name"
                        name="work_order_sa_dc_no"
                        value={workorder.work_order_sa_dc_no}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="DC Date"
                        autoComplete="Name"
                        name="work_order_sa_dc_date"
                        value={workorder.work_order_sa_dc_date}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        required
                        label="No of Box"
                        autoComplete="Name"
                        name="work_order_sa_box"
                        value={workorder.work_order_sa_box}
                        onChange={(e) => onInputChange(e)}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        required
                        label="Total No of Pcs"
                        name="work_order_sa_pcs"
                        value={workorder.work_order_sa_pcs}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                    />
                </div>
            </div>           
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Fabric Sales"
                  required
                  name="work_order_sa_fabric_sale"
                  value={workorder.work_order_sa_fabric_sale}
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
                  name="work_order_sa_remarks"
                  value={workorder.work_order_sa_remarks}
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
                    name="work_order_sa_sub_barcode"
                  value={user.work_order_sa_sub_barcode}
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