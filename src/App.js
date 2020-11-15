import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Carmodels from "./Carmodels";
import Employees from "./Employees";
import LogIn from "./LogIn";
import SignUp from "./SignUp";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

callAPI() {
    fetch("/employees")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}



  render() {
    const carModels = (params) => <Carmodels {...params}/>;
    const employees = (params) => <Employees {...params}/>;
    const signUp =  (params) => <SignUp {...params}/>;
    const logIn =  (params) => <LogIn {...params}/>;
    return (
      <Route>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark ">
          <a href="/" className="navbar-brand">
            Carshop
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item ">
              <Link to={"/carmodels"} className="nav-link">
                Carmodels
              </Link>
            </li>
          </div>
          <div className="navbar-nav ml-auto">
          <li className="nav-item ">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log in
              </Link>
            </li>
            
          </div>
        </nav>
        <div className="container" > 
          
        </div>
        
        <Route path="/carmodels" render={carModels}></Route>
        <Route path="/employees" render={employees}></Route>
        <Route path="/signup" render={signUp}></Route>
        <Route path="/login" render={logIn}></Route>
      </div>
      
        
        
      </Route>
      
    );
  }
}

export default App;
