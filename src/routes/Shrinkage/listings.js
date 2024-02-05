import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import "./shrinkage.css";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {baseURL} from '../../api';
import { NotificationContainer, NotificationManager,} from "react-notifications";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const ShrinkageList = (props) =>{
    const classes = useStyles();

    const [showmodal, setShowmodal] = useState(false);
  
    const [showEditmodal, setShowEditmodal] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const [selected_shrinkage_id, setShrinkageId] = useState("");

    const closegroupModal = () => {
        setShowmodal(false);
    };
      
    const openmodal = () => {
        setShowmodal(true);
       
    };
     
    const closeEditModal = () => {
        setShowEditmodal(false);
    };
       
    const openEditmodal = () => {
        setShowEditmodal(true);
    };

    let history = useHistory();
    const [shrinkages, setShrinkages] = useState([]);
    const [shrinkage, setShrinkage] = useState({
        shrinkage_length: "",
        shrinkage_width: "",
        shrinkage_status: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
        axios({
          url:
          baseURL+"/fetch-shrinkage-list",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setShrinkages(res.data.shrinkage);
        });
     }, []);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
          return true;
        }
        else
        {
          return false;
        }
    }

    const onShrinkageInputChange = (e) => {
        if(e.target.name=="shrinkage_length"){
     
          if(validateOnlyDigits(e.target.value)){
            setShrinkage({
               ...shrinkage,
              [e.target.name]: e.target.value,
            });
          }
        }else if(e.target.name=="shrinkage_width"){
     
            if(validateOnlyDigits(e.target.value)){
              setShrinkage({
                 ...shrinkage,
                [e.target.name]: e.target.value,
              });
            }
        }else{
            setShrinkage({
             ...shrinkage,
            [e.target.name]: e.target.value,
          });
        }
    };

    const createShrinkage = (e) => {
        e.preventDefault();
        setIsButtonDisabled(true)
        let data = {
            shrinkage_length: shrinkage.shrinkage_length,
            shrinkage_width: shrinkage.shrinkage_width,
        };
     
        axios({
          url: baseURL+"/create-shrinkage",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        })
          .then((res) => {
            setShrinkages(res.data.shrinkage);
            NotificationManager.success("Shrinkage is Created Successfully");
            setIsButtonDisabled(false)
            closegroupModal();
          })
          .catch((error) => {
            NotificationManager.danger("Failed to Create");
            setIsButtonDisabled(false)
            closegroupModal();
          });
    };

    

    const updateShrinkage = (e) => {
        e.preventDefault();
        setIsButtonDisabled(true)
        let data = {
            shrinkage_length: shrinkage.shrinkage_length,
            shrinkage_width: shrinkage.shrinkage_width,
            shrinkage_status: shrinkage.shrinkage_status,
        };
    
        axios({
          url:
          baseURL+"/update-shrinkage/" + selected_shrinkage_id,
          method: "PUT",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        })
          .then((res) => {
            setShrinkages(res.data.shrinkage);
            NotificationManager.success("Shrinkage is Updated Successfully");
            setIsButtonDisabled(false)
            closeEditModal();
          })
          .catch((error) => {
            NotificationManager.danger("Failed to Update");
            setIsButtonDisabled(false)
            closeEditModal();
          });
     };

    return (
        <div className="textfields-wrapper">
          
         
          <Button
            className="mr-10 mb-10"
            color="primary"
            onClick={() => openmodal()}
          >
            Create A New Shrinkage
          </Button>
          
          <RctCollapsibleCard>
            <div>
              <h1>Shrinkage</h1>
              <br />
    
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Length</TableCell>
                      <TableCell>Width</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shrinkages.map((shrinkage_data, key) => (
                      <TableRow key={shrinkage_data.id}>
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>{shrinkage_data.shrinkage_length}</TableCell>
                        <TableCell>{shrinkage_data.shrinkage_width}</TableCell>
                        <TableCell>{shrinkage_data.shrinkage_status}</TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            className="mr-10 mb-10"
                            color="primary"
                            onClick={() => {
                                setShrinkage({
                                ...shrinkage,
                                shrinkage_length: shrinkage_data.shrinkage_length,
                                shrinkage_width: shrinkage_data.shrinkage_width,
                                shrinkage_status: shrinkage_data.shrinkage_status,
                              });
                              setShrinkageId(shrinkage_data.id);
                              openEditmodal();
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                     </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </RctCollapsibleCard>
          <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
            <ModalHeader toggle={() => closegroupModal()}>
              Create A New Shrinkage
            </ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                    createShrinkage(e);
                }}
              >
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xl-6">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Length"
                        required
                        name="shrinkage_length"
                        value={shrinkage.shrinkage_length}
                        onChange={(e) => onShrinkageInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-6">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Width"
                        required
                        name="shrinkage_width"
                        value={shrinkage.shrinkage_width}
                        onChange={(e) => onShrinkageInputChange(e)}
                      />
                    </div>
                  </div>
                  <Button
                    className="mr-10 mb-10"
                    color="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={isButtonDisabled}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
          <Modal isOpen={showEditmodal} toggle={() => closeEditModal()}>
            <ModalHeader toggle={() => closeEditModal()}>Edit a Shrinkage</ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                    updateShrinkage(e);
                }}
              >
                <div className="row">
                  <div className="col-sm-4 col-md-4 col-xl-4">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Length"
                        required
                        name="shrinkage_length"
                        value={shrinkage.shrinkage_length}
                        onChange={(e) => onShrinkageInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-xl-4">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Width"
                        required
                        name="shrinkage_width"
                       value={shrinkage.shrinkage_width}
                        onChange={(e) => onShrinkageInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-xl-4">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Select Status"
                        required
                        select
                        name="shrinkage_status"
                        value={shrinkage.shrinkage_status}
                        SelectProps={{
                            MenuProps: {},
                          }}
                        onChange={(e) => onShrinkageInputChange(e)}
                        >
                            {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                        </TextField>
                    </div>
                  </div>
                <Button
                    className="mr-10 mb-10"
                    color="primary"
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={isButtonDisabled}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
    );
 };
 export default ShrinkageList;
