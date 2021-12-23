import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import Articles from "./pages/Articles";
import ArticleEdit from "./pages/ArticleEdit";

const Routes = (props) => (
  <BrowserRouter {...props}>
    <Switch>
      <Route exact path="/articles" component={Articles} replace />
      <Route exact path="/articles/:id" component={ArticleDetail} replace />
      <Route
        exact
        path="/articles/:id/edit"
        component={ArticleEdit}
        replace
      />

      <Redirect to="/articles" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
