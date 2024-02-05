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
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListRatio extends React.Component {
  state = {
    loader: true,
    users: [],
    ratioData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Ratio",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    aria-label="Delete"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                    }}
                  >
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,value)} >
                      <DeleteIcon />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"view?id=" + value}
                    >
                      <VisibilityIcon />
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

  updateData = (e,value) => {
    e.preventDefault();
    axios({
      url: baseURL+"/delete-ratio-by-id/"+value,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Data Delete Sucessfully");
      this.getData();
      this.setState({ ratioData: res.data.ratio, loader: false });
      
    })
  };

  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-ratio",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.ratio;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
                response[i]["ratio_range"],
                response[i]["ratio_range"],
            ]);
          
        }
        this.setState({ ratioData: tempRows, loader: false });
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
              title="Ratios List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Ratio
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.ratioData.length > 0 && (
                <MUIDataTable
                  title={"Ratios List"}
                  data={this.state.ratioData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}

              {this.state.ratioData.length <= 0 && (
                <MUIDataTable
                  title={"Ratios List"}
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
