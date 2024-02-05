import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import FabricInwardsStockForm from "./FabricInwardsStockForm";
 import FabricInwardsStockReport from './FabricInwardsStockReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const FabricInwardsStock = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="FTS Donations" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fabricinwardsStockForm`} />
      <Route path={`${match.url}/fabricinwardsStockForm`} component={FabricInwardsStockForm} />
      <Route path={`${match.url}/fabricinwardsStockReceipt`} component={FabricInwardsStockReport} />
      

    </Switch>
  </div>
);

export default FabricInwardsStock;