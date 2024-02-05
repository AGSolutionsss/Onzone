import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import FabricInwardsSummaryForm from "./FabricInwardsSummaryForm";
 import FabricInwardsSummaryReport from './FabricInwardsSummaryReport';
 
 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const FabricInwardsSummary = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="FTS Donations" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/fabricinwardsForm`} />
      <Route path={`${match.url}/fabricinwardsForm`} component={FabricInwardsSummaryForm} />
      <Route path={`${match.url}/fabricinwardsReceipt`} component={FabricInwardsSummaryReport} />
      

    </Switch>
  </div>
);

export default FabricInwardsSummary;