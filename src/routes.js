import React from "react";
import Layout from "./Hoc/Layout";
import { Switch } from "react-router-dom";

import PrivateRoutes from "./components/authRoutes/privateRoutes";
import PublicRoutes from "./components/authRoutes/publicRoutes";

import Home from "./components/home";
import SignIn from "./components/signin";

import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches";

const Routes = props => {
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoutes
            {...props}
            exact
            component={AdminMatches}
            path="/admin_matches"
          />
          <PrivateRoutes
            {...props}
            exact
            component={Dashboard}
            path="/dashboard"
          />
          <PublicRoutes
            {...props}
            restricted={true}
            path="/sign_in"
            exact
            component={SignIn}
          />
          <PublicRoutes
            {...props}
            restricted={false}
            path="/"
            exact
            component={Home}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
