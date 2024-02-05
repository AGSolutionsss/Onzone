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

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListRatioHalf extends React.Component {
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
      "Ratio Half",
      "Ratio Group",
      "Ratio Type",
      "Ratio Status",
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
                  <IconButton aria-label="Edit">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                    }}
                      to={"edit?id=" + value}
                    >
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
      url: baseURL+"/fetch-half-ratio-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.ratioHalf;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
                response[i]["ratio_range"],
                response[i]["ratio_group"],
                response[i]["ratio_type"],
                response[i]["ratio_status"],
                response[i]["id"],
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
              title="Ratios Half List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  style={{ display: usertype == 2 ? "inline-block" : "none" }}
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Ratio Half
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.ratioData.length > 0 && (
                <MUIDataTable
                  title={"Ratios Half List"}
                  data={this.state.ratioData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}

              {this.state.ratioData.length <= 0 && (
                <MUIDataTable
                  title={"Ratios Half List"}
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
