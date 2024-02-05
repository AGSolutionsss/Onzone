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
    const [fabricinward, setFabricInward] = useState([]);
    const [fabricinwardsub, setFabricInwardSub] = useState({});
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
            url: baseURL+"/fetch-fabric-inward-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setFabricInward(res.data.fabricInward);
            setFabricInwardSub(res.data.fabricInwardSub);
          setLoader(false)
        });
      }, []);

      return (
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
                <>
                    <div className="invoice-wrapper">
                        <PageTitleBar title="Fabric Inward" match={props.match} />
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
                                                    <td><span>Supplier</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_supplier}</span></td>
                                                    <td><span>LR No</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_lr_no}</span></td>
                                                    <td><span>LR Date</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{Moment(fabricinward.fabric_inward_lr_date).format('DD-MM-YYYY')}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>No of Bundles</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_lr_no_bundles}</span></td>
                                                    <td><span>Invoice</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_invoice}</span></td>
                                                    <td><span>Width</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_width}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>Brand</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{fabricinward.fabric_inward_brand}</span></td>
                                                    <td><span>Remarks</span></td>
                                                    <td><span>:</span></td>
                                                    <td colSpan="7"><span style={tablelabel}>{fabricinward.fabric_inward_remarks}</span></td>
                                                </tr>
                                            </table>
                                            <hr/>
                                            <table style={{width:'100%'}}>
                                                <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                    <th>T Code</th>
                                                    <th>P Code</th>
                                                    <th>Length</th>
                                                    <th>Attributes</th>
                                                    <th>Shrinkage</th>
                                                    <th>Rate</th>
                                                </tr>
                                                {fabricinwardsub.map((fabricsub,key)=>(
                                                    <tr style={{border:"1px solid #8886862e"}}>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{fabricsub.fabric_inward_sub_barcode}</span></td>
                                                        <td style={{border:"1px solid #8886862e",paddingLeft: "10px"}}><span style={tablecss}>{fabricsub.fabric_inward_sub_name}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{fabricsub.fabric_inward_sub_length}</span></td>
                                                        <td style={{border:"1px solid #8886862e",paddingLeft: "10px"}}><span style={tablecss}>{(fabricsub.fabric_inward_sub_color == null ? "": fabricsub.fabric_inward_sub_color+",")+""+
                                                            (fabricsub.fabric_inward_sub_design == null ? "": fabricsub.fabric_inward_sub_design+",")+""+
                                                            (fabricsub.fabric_inward_sub_type == null ? "": fabricsub.fabric_inward_sub_type+",")+""+
                                                            (fabricsub.fabric_inward_sub_color_theme == null ? "": fabricsub.fabric_inward_sub_color_theme+",")+""+
                                                            (fabricsub.fabric_inward_sub_occasion == null ? "": fabricsub.fabric_inward_sub_occasion+",")} </span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{fabricsub.fabric_inward_sub_shrinkage}</span></td>
                                                        
                                                        <td style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}>{fabricsub.fabric_inward_sub_rate}</span></td>
                                                    </tr>
                                                ))}
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