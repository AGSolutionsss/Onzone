import React, { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import "./style.css";
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

const StyleList = (props) =>{
    const classes = useStyles();

    const [showmodal, setShowmodal] = useState(false);
  
    const [showEditmodal, setShowEditmodal] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const [selected_style_id, setStyleId] = useState("");

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
    const [styles, setStyles] = useState([]);
    const [style, setStyle] = useState({
        style_type: "",
        style_status: "",
    });

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
        axios({
          url:
          baseURL+"/fetch-style-list",
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setStyles(res.data.style);
        });
     }, []);

    const onStyleInputChange = (e) => {
        
        setStyle({
             ...style,
            [e.target.name]: e.target.value,
        });
        
    };

    const createStyle = (e) => {
        e.preventDefault();
        setIsButtonDisabled(true)
        let data = {
            style_type: style.style_type,
        };
     
        axios({
          url: baseURL+"/create-style",
          method: "POST",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        })
          .then((res) => {
            setStyles(res.data.style);
            NotificationManager.success("Style is Created Successfully");
            setIsButtonDisabled(false)
            closegroupModal();
          })
          .catch((error) => {
            NotificationManager.danger("Failed to Create");
            setIsButtonDisabled(false)
            closegroupModal();
          });
    };

    

    const updateStyle = (e) => {
        e.preventDefault();
        setIsButtonDisabled(true)
        let data = {
            style_type: style.style_type,
            style_status: style.style_status,
        };
    
        axios({
          url:
          baseURL+"/update-style/" + selected_style_id,
          method: "PUT",
          data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        })
          .then((res) => {
            setStyles(res.data.style);
            NotificationManager.success("Style is Updated Successfully");
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
            Create A New Style
          </Button>
          
          <RctCollapsibleCard>
            <div>
              <h1>Style</h1>
              <br />
    
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Style</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {styles.map((style_data, key) => (
                      <TableRow key={style_data.id}>
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>{style_data.style_type}</TableCell>
                        <TableCell>{style_data.style_status}</TableCell>
                        <TableCell>
                          {" "}
                          <Button
                            className="mr-10 mb-10"
                            color="primary"
                            onClick={() => {
                                setStyle({
                                ...style,
                                style_type: style_data.style_type,
                                style_status: style_data.style_status,
                              });
                              setStyleId(style_data.id);
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
              Create A New Style
            </ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                    createStyle(e);
                }}
              >
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-xl-12">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Style Type"
                        required
                        name="style_type"
                        value={style.style_type}
                        onChange={(e) => onStyleInputChange(e)}
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
            <ModalHeader toggle={() => closeEditModal()}>Edit a Style</ModalHeader>
            <ModalBody>
              <form
                autoComplete="off"
                onSubmit={(e) => {
                    updateStyle(e);
                }}
              >
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xl-6">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Enter Style Type"
                        required
                        name="style_type"
                        value={style.style_type}
                        onChange={(e) => onStyleInputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-6">
                    <div className="form-group">
                      <TextField
                        fullWidth
                        label="Select Status"
                        required
                        select
                        name="style_status"
                        value={style.style_status}
                        SelectProps={{
                            MenuProps: {},
                          }}
                        onChange={(e) => onStyleInputChange(e)}
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
                    Update
                  </Button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
    );
};
export default StyleList;