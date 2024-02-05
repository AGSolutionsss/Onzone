import React from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import {baseURL} from '../../api';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Add from "./addFabricInward";
import {Checkbox} from "@material-ui/core";

const option = {
    filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen:true,
  download:false,
  selectableRows: false,
  
};



export default class AddToGroup extends React.Component {
  
  state = {
    loader: true,
    message:'',
    fabAttr: [],
    fabData: [],
    columnData: [
      "P Code",
      "Brand",
      "Attributes",
      "Rate",
      "Nick Name",
      {
        name: "Actions",
        options: {
          filter: true,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" }}>
                {/* {alert(value)} */}

                <Button onClick={() => this.addDonorToReceipt(value)}>
                  Select
                </Button>
              </div>
            );
          },
        },
      },
    ],
  };

  addDonorToReceipt(fts_id) {

    this.setState({
      message: fts_id, loader: false
  });
      
      this.props.populateCoreName(fts_id);

      <Add message={this.state.fabAttr} /> 
}

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-core-items",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
        let singleData = [];
        let response = res.data.coreitems;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([
              response[i]["core_items_name"],
              response[i]["core_items_brand"],
              (response[i]["core_items_attr_color"] == null ? "": response[i]["core_items_attr_color"]+",")+""+
              (response[i]["core_items_attr_design"] == null ? "": response[i]["core_items_attr_design"]+",")+""+
              (response[i]["core_items_attr_type"] == null ? "": response[i]["core_items_attr_type"]+",")+""+
              (response[i]["core_items_attr_color_theme"] == null ? "": response[i]["core_items_attr_color_theme"]+",")+""+
              (response[i]["core_items_attr_occasion"] == null ? "": response[i]["core_items_attr_occasion"]+","),
              response[i]["core_items_rate"],
              response[i]["core_items_nick_name"],
              response[i],
          ]);
        }
        this.setState({ fabData: tempRows, loader: false });
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
    let usertype = localStorage.getItem("id");
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
           

            <RctCollapsibleCard fullBlock>
              {this.state.fabData.length > 0 && (
                <MUIDataTable
                   
                  data={this.state.fabData}
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
