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
    const [workordersub, setWorkOrderSub] = useState({});
    const [workorderfooter, setWorkOrderFooter] = useState([]);
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
            url: baseURL+"/fetch-work-order-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            setWorkOrder(res.data.workorder);
            setWorkOrderSub(res.data.workordersub);
            setWorkOrderFooter(res.data.workorderfooter);
          setLoader(false)
        });
      }, []);

      return (
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
                <>
                    <div className="invoice-wrapper">
                        <PageTitleBar title="Work Order" match={props.match} />
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-xl-12 mx-auto" style={{width:'auto'}}>
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
                                                    <td><span>Factory</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_factory}</span></td>
                                                    <td><span>Ratio</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_ratio}</span></td>
                                                    <td><span>Work Date</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{Moment(workorder.work_order_date).format('DD-MM-YYYY')}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>Brands</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_brand}</span></td>
                                                    <td><span>Style</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_style_type}</span></td>
                                                    <td><span>Width</span></td>
                                                    <td><span>:</span></td>
                                                    <td><span style={tablelabel}>{workorder.work_order_width}</span></td>
                                                </tr>
                                                <tr>
                                                    <td><span>Remarks</span></td>
                                                    <td><span>:</span></td>
                                                    <td colSpan="7"><span style={tablelabel}>{workorder.work_order_remarks}</span></td>
                                                </tr>
                                            </table>
                                            <hr/>
                                            <table style={{width:'100%'}}>
                                                <thead>
                                                    <tr style={{background: '#84B0CA',textAlign: 'center',color: 'white'}}>
                                                        <th>Swatch</th>
                                                        <th>Mtrs</th>
                                                        <th>Sleeve</th>
                                                        <th>Cons</th>
                                                        <th>Size
                                                            <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                <th>36</th>
                                                                <th>38</th>
                                                                <th>40</th>
                                                                <th>42</th>
                                                                <th>44</th>
                                                            </tr>
                                                        </th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {workordersub.map((fabricsub,key)=>(
                                                        <>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td rowSpan={5} style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}></span></td>
                                                            <td rowSpan={5} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_length}</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Half</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{workorder.work_order_ratio_h_consumption}</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_36_h}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_38_h}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_40_h}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_42_h}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_44_h}</span></td>
                                                                </tr>
                                                            </td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_half_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td rowSpan={3} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}></span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>PCS</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_36_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_38_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_40_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_42_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_44_pcs}</span></td>
                                                                </tr>
                                                            </td>
                                                            <td rowSpan={4} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{fabricsub.work_order_sub_full_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>RATIO</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_36_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_38_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_40_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_42_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_44_ratio}</span></td>
                                                                </tr>
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>BITS</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_36_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_38_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_40_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_42_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_44_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Full</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{workorder.work_order_ratio_consumption}</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_36_pcs + fabricsub.work_order_sub_36_ratio + fabricsub.work_order_sub_36_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_38_pcs + fabricsub.work_order_sub_38_ratio + fabricsub.work_order_sub_38_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_40_pcs + fabricsub.work_order_sub_40_ratio + fabricsub.work_order_sub_40_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_42_pcs + fabricsub.work_order_sub_42_ratio + fabricsub.work_order_sub_42_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.work_order_sub_44_pcs + fabricsub.work_order_sub_44_ratio + fabricsub.work_order_sub_44_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                                {workorderfooter.map((wsub,key)=>(
                                                <tfoot>
                                                    <tr>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Total Fabric - SELF FOLDING</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{wsub.work_order_sub_length}</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Half</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>
                                                            <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                <td><span style={tablecss}>{wsub.work_order_sub_36_h}</span></td>
                                                                <td><span style={tablecss}>{wsub.work_order_sub_38_h}</span></td>
                                                                <td><span style={tablecss}>{wsub.work_order_sub_40_h}</span></td>
                                                                <td><span style={tablecss}>{wsub.work_order_sub_42_h}</span></td>
                                                                <td><span style={tablecss}>{wsub.work_order_sub_44_h}</span></td>
                                                            </tr></span>
                                                        </td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{wsub.work_order_sub_half_total}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Comments - FINE COTTON</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Full</span></td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}></span></td>
                                                        <td style={{border:"1px solid #8886862e"}}>
                                                            <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                <td><span style={tablecss}>{wsub.sum_36_pcs}</span></td>
                                                                <td><span style={tablecss}>{wsub.sum_38_pcs}</span></td>
                                                                <td><span style={tablecss}>{wsub.sum_40_pcs}</span></td>
                                                                <td><span style={tablecss}>{wsub.sum_42_pcs}</span></td>
                                                                <td><span style={tablecss}>{wsub.sum_44_pcs}</span></td>
                                                            </tr>
                                                        </td>
                                                        <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{wsub.work_order_sub_full_total}</span></td>
                                                    </tr>
                                                </tfoot>
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