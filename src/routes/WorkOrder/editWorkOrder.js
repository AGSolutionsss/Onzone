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
    
    const [workorder, setWorkOrder] = useState({
        work_order_factory: "",
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

    

    const useTemplate = {work_order_sub_id:"",work_order_sub_barcode:"",work_order_sub_selection_id:"",work_order_sub_36_h:"",work_order_sub_38_h:"",work_order_sub_40_h:"",work_order_sub_42_h:"",work_order_sub_44_h:"",work_order_sub_a:"",work_order_sub_b:"",work_order_sub_c:"",work_order_sub_length:"",work_order_sub_half_shirt:"",work_order_sub_full_shirt:""};
    const [users, setUsers] = useState([useTemplate]);


    const onChange = (e, index) =>{
      const updatedUsers = users.map((user, i) => 
      index == i 
      ? Object.assign(user,{[e.target.name]: e.target.value}) 
      : user );
      setUsers(updatedUsers);
    };

    

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

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

  const ratioValue = workorder.work_order_ratio_h;
  
    
    const HalfA = (selectedValue) => {
      const newValue = halfRatio.find(item => item.ratio_range === ratioValue);
      
      if(newValue.ratio_group == 'ab'){
        const tempUsers = [...users];
        const str = newValue.ratio_type;
        const firstNumber = str.charAt(8);

        tempUsers[selectedValue].work_order_sub_38_h = tempUsers[selectedValue].work_order_sub_a;
        tempUsers[selectedValue].work_order_sub_44_h = tempUsers[selectedValue].work_order_sub_a * firstNumber;
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
        
        
      }else {

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
        tempUsers[selectedValue].work_order_sub_half_shirt = (((parseInt(tempUsers[selectedValue].work_order_sub_38_h) + parseInt(tempUsers[selectedValue].work_order_sub_40_h) + parseInt(tempUsers[selectedValue].work_order_sub_42_h) + parseInt(tempUsers[selectedValue].work_order_sub_44_h)))).toFixed(2);
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
      }
    }

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
            url: baseURL+"/fetch-work-order-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            console.log("debug",res.data.workordersub);
            setWorkOrder(res.data.workorder);
            setUsers(res.data.workordersub);
          });
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

    const onSubmit = (e) => {
      
        let data = {
            work_order_brand: workorder.work_order_brand ,
            work_order_style_type: workorder.work_order_style_type,
            work_order_width: workorder.work_order_width,
            workorder_sub_data: users,
            work_order_count:workorder.work_order_count,
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
            url: baseURL+"/update-work-orders/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Work Order Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Update Work Order" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        required
                        label="Factory"
                        disabled
                        name="work_order_factory"
                        value={workorder.work_order_factory}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
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
                        name="work_order_brand"
                        value={workorder.work_order_brand}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                    />
                </div>
            </div>           
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Style Type"
                   
                  required
                  disabled
                  name="work_order_style_type"
                  value={workorder.work_order_style_type}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Width"
                  disabled
                  autoComplete="Name"
                  required
                  name="work_order_width"
                  value={workorder.work_order_width}
                  onChange={(e) => onInputChange(e)}
                />
                  
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
                <div className="form-group">
                    <TextField
                        id="select-corrpreffer"
                        required
                        label="Half Ratio"
                        disabled
                        name="work_order_ratio_h"
                        value={workorder.work_order_ratio_h}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                    />
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
                        required
                        label="Ratio"
                        disabled
                        name="work_order_ratio"
                        value={workorder.work_order_ratio}
                        onChange={(e) => onInputChange(e)}
                        fullWidth
                    />
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
                  required
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
                <div className="col-sm-12 col-md-12 col-xl-2">
                  <div className="form-group">
                  <TextField
                      fullWidth
                      label="sub id"
                      hidden
                      required
                      autoComplete="Name"
                      name="work_order_sub_id"
                      value={user.id}
                      onChange={e => onChange(e, index)}
                    />
                    <TextField
                      fullWidth
                      label="sub id"
                      hidden
                      required
                      autoComplete="Name"
                      name="work_order_sub_selection_id"
                      value={user.work_order_sub_selection_id}
                      onChange={e => onChange(e, index)}
                    />
                <TextField
                  fullWidth
                  label="T Code"
                  autoComplete="Name"
                  required
                    disabled
                  name="work_order_sub_barcode"
                  value={user.work_order_sub_barcode}
                  onChange={e => onChange(e, index)}
                />
                    
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
                      InputLabelProps={{
                        shrink: true,
                      }}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="Name"
                      name="work_order_sub_full_shirt"
                      disabled
                      value={user.work_order_sub_full_shirt}
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