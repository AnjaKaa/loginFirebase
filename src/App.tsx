import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegistrerPage';
import { UserSettingsPage } from './pages/UserSettingsPage';


import "./App.css";

export interface IAppProps {
}

export function App(props: IAppProps) {
  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <PrivateRoute exact path="/userinfo" component={UserSettingsPage} />
      <PrivateRoute exact path="/" component={HomePage} />
    </Switch>

  );
}


export default App;