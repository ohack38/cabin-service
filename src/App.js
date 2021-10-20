import React, { useEffect, useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import LoginComponent from './components/LoginComponent';
import MainComponent from './components/MainComponent';
import OrderComponent from './components/OrderComponent';
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute exact path="/" component={MainComponent} />
          <PrivateRoute exact path="/orders" component={OrderComponent} />
          <Route path="/login" component={LoginComponent} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
