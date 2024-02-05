import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../../api';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';


  const table_head = {
    border: "1px solid black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px"
  };

  const table_row_center = {
    textAlign: "center",
    border: "1px solid black",
  };
  
  const table_row_start = {
    textAlign: "start",
    border: "1px solid black",
    paddingLeft: "20px",
  };

const RetailerReport = (props) => {
  const componentRef = useRef();
  const [retailerView, setRetailerView] = useState({});
  const [loader, setLoader]= useState(true);
  

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    var url = new URL(window.location.href);
   
    var donor = url.searchParams.get("donor");
 
    
    axios({
      url: baseURL+"/fetch-customer-report" ,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setRetailerView(res.data.customer);
        setLoader(false)
      
    });
  }, []);
 
  const  handleExportWithFunction  = (e) => {
    savePDF(componentRef.current, { 
      paperSize:  "A4", 
      orientation: "vertical",
        scale: 0.8,
    });
  }

  const onDownload = (e) => {
    
    e.preventDefault();
    let data = {
    };
    
    axios({
      url: baseURL+"/download-customer-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'retailer_report.csv'); 
      document.body.appendChild(link);
      link.click();
      NotificationManager.success("Retailer Report is Downloaded Successfully");
    }).catch((err) =>{
      NotificationManager.error("Retailer Report is Not Downloaded");
    });
  };

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Retailers" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
            <RctCard>
              <div 
                
                className="invoice-head text-right">
                <ul className="list-inline">
                <li>
                  <a onClick={(e) => onDownload(e)}>
                      <i className="mr-10 ti-download"></i> Download
                    </a>
                    </li>
                <li>
                  <a onClick={(e) => handleExportWithFunction(e)}>
                      <i className="mr-10 ti-download"></i> PDF
                    </a>
                    </li>
                  <li>
                    <ReactToPrint
                      trigger={() => (
                        <a>
                          <i className="mr-10 ti-printer"></i> Print
                        </a>
                      )}
                      content={() => componentRef.current}
                    />
                  </li>
                </ul>
              </div>
              <div className="p-10" ref={componentRef} style={{margin: '5px'}}>
                <div className="d-flex justify-content-between" style={{fontSize: '16px' }}>
                  <div className="invoice-logo ">
                    
                  </div>
                  <div className="address text-center">
                    
                    <h2 style={{paddingTop: '5px'}}>
                      <strong>
                        <b style={{fontSize: '20px'}}>RETAILERS</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                <br />
                <div className="table-responsive mt-4">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black'}}>
                      <TableHead>          
                        <TableRow>
                            <TableCell style={table_head}>RETAILER</TableCell>
                            <TableCell style={table_head}>TYPE</TableCell>
                            <TableCell style={table_head}>MOBILE</TableCell>
                            <TableCell style={table_head}>EMAIL</TableCell>
                            <TableCell style={table_head}>ADDRESS</TableCell>
                            <TableCell style={table_head}>STATUS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {retailerView.map((datalist, key) => (
                            <TableRow key={key}>
                                <TableCell style={table_row_start}>{datalist.customer_name}</TableCell>
                                <TableCell style={table_row_start}>{datalist.customer_type}</TableCell>
                                <TableCell style={table_row_start}>{datalist.customer_mobile}</TableCell>
                                <TableCell style={table_row_start}>{datalist.customer_email}</TableCell>
                                <TableCell style={table_row_center}>{datalist.customer_address}</TableCell>
                                <TableCell style={table_row_center}>{datalist.customer_status}</TableCell>
                            </TableRow>
                            ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </RctCard>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};
export default RetailerReport;
