import React from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import "./fabricinwardmaterials.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import {  NotificationManager,} from "react-notifications";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};

export default class NewListFabricInwardMaterials extends React.Component {
  state = {
    loader: true,
    users: [],
    fabricInwardData: [],
    columnData: [
      {
        name: "#",
        options:{
          filter: false,
          print:false,
          download:false,
        }
      },
      {
        name: "Images",
        options: {
          filter: false,
          download:false,
        }
      },
      "Inward Date",
      "T Code",
      "P Code",
      "Brand",
      "Attributes",
      "Shrinkage",
      "Length",
      "Rate",
      {
        name: "Actions",
        options:{
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) =>{
            return(
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Select" placement="top">
                  <IconButton
                    aria-label="Select"
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value)} >
                      <EditIcon />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Fabric Image" placement="top">
                  <IconButton aria-label="Add Fabric Image">
                    <Link to={"addimage?id=" + value}>
                      <AddPhotoAlternateIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          }
        },
      },
    ],
  };


  updateData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/update-fabric-inward-material-by-id/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Data Update Sucessfully");
      this.getData();
      this.setState({ fabricInwardData: res.data.fabricInward, loader: false });
      
    })
  };


  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-fabric-inward-materials-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.fabricInward;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              <img src={(response[i]["fabric_inward_sub_image"]  === null || response[i]["fabric_inward_sub_image"] === '' ? "https://houseofonzone.com/admin/storage/app/public/no_image.jpg" : "https://houseofonzone.com/admin/storage/app/public/Fabric/"+response[i]["fabric_inward_sub_image"])} style={{width:'40px',height:'40px'}}/>,
              Moment(response[i]["fabric_inward_sub_lr_date"]).format('DD-MM-YYYY'),
              response[i]["fabric_inward_sub_barcode"],
              response[i]["fabric_inward_sub_name"],   
              response[i]["fabric_inward_sub_brand"], 
              (response[i]["fabric_inward_sub_color"] == null ? "": response[i]["fabric_inward_sub_color"]+",")+""+
              (response[i]["fabric_inward_sub_design"] == null ? "": response[i]["fabric_inward_sub_design"]+",")+""+
              (response[i]["fabric_inward_sub_type"] == null ? "": response[i]["fabric_inward_sub_type"]+",")+""+
              (response[i]["fabric_inward_sub_color_theme"] == null ? "": response[i]["fabric_inward_sub_color_theme"]+",")+""+
              (response[i]["fabric_inward_sub_occasion"] == null ? "": response[i]["fabric_inward_sub_occasion"]+","),
              response[i]["fabric_inward_sub_shrinkage"],
              response[i]["fabric_inward_sub_length"],
              response[i]["fabric_inward_sub_rate"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ fabricInwardData: tempRows, loader: false });
      })
      .catch((res) => {
        this.setState({ loader: false });
      });
  };
  componentDidMount() {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      window.location = "/signin";
      
    }else{

    }
    
    this.getData();
  }
  
  render() {
    const { loader } = this.state;
    let usertype = localStorage.getItem("user_type_id");
    return (
      <div className="data-table-wrapper">
        {loader && (
          <CircularProgress
            disableShrink
            style={{
              marginLeft: "600px",
              marginTop: "300px",
              marginBottom: "300px",
            }}
            color="secondary"
          />
        )}
        {!loader && (
          <>
            <PageTitleBar
              title="Fabric Stock"
              match={this.props.match}
            />
            <RctCollapsibleCard fullBlock>
              {this.state.fabricInwardData.length > 0 && (
                <MUIDataTable
                  title={"Fabric Stock"}
                  data={this.state.fabricInwardData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.fabricInwardData.length <= 0 && (
                <MUIDataTable
                  title={"Fabric Stock"}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
            </RctCollapsibleCard>
          </>
        )}
      </div>
    );
  }
}
