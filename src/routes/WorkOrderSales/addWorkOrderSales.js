import React, { useEffect, useState, useRef } from "react";
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
import dateyear from '../dateyear';
import Select from 'react-select';
import useScanDetection from "use-scan-detection";
import './workordersales.css';

const Add = (props) => {
  const inputRefs = useRef([]);
    let history = useHistory();
    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;
    
    const [workorder, setWorkOrderSales] = useState({
        work_order_sa_year: dateyear,
        work_order_sa_date: todayback,
        work_order_sa_retailer_id: "",
        work_order_sa_dc_no: "",
        work_order_sa_dc_date: todayback,
        work_order_sa_box: "",
        work_order_sa_pcs: "",
        work_order_sa_fabric_sale: "",
        work_order_sa_count: "",
        work_order_sa_remarks: "",
        workorder_sub_sa_data: "",
    });

    const [work_order_count, setCount] = useState(1);

    const useTemplate = {work_order_sa_sub_barcode:""};
    
    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
      setUsers([...users,useTemplate]);
      setCount(work_order_count + 1);
    }
  
    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
      
    };

    const onChanges = (e, index) =>{
      useScanDetection({
        onComplete: updatedUsers = users.map((user, i) => index == i ? Object.assign(user,{[e.target.name]: e.target.value}) : user )
      })
      setUsers(updatedUsers);
    };

    const removeUser = (index) => {
      const filteredUsers = [...users];
      filteredUsers.splice(index, 1);
      setUsers(filteredUsers);
      setCount(work_order_count - 1);
    }

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

    const [retailer, setRetailer] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-customer', requestOptions)
      .then(response => response.json())
      .then(data => setRetailer(data.customer)); 
    }, []);

    const [workorderReceive, setWorkOrderReceive] = useState([]);
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
        fetch(baseURL+'/fetch-work-order-receive' , requestOptions)
        .then(response => response.json())
        .then(data => setWorkOrderReceive(data.workorderreceive)); 
    }, []);
    

    const onSubmit = (e) => {
      
        let data = {
            work_order_sa_year: dateyear,
            work_order_sa_date: workorder.work_order_sa_date,
            work_order_sa_retailer_id: workorder.work_order_sa_retailer_id,
            work_order_sa_dc_no: workorder.work_order_sa_dc_no,
            work_order_sa_dc_date: workorder.work_order_sa_dc_date,
            work_order_sa_box: workorder.work_order_sa_box,
            work_order_sa_pcs: workorder.work_order_sa_pcs,
            work_order_sa_fabric_sale: workorder.work_order_sa_fabric_sale,
            work_order_sa_count:work_order_count,
            work_order_sa_remarks:workorder.work_order_sa_remarks,
            workorder_sub_sa_data: users,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-work-order-sales",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Sales Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    const CheckBarcode = (test,selectedValue) => {
      
      const barcodeId = test.target.value;
      if(barcodeId.length == 9){
        var theLoginToken = localStorage.getItem('login');   
        const requestOptions = {
          method: 'GET', 
          headers: {
          'Authorization': 'Bearer '+theLoginToken
          }             
        }; 
        fetch(baseURL+'/fetch-work-order-receive-check/'+barcodeId, requestOptions)
        .then(response => response.json())
        .then((response) => {
          
          if(response.code == '200'){
            setUsers([...users,useTemplate]);
            setCount(work_order_count + 1);
            NotificationManager.success("Barcode Found");
            const nextIndex = selectedValue + 1; 
            inputRefs.current[nextIndex].focus();  
        }else{
            NotificationManager.error("Barcode Not Found");
        }
          
        });
      }else{}
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Work Order Sales" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        select
                        required
                        label="Retailers"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_sa_retailer_id"
                        value={workorder.work_order_sa_retailer_id}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {retailer.map((retailers, key) => (
                        <MenuItem key={key} value={retailers.id}>
                            {retailers.customer_name}
                        </MenuItem>
                        ))}
                    </TextField>
                    
                </div>
                </div>
                
                <div className="col-sm-12 col-md-12 col-xl-4">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
                        label="Sales Date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoComplete="Name"
                        name="work_order_sa_date"
                        value={workorder.work_order_sa_date}
                        onChange={(e) => onInputChange(e)}
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
                  label="No of Box"
                  required
                  name="work_order_sa_box"
                  value={workorder.work_order_sa_box}
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
                  name="work_order_sa_pcs"
                  value={workorder.work_order_sa_pcs}
                  onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Fabric Sales"
                  autoComplete="Name"
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
                <div className="col-sm-12 col-md-12 col-xl-11">
                  <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        required
                        inputRef={(ref) => (inputRefs.current[index] = ref)}
                        label="T Code"
                        name="work_order_sa_sub_barcode"
                        value={user.work_order_sa_sub_barcode}
                        onChange={e => {onChange(e, index), CheckBarcode(e,index)}}
                        fullWidth
                        />
                           
                </div>
                </div>
                
                
                <div className="col-sm-12 col-md-12 col-xl-1">
                    <IconButton onClick={() => removeUser(index)}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
              </div>
              ))
            }
            <div className="row mt-4">
              <div className="col-sm-12 col-md-12 col-xl-12">
                <Button className="mr-10 mb-10" color="primary" style={{width:"100px"}} variant="contained" onClick={(e) => addItem(e)}>
                  Add More</Button>
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