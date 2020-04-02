import React from "react";
import Layout from "./Hoc/Layout";
import { Switch, Route } from "react-router-dom";

import PrivateRoutes from "./components/authRoutes/privateRoutes";

import Home from "./components/home";
import SignIn from "./components/signin";

import Dashboard from "./components/admin/Dashboard";

const Routes = props => {
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoutes
            {...props}
            exact
            component={Dashboard}
            path="/dashboard"
          />
          <Route exact component={SignIn} path="/sign_in" />
          <Route exact component={Home} path="/" />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
