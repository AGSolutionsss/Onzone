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
import "./fabricinwardmaterialsselection.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';

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
      "Outward Date",
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
                <Tooltip title="To UnSelect" placement="top">
                  <IconButton
                    aria-label="To UnSelect"
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value)} >
                      <EditIcon />
                    </a>
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
      url: baseURL+"/fetch-fabric-inward-materials-unselection/"+value,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
    
      NotificationManager.success("Data Update Sucessfully");
      this.getData();
      this.setState({ fabricInwardData: res.data.fabricInwardselection, loader: false });
      
    })
  };

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-fabric-inward-materials-selection-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.fabricInwardselection;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              <img src={(response[i]["fabric_selection_image"]  === null || response[i]["fabric_selection_image"] === '' ? "https://houseofonzone.com/admin/storage/app/public/no_image.jpg" : "https://houseofonzone.com/admin/storage/app/public/Fabric/"+response[i]["fabric_selection_image"])} style={{width:'40px',height:'40px'}}/>,
              Moment(response[i]["fabric_selection_outward"]).format('DD-MM-YYYY'),
              response[i]["fabric_selection_barcode"],
              response[i]["fabric_selection_name"],   
              response[i]["fabric_selection_brand"], 
              (response[i]["fabric_selection_color"] == null ? "": response[i]["fabric_selection_color"]+",")+""+
              (response[i]["fabric_selection_design"] == null ? "": response[i]["fabric_selection_design"]+",")+""+
              (response[i]["fabric_selection_type"] == null ? "": response[i]["fabric_selection_type"]+",")+""+
              (response[i]["fabric_selection_color_theme"] == null ? "": response[i]["fabric_selection_color_theme"]+",")+""+
              (response[i]["fabric_selection_occasion"] == null ? "": response[i]["fabric_selection_occasion"]+","),
              response[i]["fabric_selection_shrinkage"],
              response[i]["fabric_selection_length"],
              response[i]["fabric_selection_rate"],
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
              title="Selected Fabric"
              match={this.props.match}
            />
            <RctCollapsibleCard fullBlock>
              {this.state.fabricInwardData.length > 0 && (
                <MUIDataTable
                  title={"Selected Fabric"}
                  data={this.state.fabricInwardData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.fabricInwardData.length <= 0 && (
                <MUIDataTable
                  title={"Selected Fabric"}
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
