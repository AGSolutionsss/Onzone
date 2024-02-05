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
import dateyear from '../dateyear';

const Add = (props) => {

    let history = useHistory();
    
    const [workorder, setWorkOrder] = useState({
        work_order_year: dateyear,
        work_order_factory_no: "",
        work_order_brand: "",
        work_order_style_type: "",
        work_order_width: "",
        work_order_count: "",
        work_order_remarks: "",
        workorder_sub_data: "",
        work_order_ratio: "",
        work_order_ratio_consumption: "",
        work_order_ratio_h: "",
        work_order_ratio_h_consumption: "",
        
    });

    const [work_order_count, setCount] = useState(1);

    const useTemplate = {work_order_sub_selection_id:"",work_order_sub_36_h:"",work_order_sub_38_h:"",work_order_sub_40_h:"",work_order_sub_42_h:"",work_order_sub_44_h:"",work_order_sub_a:"",work_order_sub_b:"",work_order_sub_c:"",work_order_sub_length:"",work_order_sub_half_shirt:"",work_order_sub_full_shirt:"",work_order_sub_amount:""};
    //TODO:change variable name to somethig meaningfull
    const [users, setUsers] = useState([useTemplate]);

    const addItem = () => {
      setUsers([...users,useTemplate]);
      setCount(work_order_count + 1);
    }
    //TODO::change onChange to onItemChange 
    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

    const removeUser = (index) => {
      const filteredUsers = [...users];
      filteredUsers.splice(index, 1);
      setUsers(filteredUsers);
      setCount(work_order_count - 1);
    }

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    
    const Brcode = (selectedValue, value) =>{
      const barcodeLength = inwardSelection.find(item => item.id === value);
      const tempUsers = [...users];
      tempUsers[selectedValue].work_order_sub_length = barcodeLength.fabric_selection_length;

    }
    
    const [ratioValue,setRatioValue] = useState({});
    
    const HalfA = (selectedValue) => {
      const newValue = halfRatio.find(item => item.ratio_range === ratioValue);
      if(newValue.ratio_group == 'ab'){

        const tempUsers = [...users];
        const str = newValue.ratio_type;
        const firstNumber = str.charAt(8);
        
        tempUsers[selectedValue].work_order_sub_38_h = tempUsers[selectedValue].work_order_sub_a;
        tempUsers[selectedValue].work_order_sub_44_h = tempUsers[selectedValue].work_order_sub_a * firstNumber;
        tempUsers[selectedValue].work_order_sub_half_shirt = ((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h))).toFixed(2);
        tempUsers[selectedValue].work_order_sub_full_shirt = ((tempUsers[selectedValue].work_order_sub_length - ((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h)) * workorder.work_order_ratio_h_consumption)) / workorder.work_order_ratio_consumption).toFixed(2);
        setUsers(tempUsers);
        for(var i = 0; i<work_order_count; i++){
          if(Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1){
            setIsButtonDisabled(true);
            NotificationManager.error("Shortage of Cloth");
            break;
          }else{
            setIsButtonDisabled(false);
          }
          
        }
      }else{

        const tempUsers = [...users];
        const str = newValue.ratio_type;
        
        const firstNumber = str.match(/[0-9]+/);
        const secondNumber = str.charAt(5);
        
        
        tempUsers[selectedValue].work_order_sub_38_h = tempUsers[selectedValue].work_order_sub_a;
        tempUsers[selectedValue].work_order_sub_40_h = tempUsers[selectedValue].work_order_sub_a * firstNumber;
        tempUsers[selectedValue].work_order_sub_42_h = tempUsers[selectedValue].work_order_sub_a * secondNumber;
        tempUsers[selectedValue].work_order_sub_44_h = tempUsers[selectedValue].work_order_sub_a;
        tempUsers[selectedValue].work_order_sub_half_shirt = (((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h)))).toFixed(2);
        tempUsers[selectedValue].work_order_sub_full_shirt = ((tempUsers[selectedValue].work_order_sub_length - ((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h)) * workorder.work_order_ratio_h_consumption))).toFixed(2);
        setUsers(tempUsers);
        for(var i = 0; i<work_order_count; i++){
          if(Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1){
            setIsButtonDisabled(true);
            NotificationManager.error("Shortage of Cloth");
            break;
          }else{
            setIsButtonDisabled(false);
          }
          
        }
      }
    }

    const HalfB = (selectedValue) => {
      const newValue = halfRatio.find(item => item.ratio_range === ratioValue);
      if(newValue.ratio_group == 'ab'){

        const tempUsers = [...users];
        const str = newValue.ratio_type;
        
        const firstNumber = str.charAt(2);
        if(!isNaN(firstNumber)){
          
        }else{
          firstNumber = 1;
        }
        const secondNumber = str.charAt(5);
        if(!isNaN(secondNumber)){
          
        }else{
          secondNumber = 1;
        }

        tempUsers[selectedValue].work_order_sub_40_h = tempUsers[selectedValue].work_order_sub_b * firstNumber;
        tempUsers[selectedValue].work_order_sub_42_h = tempUsers[selectedValue].work_order_sub_b * secondNumber;
        tempUsers[selectedValue].work_order_sub_half_shirt = ((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h))).toFixed(2);
        tempUsers[selectedValue].work_order_sub_full_shirt = ((tempUsers[selectedValue].work_order_sub_length - ((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h)) * workorder.work_order_ratio_h_consumption))).toFixed(2);
        setUsers(tempUsers);
        for(var i = 0; i<work_order_count; i++){
          if(Math.sign(tempUsers[i].work_order_sub_full_shirt) == -1){
            setIsButtonDisabled(true);
            NotificationManager.error("Shortage of Cloth");
            break;
          }else{
            setIsButtonDisabled(false);
          }
        }
      }
    }

    const validateOnlyNumber = (inputtxt) => {
      var phoneno = /^\d*\.?\d*$/;
      if(inputtxt.match(phoneno) || inputtxt.length==0){
        return true;
      }else{
          return false;
      }
  }

    const onInputChange = (e) => {
      if(e.target.name=="work_order_ratio_consumption"){
        if(validateOnlyNumber(e.target.value)){
          setWorkOrder({
            ...workorder,
            [e.target.name]: e.target.value,
          });
        }
      }else if(e.target.name=="work_order_ratio_h_consumption"){
        if(validateOnlyNumber(e.target.value)){
          setWorkOrder({
            ...workorder,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setWorkOrder({
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

    const [halfRatio, setHalfRatio] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-half-ratio', requestOptions)
      .then(response => response.json())
      .then(data => setHalfRatio(data.half_ratio)); 
    }, []);

    const [ratio, setRatio] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-ratio', requestOptions)
      .then(response => response.json())
      .then(data => setRatio(data.ratio)); 
    }, []);

    const [style, setStyle] = useState([]);
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
  
  
      fetch(baseURL+'/fetch-style', requestOptions)
      .then(response => response.json())
      .then(data => setStyle(data.style)); 
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

    const [inwardSelection, setInwardSelection] = useState([]);
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


        fetch(baseURL+'/fetch-fabric-inward-materials-selection-by-workorder/'+workorder.work_order_brand+'/'+workorder.work_order_width , requestOptions)
        .then(response => response.json())
        .then(data => setInwardSelection(data.fabricInwardselection)); 
    }, [workorder.work_order_brand,workorder.work_order_width ]);
    

    const onSubmit = (e) => {
      
        let data = {
            work_order_year: dateyear,
            work_order_factory_no: workorder.work_order_factory_no,
            work_order_brand: workorder.work_order_brand ,
            work_order_style_type: workorder.work_order_style_type,
            work_order_width: workorder.work_order_width,
            workorder_sub_data: users,
            work_order_count:work_order_count,
            work_order_remarks:workorder.work_order_remarks,
            work_order_ratio: workorder.work_order_ratio,
            work_order_ratio_consumption: workorder.work_order_ratio_consumption,
            work_order_ratio_h: workorder.work_order_ratio_h,
            work_order_ratio_h_consumption: workorder.work_order_ratio_h_consumption,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-work-order",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Created Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Work Order" match={props.match} />
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
                        name="work_order_factory_no"
                        value={workorder.work_order_factory_no}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {factory.map((factorys, key) => (
                        <MenuItem key={factorys.factory_no} value={factorys.factory_no}>
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
                        label="Brand"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_brand"
                        value={workorder.work_order_brand}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {brand.map((fabric, key) => (
                      <MenuItem key={fabric.fabric_brand_brands} value={fabric.fabric_brand_brands}>
                          {fabric.fabric_brand_brands}
                      </MenuItem>
                      ))}
                    </TextField>
                    
                </div>
            </div>           
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Style Type"
                  select 
                  required
                  SelectProps={{
                    MenuProps: {},
                }}
                  name="work_order_style_type"
                  value={workorder.work_order_style_type}
                  onChange={(e) => onInputChange(e)}
                >
                    {style.map((fabric, key) => (
                      <MenuItem key={fabric.style_type} value={fabric.style_type}>
                          {fabric.style_type}
                      </MenuItem>
                      ))}
                    </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                select
                  fullWidth
                  label="Width"
                  SelectProps={{
                    MenuProps: {},
                }}
                  autoComplete="Name"
                  required
                  name="work_order_width"
                  value={workorder.work_order_width}
                  onChange={(e) => onInputChange(e)}
                >
                  {width.map((fabric, key) => (
                    <MenuItem key={fabric.width_mea} value={fabric.width_mea}>
                        {fabric.width_mea}
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
                        label="Half Ratio"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_ratio_h"
                        value={workorder.work_order_ratio_h}
                        onChange={(e) => {onInputChange(e), setRatioValue(e.target.value)}}
                        fullWidth
                        >
                            {halfRatio.map((hr, key) => (
                        <MenuItem key={key} value={hr.ratio_range}>
                            {hr.ratio_range}
                        </MenuItem>
                        ))}
                    </TextField>
                    
                </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half Consumption"
                  autoComplete="Name"
                  name="work_order_ratio_h_consumption"
                  value={workorder.work_order_ratio_h_consumption}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        select
                        required
                        label="Full Ratio"
                        SelectProps={{
                            MenuProps: {},
                        }}
                        name="work_order_ratio"
                        value={workorder.work_order_ratio}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                        >
                            {ratio.map((ratios, key) => (
                      <MenuItem key={ratios.ratio_range} value={ratios.ratio_range}>
                          {ratios.ratio_range}
                      </MenuItem>
                      ))}
                    </TextField>
                    
                </div>
            </div> 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Full Consumption"
                  autoComplete="Name"
                  name="work_order_ratio_consumption"
                  value={workorder.work_order_ratio_consumption}
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
                  name="work_order_remarks"
                  value={workorder.work_order_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            </div>
            <hr/>
            {
              users.map((user, index)=> (
                <div className="row" key={index}>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                <TextField
                  fullWidth
                  label="T Code"
                  autoComplete="Name"
                  required
                    SelectProps={{
                        MenuProps: {},
                    }}
                    select
                  name="work_order_sub_selection_id"
                  value={user.work_order_sub_selection_id}
                  onChange={e => {onChange(e, index),Brcode(index, e.target.value)}}
                >
                    {inwardSelection.map((inwardSelections, key) => (
                        <MenuItem key={inwardSelections.id} value={inwardSelections.id}>
                            {inwardSelections.fabric_selection_barcode}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Length"
                      required
                      autoComplete="Name"
                      name="work_order_sub_length"
                      disabled
                      value={user.work_order_sub_length}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="A"
                      required
                      autoComplete="Name"
                      name="work_order_sub_a"
                      
                      value={user.work_order_sub_a}
                      onChange={e => {onChange(e, index), HalfA(index)}}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="B"
                      
                      autoComplete="Name"
                      name="work_order_sub_b"
                      value={user.work_order_sub_b}
                      onChange={e => {onChange(e, index), HalfB(index)}}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="C"
                      
                      autoComplete="Name"
                      name="work_order_sub_c"
                      value={user.work_order_sub_c}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half 36"
                      hidden
                      autoComplete="Name"
                      name="work_order_sub_36_h"
                      value={user.work_order_sub_36_h}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half 38"
                      required
                      autoComplete="Name"
                      name="work_order_sub_38_h"
                      value={user.work_order_sub_38_h}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half 40"
                      required
                      autoComplete="Name"
                      name="work_order_sub_40_h"
                      value={user.work_order_sub_40_h}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half 42"
                      required
                      autoComplete="Name"
                      name="work_order_sub_42_h"
                      value={user.work_order_sub_42_h}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half 44"
                      required
                      autoComplete="Name"
                      name="work_order_sub_44_h"
                      value={user.work_order_sub_44_h}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Half Shirt"
                      required
                      autoComplete="Name"
                      name="work_order_sub_half_shirt"
                      disabled
                      value={user.work_order_sub_half_shirt}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="Full Shirt"
                      required
                      autoComplete="Name"
                      name="work_order_sub_full_shirt"
                      disabled
                      value={user.work_order_sub_full_shirt}
                      onChange={e => onChange(e, index)}
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-xl-1">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      label="MRP"
                      required
                      autoComplete="Name"
                      name="work_order_sub_amount"
                      value={user.work_order_sub_amount}
                      onChange={e => onChange(e, index)}
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