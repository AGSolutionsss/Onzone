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

const Add = (props) => {

    let history = useHistory();
    var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var midate = "04/04/2022"
  var todayback = yyyy + "-" + mm + "-" + dd;

  var d = document.getElementById("fabric_inward_lr_date");
  
  var today1 = new Date();
  var dd1 = String(today1.getDate()-10).padStart(2, "0");
  var mm1 = String(today1.getMonth() + 1).padStart(2, "0");
  var yyyy1 = today1.getFullYear();
  today1 = mm1 + "/" + dd1 + "/" + yyyy1;
  var todayback1 = yyyy1 + "-" + mm1 + "-" + dd1;

  if (d) {
    document.getElementById("fabric_inward_lr_date").setAttribute("max", todayback);
    document.getElementById("fabric_inward_lr_date").setAttribute("min", todayback1);
  }

    const [fabricinward, setFabricInward] = useState({
        fabric_inward_supplier: "",
        fabric_inward_lr_no: "",
        fabric_inward_lr_date: todayback,
        fabric_inward_lr_no_bundles: "",
        fabric_inward_remarks: "",
        fabric_inward_sub_data: "",
        fabric_inward_count: "",
        fabric_inward_invoice: "",
        fabric_inward_width: "",
        fabric_inward_brand: "",
        uploaded_file: "",
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    const [fabric_inward_count, setCount] = useState(1);

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

      if(e.target.name=="fabric_inward_lr_no_bundles"){
        if(validateOnlyDigits(e.target.value)){
          setFabricInward({
            ...fabricinward,
            [e.target.name]: e.target.value,
          });
        }
      }else{
        setFabricInward({
        ...fabricinward,
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

    

 

    const onSubmit = (e) => {
      
        const data = new FormData();
        data.append("fabric_inward_supplier",fabricinward.fabric_inward_supplier);
        data.append("fabric_inward_lr_no",fabricinward.fabric_inward_lr_no);
        data.append("fabric_inward_lr_date",fabricinward.fabric_inward_lr_date);
        data.append("fabric_inward_lr_no_bundles",fabricinward.fabric_inward_lr_no_bundles);
        data.append("fabric_inward_remarks",fabricinward.fabric_inward_remarks);
        data.append("fabric_inward_count",fabric_inward_count);
        data.append("fabric_inward_width",fabricinward.fabric_inward_width);
        data.append("fabric_inward_invoice",fabricinward.fabric_inward_invoice);
        data.append("fabric_inward_brand",fabricinward.fabric_inward_brand);
        data.append("uploaded_file",selectedFile);

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-fabric-inward-files",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Data Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create Fabric Inward" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                <TextField
                    id="select-corrpreffer"
                    select
                    required
                    label="Supplier"
                    SelectProps={{
                        MenuProps: {},
                    }}
                    name="fabric_inward_supplier"
                    value={fabricinward.fabric_inward_supplier}
                    onChange={(e) => onInputChange(e)}
                    fullWidth
                    >
                        {supplier.map((fabric, key) => (
                    <MenuItem key={fabric.supplier_name} value={fabric.supplier_name}>
                        {fabric.supplier_name}
                    </MenuItem>
                    ))}
                </TextField>
                    
                </div>
                </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="LR No"
                  autoComplete="Name"
                  name="fabric_inward_lr_no"
                  value={fabricinward.fabric_inward_lr_no}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  id="fabric_inward_lr_date"
                  label="LR Date"
                  type="date"
                  autoComplete="Name"
                  name="fabric_inward_lr_date"
                  InputLabelProps={{ shrink: true }}
                  value={fabricinward.fabric_inward_lr_date}
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
                  label="Invoice"
                  autoComplete="Name"
                  name="fabric_inward_invoice"
                  value={fabricinward.fabric_inward_invoice}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
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
                  name="fabric_inward_width"
                  value={fabricinward.fabric_inward_width}
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
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="No of Bundles"
                  autoComplete="Name"
                  name="fabric_inward_lr_no_bundles"
                  value={fabricinward.fabric_inward_lr_no_bundles}
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
                      label="Brand"
                      SelectProps={{
                          MenuProps: {},
                      }}
                      name="fabric_inward_brand"
                      value={fabricinward.fabric_inward_brand}
                      onChange={e => onInputChange(e)}
                      fullWidth
                      >
                          {brand.map((fabric, key) => (
                      <MenuItem key={key} value={fabric.fabric_brand_brands}>
                          {fabric.fabric_brand_brands}
                      </MenuItem>
                      ))}
                    </TextField>
                </div>
              </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <div className="form-group">
                <TextField
                  fullWidth
                  label="Remarks"
                  autoComplete="Name"
                  name="fabric_inward_remarks"
                  value={fabricinward.fabric_inward_remarks}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  type="file"
                  label="Ratio File"
                  required
                  autoComplete="Name"
                  name="uploaded_file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <span> Download a Sample Format of Excel </span>
                <Button className="mr-10 mb-10" color="primary"> 
                    <a style={{color:'white'}} href="https://houseofonzone.com/admin/storage/app/public/File/Fabric_Format.xlsx" download="Fabric_Format.xlsx">Download</a>
                </Button>
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