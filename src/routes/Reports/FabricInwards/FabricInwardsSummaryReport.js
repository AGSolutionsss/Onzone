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
import Moment from 'moment';
import { Button } from "reactstrap";
import { NotificationContainer, NotificationManager,} from "react-notifications";
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

const table_row = {
  border: "1px solid black",
  fontSize: "11px",
  paddingLeft: "30px"
};

const table_row_amount = {
  border: "1px solid black",
  textAlign: "right",
  fontSize: "11px",
  paddingRight: "30px"
};



const table_row_count = {
  border: "1px solid black",
  textAlign: "center",
  fontSize: "11px"
};

const table_head = {
  border: "1px solid black",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "12px"
};



const FabricInwardsSummaryReport = (props) => {
  const componentRef = useRef();
  const [fabricinwardssummary, setSummary] = useState({});
  const [loader, setLoader]= useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  useEffect(() => {
    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      window.location = "/signin";
    }else{
    }

    var url = new URL(window.location.href);
    let data = {
      fabric_inward_supplier:localStorage.getItem("fabric_inward_supplier"),
      inward_from_date: localStorage.getItem("inward_from_date"), 
      inward_to_date: localStorage.getItem("inward_to_date"),
    };
    

    axios({
      url: baseURL+"/fetch-fabric-inwards-report",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    }).then((res) => {
        setSummary(res.data.fabricinward);
        
        setLoader(false)
      
    });
  }, []);
 

  const onSubmit = (e) => {
    e.preventDefault();
    let data = {
      abric_inward_supplier:localStorage.getItem("fabric_inward_supplier"),
      inward_from_date: localStorage.getItem("inward_from_date"), 
      inward_to_date: localStorage.getItem("inward_to_date"),
       
      
    };
    
  
    setIsButtonDisabled(true)
      axios({
        url: baseURL+"/download-fabric-inwards-summary",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("login")}`,
        },
      }).then((res) => {
          console.log("data : ",res.data);
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'fabric_inwards_summary.csv'); 
          document.body.appendChild(link);
          link.click();
          NotificationManager.success("Report is Downloaded Successfully");
          setIsButtonDisabled(false)
        }).catch((err) =>{
          NotificationManager.error("Receipt is Not Downloaded");
          setIsButtonDisabled(false)
        });
  
  };

const  handleExportWithFunction  = (e) => {
  savePDF(componentRef.current, { 
    paperSize:  "A4", 
    orientation: "vertical",
      scale: 0.8,
  });
}

  return (
    <div>
      { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
      {!loader && 
      <>
      <div className="invoice-wrapper">
        <PageTitleBar title="Fabric Inwards Summary" match={props.match} />
        <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
          
            <RctCard>
              <div 
        
                className="invoice-head text-right">
                <ul className="list-inline">
                <li>
                  <a onClick={(e) => handleExportWithFunction(e)}>
                      <i className="mr-10 ti-download"></i> PDF
                    </a>
                    </li>
                  <li>
                    <a  onClick={(e) => onSubmit(e)}>
                      <i className="mr-10 ti-download"></i> Download
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
                        <b style={{fontSize: '20px'}}>FABRIC INWARDS SUMMARY</b>
                      </strong>
                    </h2>
                  </div>
                  <div className="invoice-logo text-right">
                    
                  </div>
                </div>
                
                <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table" style={{border: '2px solid black', marginTop: '20px'}}>
                      <TableHead>          
                        <TableRow>
                          <TableCell style={table_head}>LR Date</TableCell>
                          <TableCell style={table_head}>Supplier</TableCell>
                          <TableCell style={table_head}>LR No</TableCell>
                          <TableCell style={table_head}>Invoice</TableCell>
                          <TableCell style={table_head}>Width</TableCell>
                          <TableCell style={table_head}>No of Bundles</TableCell>
                          <TableCell style={table_head}>Status</TableCell>
                          <TableCell style={table_head}>Remarks</TableCell>
                         </TableRow>
                      </TableHead>
                      <TableBody>
                        {fabricinwardssummary.map((dataSumm, key)=>(
                          <TableRow key={dataSumm.fabric_inward_lr_date}>
                            <TableCell style={table_row_count}>{Moment(dataSumm.fabric_inward_lr_date).format('DD-MM-YYYY')}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_supplier}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_lr_no}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_invoice}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_width}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_lr_no_bundles}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_status}</TableCell>
                            <TableCell style={table_row_count}>{dataSumm.fabric_inward_remarks}</TableCell>
                            
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
export default FabricInwardsSummaryReport;
