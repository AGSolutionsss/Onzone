import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Add from "./addWorkOrder";
import Edit from "./editWorkOrder";
import View from "./viewWorkOrder";
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListWorkOrder = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Onzone</title>
      <meta name="description" content="Onzone" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/add`} component={Add} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
    </Switch>
  </div>
);

export default NewListWorkOrder;