import React from "react";
 import { Redirect, Route, Switch } from "react-router-dom";
 import { Helmet } from "react-helmet";
 
 // async components
 
 import CoreItemReport from './CoreItemReport';

 
 import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
 } from "Components/AsyncComponent/AsyncComponent";

 const CoreItem = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="Onzone" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/coreitemReport`} />
      <Route path={`${match.url}/coreitemReport`} component={CoreItemReport} />
    </Switch>
  </div>
);

export default CoreItem;