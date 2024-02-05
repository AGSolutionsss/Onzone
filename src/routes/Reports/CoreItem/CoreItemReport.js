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

const CoreItemReport = (props) => {
  const componentRef = useRef();
  const [coreitemView, setCoreItemView] = useState({});
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
      url: baseURL+"/fetch-core-item-report" ,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setCoreItemView(res.data.coreitems);
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
      url: baseURL+"/download-core-item-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'supplier_report.csv'); 
      document.body.appendChild(link);
      link.click();
      NotificationManager.success("Supplier Report is Downloaded Successfully");
    }).catch((err) =>{
      NotificationManager.error("Supplier Report is Not Downloaded");
    });
  };

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Core Item" match={props.match} />
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
                        <b style={{fontSize: '20px'}}>CORE ITEM</b>
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
                            <TableCell style={table_head}>P CODE</TableCell>
                            <TableCell style={table_head}>BRAND</TableCell>
                            <TableCell style={table_head}>ATTRIBUTES</TableCell>
                            <TableCell style={table_head}>RATE</TableCell>
                            <TableCell style={table_head}>NAME</TableCell>
                            <TableCell style={table_head}>STATUS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {coreitemView.map((datalist, key) => (
                            <TableRow key={datalist.core_items_name}>
                                <TableCell style={table_row_start}>{datalist.core_items_name}</TableCell>
                                <TableCell style={table_row_start}>{datalist.core_items_brand}</TableCell>
                                <TableCell style={table_row_start}>{(datalist.core_items_attr_color == null ? "": datalist.core_items_attr_color+",")}
                                {(datalist.core_items_attr_design == null ? "": datalist.core_items_attr_design+",")}
                                {(datalist.core_items_attr_type == null ? "": datalist.core_items_attr_type+",")}
                                {(datalist.core_items_attr_color_theme == null ? "": datalist.core_items_attr_color_theme+",")}
                                {(datalist.core_items_attr_occasion == null ? "": datalist.core_items_attr_occasion+",")},</TableCell>
                                <TableCell style={table_row_center}>{datalist.core_items_rate}</TableCell>
                                <TableCell style={table_row_center}>{datalist.core_items_nick_name}</TableCell>
                                <TableCell style={table_row_center}>{datalist.core_items_status}</TableCell>
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
export default CoreItemReport;
