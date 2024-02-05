import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MenuItem from "@material-ui/core/MenuItem";

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

const ratioGroup = [
    {
    value: "a",
    label: "a",
    },
    {
    value: "ab",
    label: "ab",
    },
];

const Edit = (props) => {

    let history = useHistory();
    const [ratio38, setRatio38] = useState([]);
    const [ratio40, setRatio40] = useState([]);
    const [ratio42, setRatio42] = useState([]);
    const [ratio44, setRatio44] = useState([]);
    const [ratioHalf, setRatioHalf] = useState({
        ratio_range: "",
        ratio_group: "",
        ratio_type38: "",
        ratio_type40: "",
        ratio_type42: "",
        ratio_type44: "",
        ratio_status: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    
    const onInputChange = (e) => {

        setRatioHalf({
        ...ratioHalf,
        [e.target.name]: e.target.value,
        });
    
    };

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/fetch-half-ratio-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setRatioHalf(res.data.ratioHalf)
            const str = res.data.ratioHalf.ratio_type
            var temp = new Array();
            temp = str.split(",");
            setRatio38(temp[0]);
            setRatio40(temp[1]);
            setRatio42(temp[2]);
            setRatio44(temp[3]);
          });
        }, []);

    const onSubmit = (e) => {
        let data = {
            ratio_range: ratioHalf.ratio_range,
            ratio_group: ratioHalf.ratio_group,
            ratio_type38: ratio38,
            ratio_type40: ratio40,
            ratio_type42: ratio42,
            ratio_type44: ratio44,
            ratio_status: ratioHalf.ratio_status,
        };

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/update-half-ratio/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("RatioHalf Updated Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit RatioHalf" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <TextField
                    fullWidth
                    required
                    disabled
                    label="Ratio Range"
                    autoComplete="Name"
                    name="ratio_range"
                    value={ratioHalf.ratio_range}
                    onChange={(e) => onInputChange(e)}
                    />
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
              <TextField
                  fullWidth
                  required
                  label="Ratio Group"
                  disabled
                  autoComplete="Name"
                  name="ratio_group"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  select
                  value={ratioHalf.ratio_group}
                  onChange={(e) => onInputChange(e)}
                >
                    {ratioGroup.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
              <div className="form-group">
                <TextField
                  id="select-corrpreffer"
                  required
                  select
                  label="Status"
                  SelectProps={{
                    MenuProps: {},
                  }}
                  name="ratio_status"
                  value={ratioHalf.ratio_status}
                  onChange={(e) => onInputChange(e)}
                  fullWidth
                >
                  {status.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half 38"
                  autoComplete="Name"
                  name="ratio_type38"
                  value={ratio38}
                  onChange={(e) => setRatio38(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half 40"
                  autoComplete="Name"
                  name="ratio_type40"
                  value={ratio40}
                  onChange={(e) => setRatio40(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half 42"
                  autoComplete="Name"
                  name="ratio_type42"
                  value={ratio42}
                  onChange={(e) => setRatio42(e.target.value)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half 44"
                  autoComplete="Name"
                  name="ratio_type44"
                  value={ratio44}
                  onChange={(e) => setRatio44(e.target.value)}
                />
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Update
            </Button>
            <Link to="listing">
              <Button className="mr-10 mb-10" color="success">
                Back
              </Button>
            </Link>
          </div>
            </div>
          </div>

          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Edit;