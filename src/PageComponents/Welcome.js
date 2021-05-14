import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";

export default function Welcome() {
  return (
    <div className={"flex flex-col text-sm text-emerald-500"}>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    </div>
  );
}
