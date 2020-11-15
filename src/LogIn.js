import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        id: 0,
        email:"",
        user_name: "",
        password: "",
        userData: "",
     };
     this.handleSubmit=this.handleSubmit.bind(this);
     this.handleChange=this.handleChange.bind(this);
     this.LogOut=this.LogOut.bind(this);
     
  }

LogOut(){
    localStorage.removeItem("user");
    window.location.reload();

  }
  handleSubmit(event){
      event.preventDefault();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user_name: this.state.user_name, password: this.state.password })
    };
   console.log(this.state);
    fetch("/users/login", requestOptions)
        .then(response => response.json())
        .then(data => localStorage.setItem("user", data));

     
        fetch("/total_sales/"+this.state.user_name)
        .then(res => res.text())
        .then(res => this.setState({ userData: res }));
   
    
     


    

  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});

  }
  render(){
    if("user" in localStorage){
    
        return <div className="container">
        <div class="bg-text">{localStorage.getItem("user")} is logged in + {this.state.userData}
        <br/>
        <button  class="btn btn-light " onClick={this.LogOut}>Log out</button>
        </div></div>;
      }
      return(
        <div className="container">
        <div class="bg-text">
                          
            <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
            
            <div class="form-group">
                <input type="text" class="form-control" size="50" placeholder="Username" user_name={this.state.user_name}name ="user_name" onChange={this.handleChange} required />
            </div>
            <div class="form-group">
                <input type="text" class="form-control" size="50" placeholder="Password" password={this.state.password} name="password" onChange={this.handleChange} required />
            
            </div>

            <div class="text-right">
                <button type="submit"  class="btn btn-light " value="Submit">Log in</button>
               </div>
               <br />
            </form>
            
      </div>
      
    </div>
    

      
    );
    }
}

  export default SignUp;