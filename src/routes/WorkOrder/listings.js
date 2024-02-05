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
import "./workorder.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import Moment from 'moment';
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {  NotificationManager,} from "react-notifications";

const option = {
  filterType: "dropDown",
  selectableRows: false,
  
};
export default class NewListWorkOrder extends React.Component {
  state = {
    loader: true,
    users: "",
    showmodal: false,
    workorderData: [],
    columnData: [
      {
        name: "#",
        options: {
          filter: false,
          print:false,
          download:false,
        }
      },
      "Work Order No",
      "Date",
      "Factory",
      "Brand",
      "Total",
      "Receive",
      "Status",
      {
        name: "Actions",
        options: {
          filter: false,
          print:false,
          download:false,
          customBodyRender: (value) => {
            const valueId = value.substr(value.indexOf("#")+1, value.length-1);
            return (
              <div style={{ minWidth: "150px" , fontWeight: 800}}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                      padding:'2px',
                    }}
                  >
                    <Link to={"edit?id=" + valueId}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="View" placement="top">
                  <IconButton aria-label="View">
                    <Link
                    style={{
                      display: this.state.usertype == 4 ? "none" : "",
                      padding:'2px',
                    }}
                      to={"view?id=" + valueId}
                    >
                      <VisibilityIcon />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Barcode" placement="top">
                  <IconButton aria-label="Download Barcode" style={{padding:'2px',}}>
                    <a style={{color:'#5D92F4'}} onClick={(e) => this.updateData(e,valueId)} >
                    <i className="mr-10 ti-download"></i>
                    </a>
                  </IconButton>
                </Tooltip>
                {value.startsWith('Factory') &&
                <Tooltip title="Finish Work Order" placement="top">
                  <IconButton
                    aria-label="Finish Work Order"
                    style={{
                      display:
                        localStorage.getItem("user_type_id") == 1
                        ? "none" : "",
                        padding:'2px',
                    }}
                  >
                    <Link onClick={(e) => this.openmodal(e,valueId)}>
                      <i className="zmdi zmdi-receipt"></i>
                    </Link>
                  </IconButton>
                </Tooltip>
                }
               </div>
            );
          },
        },
      },
    ],
  };

  updateData = (e,value) => {
    e.preventDefault();
    let data = {
      workorder_id:value,
    };
    axios({
      url: baseURL+"/download-work-order-barcode-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'workorder_barcode.csv');
      document.body.appendChild(link);
      link.click();
      NotificationManager.success("Excel Download Sucessfully");
      
      
      
    })
  };



  getData = () => {
    let result = [];
    axios({
      url: baseURL+"/fetch-work-order-list",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    })
      .then((res) => {
      
        let response = res.data.workorder;
        let tempRows = [];
        for (let i = 0; i < response.length; i++) {
          
            tempRows.push([
              i + 1,
              response[i]["work_order_no"],
              Moment(response[i]["work_order_date"]).format('DD-MM-YYYY'),
              response[i]["work_order_factory"],
              response[i]["work_order_brand"],   
              response[i]["work_order_count"],
              response[i]["total_receive"],
              response[i]["work_order_status"],
              response[i]["work_order_status"]+'#'+response[i]["id"],
              
            ]);
          
        }
        this.setState({ workorderData: tempRows, loader: false });
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

  closegroupModal = () => {
    this.setState({showmodal: false});
  };

  openmodal = (e,value) => {
    
    this.setState({users: value});
    this.setState({showmodal: true});
    
  };

  updateWorkOrderFinish = (e) => {
    e.preventDefault();
    this.closegroupModal();
    axios({
      url: baseURL+"/update-work-order-finish-by-id/"+this.state.users,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      
      NotificationManager.success("Data Update Sucessfully");
      
      this.getData();
      
      
    })
  };
  
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
              title="Work Orders List"
              match={this.props.match}
            />
            <div className="donorbtns">
              <Link className="btn btn-outline-light" to="add">
                <Button
                  
                  className="mr-10 mb-10 btn-get-started"
                  color="danger"
                >
                  + Add Work Order
                </Button>
              </Link>
            </div>
            <RctCollapsibleCard fullBlock>
              {this.state.workorderData.length > 0 && (
                <MUIDataTable
                  title={"Work Orders List"}
                  data={this.state.workorderData}
                  columns={this.state.columnData}
                  options={option}
                  
                />
              )}
              {this.state.workorderData.length <= 0 && (
                <MUIDataTable
                  title={"Work Orders List"}
                  columns={this.state.columnData}
                  options={option}
                />
              )}
            </RctCollapsibleCard>
            <Modal isOpen={this.state.showmodal} toggle={() => this.closegroupModal()}>
            <ModalHeader toggle={() => this.closegroupModal()}>
              Rececive all Material From a Factory ?
            </ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                
              >
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-12">
                    Did you Rececive all Material From a Factory ?
                  </div>
                </div> 
                <div className="row mt-4">
                  <Button
                    className="mr-10 mb-10"
                    color="primary"
                    type="button"
                    style={{ width: "20%" }}
                    onClick={(e) => {
                      this.updateWorkOrderFinish(e);
                  }}
                  >
                    Yes
                  </Button>
                  <Button
                    className="mr-10 mb-10"
                    color="primary"
                    type="button"
                    style={{ width: "20%" }}
                    onClick={() => this.closegroupModal()}
                  >
                    No
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
          </>
        )}
      </div>
    );
  }
}
