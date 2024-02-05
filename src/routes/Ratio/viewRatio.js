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
    const [ratio, setRatio] = useState({});
    const [loader, setLoader]= useState(true);

    var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        const RatioId = id;

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
    
          window.location = "/signin";
          
        }else{
    
        }
    
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
    
        axios({
            url: baseURL+"/fetch-ratio-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
            
            setRatio(res.data.ratio);
            
          setLoader(false)
        });
      }, []);

      return (
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
                <>
                    <div className="invoice-wrapper">
                        <PageTitleBar title="Ratio" match={props.match} />
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
                                            <h1>{RatioId}</h1>
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
                                                    {ratio.map((fabricsub,key)=>(
                                                        <>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td rowSpan={5} style={{border:"1px solid #8886862e",textAlign:"center"}}><span style={tablecss}></span></td>
                                                            <td rowSpan={5} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{fabricsub.ratio_mtr}</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Half</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>1.2</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>0</span></td>
                                                                    <td><span style={tablecss}>0</span></td>
                                                                    <td><span style={tablecss}>0</span></td>
                                                                    <td><span style={tablecss}>0</span></td>
                                                                    <td><span style={tablecss}>0</span></td>
                                                                </tr>
                                                            </td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>0</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td rowSpan={3} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}></span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>PCS</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_pcs}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_pcs}</span></td>
                                                                </tr>
                                                            </td>
                                                            <td rowSpan={4} style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>{fabricsub.ratio_total}</span></td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>RATIO</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_ratio}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_ratio}</span></td>
                                                                </tr>
                                                            </td>
                                                            
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>BITS</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        <tr style={{border:"1px solid #8886862e"}}>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>Full</span></td>
                                                            <td style={{border:"1px solid #8886862e",textAlign:'center'}}><span style={tablecss}>1.4</span></td>
                                                            <td style={{border:"1px solid #8886862e"}}>
                                                                <tr style={{display:'flex',justifyContent:'space-around'}}>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_36_pcs + fabricsub.ratio_36_ratio + fabricsub.ratio_36_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_38_pcs + fabricsub.ratio_38_ratio + fabricsub.ratio_38_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_40_pcs + fabricsub.ratio_40_ratio + fabricsub.ratio_40_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_42_pcs + fabricsub.ratio_42_ratio + fabricsub.ratio_42_bits}</span></td>
                                                                    <td><span style={tablecss}>{fabricsub.ratio_44_pcs + fabricsub.ratio_44_ratio + fabricsub.ratio_44_bits}</span></td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                                
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