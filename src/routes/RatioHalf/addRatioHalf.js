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

const ratioGroup = [
    {
    value: "a",
    label: "a",
    },
    {
    value: "ab",
    label: "ab",
    },
]

const Add = (props) => {

    let history = useHistory();
    const [ratioHalf, setRatioHalf] = useState({
        ratio_range: "",
        ratio_group: "",
        ratio_type38: "",
        ratio_type40: "",
        ratio_type42: "",
        ratio_type44: "",
    });

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    
    const onInputChange = (e) => {

        setRatioHalf({
        ...ratioHalf,
        [e.target.name]: e.target.value,
        });
    
    };

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }
        
    });

    const onSubmit = (e) => {
        let data = {
            ratio_range: ratioHalf.ratio_range,
            ratio_group: ratioHalf.ratio_group,
            ratio_type38: ratioHalf.ratio_type38,
            ratio_type40: ratioHalf.ratio_type40,
            ratio_type42: ratioHalf.ratio_type42,
            ratio_type44: ratioHalf.ratio_type44,
        };
        

        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/create-half-ratio",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("RatioHalf is Inserted Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Create RatioHalf" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Ratio Range"
                  autoComplete="Name"
                  name="ratio_range"
                  value={ratioHalf.ratio_range}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Ratio Group"
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
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <TextField
                  fullWidth
                  required
                  label="Half 38"
                  autoComplete="Name"
                  name="ratio_type38"
                  value={ratioHalf.ratio_type38}
                  onChange={(e) => onInputChange(e)}
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
                  value={ratioHalf.ratio_type40}
                  onChange={(e) => onInputChange(e)}
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
                  value={ratioHalf.ratio_type42}
                  onChange={(e) => onInputChange(e)}
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
                  value={ratioHalf.ratio_type44}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-12">
            <div className="receiptbuttons" style={{textAlign:'center'}}>
            <Button
              type="submit"
              className="mr-10 mb-10"
              color="primary"
              onClick={(e) => onSubmit(e)}
              disabled={isButtonDisabled}
            >
              Submit
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

export default Add;