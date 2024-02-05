import React, { Component } from "react";
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {baseURL} from '../../api';
import dateyear from '.././dateyear';
import {
  TotalSalesWidget,
  NetProfitWidget,
	TaxStatsWidget,
	ExpensesWidget,
  RecentOrdersWidget,
} from "Components/Widgets";
import axios from "axios";

const totalSales = {
  label: 'Stocks',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const netProfit = {
  label: 'Inward',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const taxStats = {
  label: 'Selected Fabric',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

const expenses = {
  label: 'Supplier',
  chartdata: [250, 310, 150, 420, 250, 450],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
}

 export default class NewsDashboard extends Component {
   state = {
     results: [],
   };
   

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){

      
      browserHistory.push("/logout");
      
    }else{

      
    }
     


     axios({
       url: baseURL+"/fetch-dashboard-data-by/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         localStorage.setItem("fabricInwardStockCount",this.state.results.fabricInwardStockCount);
         localStorage.setItem("fabricInwardCount",this.state.results.fabricInwardCount);
         localStorage.setItem("fabricInwardSelectionCount",this.state.results.fabricInwardSelectionCount);
         localStorage.setItem("supplierCount",this.state.results.supplierCount);
         
       })
       .catch((res) => {
         alert("Something Went Wrong!");
         
       });
   }

  render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>Onzone</title>
           <meta name="description" content="Onzone" />
         </Helmet>
         <div className="row">
            <div className="col-sm-3 col-md-3">
                <TotalSalesWidget
                  label={totalSales.label}
                  chartdata={totalSales.chartdata}
                  labels={totalSales.labels}
                  value = {this.state.results.fabricInwardStockCount}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <NetProfitWidget
                  label={netProfit.label}
                  chartdata={netProfit.chartdata}
                  labels={netProfit.labels}
                  value = {this.state.results.fabricInwardCount}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <TaxStatsWidget
                  label={taxStats.label}
                  chartdata={taxStats.chartdata}
                  labels={taxStats.labels}
                  value = {this.state.results.fabricInwardSelectionCount}
                />
            </div>
            <div className="col-sm-3 col-md-3">
                <ExpensesWidget
                  label={expenses.label}
                  chartdata={expenses.chartdata}
                  labels={expenses.labels}
                  value = {this.state.results.supplierCount}
                />
            </div>
          </div>
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-12 col-lg-12 w-xs-full"
						heading={<IntlMessages id="Recent Purchase Orders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<RecentOrdersWidget />
					</RctCollapsibleCard>
        </div>
     );
   }
 }
 