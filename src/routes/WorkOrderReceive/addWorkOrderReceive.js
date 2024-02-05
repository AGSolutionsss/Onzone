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
import './workorderreceive.css';

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
    
    const [workorder, setWorkOrderReceive] = useState({
        work_order_rc_year: dateyear,
        work_order_rc_date: todayback,
        work_order_rc_factory_no: "",
        work_order_rc_id: "",
        work_order_rc_brand: "",
        work_order_rc_dc_no: "",
        work_order_rc_dc_date: todayback,
        work_order_rc_box: "",
        work_order_rc_pcs: "",
        work_order_rc_fabric_received: "",
        work_order_rc_received_by: "",
        work_order_count: "",
        work_order_rc_remarks: "",
        workorder_sub_data: "",
    });

    const [work_order_count, setCount] = useState(1);

    const useTemplate = {work_order_rc_sub_barcode:"",};
    
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

    const [factory, setFactory] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-factory', requestOptions)
      .then(response => response.json())
      .then(data => setFactory(data.factory)); 
    }, []);

    const [workOrders, setWorkOrder] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-work-order/'+workorder.work_order_rc_factory_no, requestOptions)
      .then(response => response.json())
      .then(data => setWorkOrder(data.workorder)); 
    }, [workorder.work_order_rc_factory_no]);

    

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
  
  
      fetch(baseURL+'/fetch-work-order-brand/'+workorder.work_order_rc_id, requestOptions)
      .then(response => response.json())
      .then(data => setBrand(data.workorderbrand)); 
    }, [workorder.work_order_rc_id]);

    const [workorderfinished, setWorkOrderFinish] = useState([]);
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


        fetch(baseURL+'/fetch-work-order-finish/'+workorder.work_order_rc_id , requestOptions)
        .then(response => response.json())
        .then(data => setWorkOrderFinish(data.workorderfinished)); 
    }, [workorder.work_order_rc_id ]);

    
    
    const onSubmit = (e) => {
      
        let data = {
            work_order_rc_year: dateyear,
            work_order_rc_date: workorder.work_order_rc_date,
            work_order_rc_factory_no: workorder.work_order_rc_factory_no,
            work_order_rc_id: workorder.work_order_rc_id,
            work_order_rc_brand: brand.work_order_brand,
            work_order_rc_dc_no: workorder.work_order_rc_dc_no,
            work_order_rc_dc_date: workorder.work_order_rc_dc_date,
            work_order_rc_box: workorder.work_order_rc_box,
            work_order_rc_pcs: workorder.work_order_rc_pcs,
            work_order_rc_fabric_received: workorder.work_order_rc_fabric_received,
            work_order_rc_received_by: workorder.work_order_rc_received_by,
            work_order_rc_count:work_order_count,
            work_order_rc_remarks:workorder.work_order_rc_remarks,
            workorder_sub_rc_data: users,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-work-order-received",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Receive Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

    const CheckBarcode = (test,selectedValue) => {
      const workId = workorder.work_order_rc_id;
      const barcodeId = test.target.value;
      if(barcodeId.length == 9){
        var theLoginToken = localStorage.getItem('login');   
        const requestOptions = {
          method: 'GET', 
          headers: {
          'Authorization': 'Bearer '+theLoginToken
          }             
        }; 
        fetch(baseURL+'/fetch-work-order-finish-check/'+workId+'/'+barcodeId, requestOptions)
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
      <PageTitleBar title="Create Work Order Receive" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        select
                        required
                        label="Factory"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_rc_factory_no"
                        value={workorder.work_order_rc_factory_no}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {factory.map((factorys, key) => (
                        <MenuItem key={key} value={factorys.factory_no}>
                            {factorys.factory_name}
                        </MenuItem>
                        ))}
                    </TextField>
                    
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        select
                        required
                        label="Work Order ID"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_rc_id"
                        value={workorder.work_order_rc_id}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {workOrders.map((workOrders, key) => (
                        <MenuItem key={key} value={workOrders.work_order_no}>
                            {workOrders.work_order_no}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-3">
                    <div className="form-group">
                        <TextField
                        fullWidth
                        type="date"
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
                        disabled
                        required
                        label="Brand"
                        InputLabelProps={{
                            shrink: true,
                          }}
                        name="work_order_rc_brand"
                        value={brand.work_order_brand}
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
                <div className="col-sm-12 col-md-12 col-xl-11">
                  <div className="form-group">
                  <TextField
                        id="select-corrpreffer"
                        inputRef={(ref) => (inputRefs.current[index] = ref)}
                        required
                        label="T Code"
                        name="work_order_rc_sub_barcode"
                        value={user.work_order_rc_sub_barcode}
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