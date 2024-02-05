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
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};

export default class NewListWorkOrderFinalStock extends React.Component {
  state = {
    loader: true,
    users: [],
    workOrderData: [],
    columnData: [
      {
        name: "#",
        options:{
          filter: false,
          print:false,
          download:false,
        }
      },
      
      "T Code",
      "P Code",
      "Brand",
      "Attributes",
      "Shrinkage",
      "Length",
      "Received",
      "Sales",
      "Balance",
      "Amount",
      
    ],
  };

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-work-order-final-stock-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.finalStock;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              
              response[i]["work_order_rc_sub_barcode"],
              
              response[i]["work_order_sub_name"],   
              response[i]["work_order_sub_brand"], 
              (response[i]["work_order_sub_color"] == null ? "": response[i]["work_order_sub_color"]+",")+""+
              (response[i]["work_order_sub_design"] == null ? "": response[i]["work_order_sub_design"]+",")+""+
              (response[i]["work_order_sub_type"] == null ? "": response[i]["work_order_sub_type"]+",")+""+
              (response[i]["work_order_sub_color_theme"] == null ? "": response[i]["work_order_sub_color_theme"]+",")+""+
              (response[i]["work_order_sub_occasion"] == null ? "": response[i]["work_order_sub_occasion"]+","),
              response[i]["work_order_sub_shrinkage"],
              response[i]["work_order_sub_length"],
              response[i]["total_received"],
              response[i]["total_sales"],
              response[i]["total_received"] - response[i]["total_sales"],
              response[i]["finished_stock_amount"],
              
            ]);
          
        }
        this.setState({ workOrderData: tempRows, loader: false });
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
              title="Work Order Final Stock"
              match={this.props.match}
            />
            <RctCollapsibleCard fullBlock>
              {this.state.workOrderData.length > 0 && (
                <MUIDataTable
                  title={"Work Order Final Stock"}
                  data={this.state.workOrderData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.workOrderData.length <= 0 && (
                <MUIDataTable
                  title={"Work Order Stock"}
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
