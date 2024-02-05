import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import RetailerReport from './RetailerReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const Retailer = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="Onzone" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/RetailerReport`} />
      <Route path={`${match.url}/RetailerReport`} component={RetailerReport} />
    </Switch>
  </div>
);

export default Retailer;