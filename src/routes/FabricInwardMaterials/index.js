import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addFabricImages";
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListFabricInwardMaterials = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Onzone</title>
      <meta name="description" content="Onzone" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/addimage`} component={Add} />
    </Switch>
  </div>
);

export default NewListFabricInwardMaterials;