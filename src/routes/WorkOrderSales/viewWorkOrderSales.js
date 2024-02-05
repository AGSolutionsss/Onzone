import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Moment from 'moment';
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import { RctCard } from "Components/RctCard/index";
import CircularProgress from '@material-ui/core/CircularProgress';
import {baseURL} from '../../api';


const tablecss ={
    fontSize:'12px'
}

const tablelabel= {
    fontWeight:'600'
}

export default function View(props){
    const componentRef = useRef();
    const [workorder, setWorkOrder] = useState([]);
    const [workorderSub, setWorkOrderSub] = useState({});
    const [workorderFooter, setWorkOrderFooter] = useState({});
    const [loader, setLoader]= useState(true);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
    
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
    
        axios({
            url: baseURL+"/fetch-work-order-sales-view-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setWorkOrder(res.data.workordersales);
            setWorkOrderSub(res.data.workordersalessub);
            setWorkOrderFooter(res.data.workordersalesfooter);
          setLoader(false)
        });
      }, []);

      return (
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
                <>
                    <div className="invoice-wrapper">
                        <PageTitleBar title="Work Order Sales" match={props.match} />
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-xl-9 mx-auto" style={{width:'auto'}}>
                                <RctCard>
                                    <div 
                                        style={{
                                        display:
                                            localStorage.getItem("user_type_id") == 4
                                            ? "none" : "",
                                        }} className="invoice-head text-right">
                                        <ul className="list-inline">
                                        <li>
                                            <ReactToPrint
                                            trigger={() => (
                                                <a>
                                                <i className="mr-10 ti-printer"></i> Print Letter
                                                </a>
                                            )}
                                            content={() => componentRef.current}
                                            />
                                        </li>
                                        </ul>
                                    </div>
                                    <div className="p-10" ref={componentRef}>
                                        <div className="justify-content-between" style={{marginTop:'1cm',marginLeft: '1cm', marginRight: '1cm',marginBottom: '1cm', fontSize: '16px' }}>
                                            <table style={{width:'100%'}}>
                                                <tr>
                                                    <td><span>Retailer</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_sa_retailer_name}</span></td>
                                                    <td><span>Date</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{Moment(workorder.work_order_sa_date).format('DD-MM-YYYY')}</span></td>
                                                    <td><span>DC No</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_sa_dc_no}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>No of Box</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_sa_box}</span></td>
                                                    <td><span>Total Pcs</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_sa_pcs}</span></td>
                                                    <td><span>Sales By</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_sa_fabric_sale}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>Address</span></td>
                                                    <td><span>:</span></td>
                                                    <td colSpan="7"><span style={tablelabel}>{workorder.customer_address}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>Remarks</span></td>
                                                    <td><span>:</span></td>
                                                    <td colSpan="7"><span style={tablelabel}>{workorder.work_order_sa_remarks}</span></td>
                                                </tr>
                                            </table>
                                            <hr/>
                                            <table style={{width:'100%'}}>
                                                <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                    <th>Description</th>
                                                    <th>Amount</th>
                                                </tr>
                                                {workorderSub.map((fabricsub,key)=>(
                                                    <tr style={{border:"1px solid #8886862e"}} key={key}>
                                                        <td style={{border:"1px solid #8886862e",paddingLeft: "10px"}}><span style={tablecss}>{(fabricsub.work_order_sub_color == null ? "": fabricsub.work_order_sub_color+",")+""+
                                                            (fabricsub.work_order_sub_design == null ? "": fabricsub.work_order_sub_design+",")+""+
                                                            (fabricsub.work_order_sub_type == null ? "": fabricsub.work_order_sub_type+",")+""+
                                                            (fabricsub.work_order_sub_color_theme == null ? "": fabricsub.work_order_sub_color_theme+",")+""+
                                                            (fabricsub.work_order_sub_occasion == null ? "": fabricsub.work_order_sub_occasion+",")} </span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{fabricsub.finished_stock_amount}</span></td>
                                                    </tr>
                                                ))}
                                                <tfoot>
                                                    <tr style={{border:"1px solid #8886862e"}}>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>Total</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{workorderFooter.total_amount}</span></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </RctCard>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
      );

}