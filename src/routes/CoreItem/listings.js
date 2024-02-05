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
import "./coreitem.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";

const option = {
  filterType: "dropdown",
  selectableRows: false,
  
};
export default class NewListBrand extends React.Component {
  state = {
    loader: true,
    users: [],
    coreitemData: [],
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
        options:{
          filter: false,
          download:false,
        }
      },
      "P Code",
      "Brand",
      "Attributes",
      "Rate",
      "Nick Name",
      "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <Link to={"edit?id=" + value}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
               </div>
            );
          },
        },
      },
    ],
  };
  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-core-items-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.coreitems;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
            
              <img src={(response[i]["core_items_image"]  === null || response[i]["core_items_image"] === '' ? "https://houseofonzone.com/admin/storage/app/public/no_image.jpg" :"https://houseofonzone.com/admin/storage/app/public/CoreItems/"+response[i]["core_items_image"])} style={{width:'40px',height:'40px'}}/>,
              response[i]["core_items_name"],
              response[i]["core_items_brand"],
              (response[i]["core_items_attr_color"] == null ? "": response[i]["core_items_attr_color"]+",")+""+
              (response[i]["core_items_attr_design"] == null ? "": response[i]["core_items_attr_design"]+",")+""+
              (response[i]["core_items_attr_type"] == null ? "": response[i]["core_items_attr_type"]+",")+""+
              (response[i]["core_items_attr_color_theme"] == null ? "": response[i]["core_items_attr_color_theme"]+",")+""+
              (response[i]["core_items_attr_occasion"] == null ? "": response[i]["core_items_attr_occasion"]+","),
              response[i]["core_items_rate"],
              response[i]["core_items_nick_name"],
              response[i]["core_items_status"],
              response[i]["id"],
            ]);
          
        }
        this.setState({ coreitemData: tempRows, loader: false });
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
              title="Core Items List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Core Item
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.coreitemData.length > 0 && (
                <MUIDataTable
                  title={"Core Items List"}
                  data={this.state.coreitemData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.coreitemData.length <= 0 && (
                <MUIDataTable
                  title={"Core Items List"}
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
