import React, { Component } from 'react';
import "./Employees.css";


class Employees extends Component{
    constructor(props){
        super(props);
        this.state ={employees: ""};
        this.onClick=this.onClick.bind(this);
    }

  
    onClick(){
        fetch("/employees")
            .then(res => res.text())
            .then(res => this.setState({ employees: res }));
        
    }

    render(){
        
        return(
            

        <div class="container">
            <div class="bg-text">
                
                <button class="btn btn-light" onClick={this.onClick}>View all employees</button>
  
                
                <p>{this.state.employees}</p>
                
          </div>
        </div>
   

        );
    }
}

export default Employees;