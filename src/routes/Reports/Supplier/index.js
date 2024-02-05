import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import SupplierReport from './SupplierReport';

 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const Supplier = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="Onzone" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/supplierReport`} />
      <Route path={`${match.url}/supplierReport`} component={SupplierReport} />
    </Switch>
  </div>
);

export default Supplier;