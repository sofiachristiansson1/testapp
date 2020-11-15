import React, { Component } from "react";

class SignUp extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        id: 0,
        email:"",
        user_name: "",
        password: "",
     };
     this.handleSubmit=this.handleSubmit.bind(this);
     this.handleChange=this.handleChange.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.state.id,  email: this.state.email, user_name: this.state.user_name, password: this.state.password })
    };
   
    fetch("/users/", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

    alert("User with id: "+ this.state.id + " was added");
    this.form.reset();
    this.setState({
        id: 0,
        email:"",
        user_name: "",
        password: "",
    
});
}

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);

  }
  render(){
      return(
        <div className="container">
        <div class="bg-text">
        
            <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
            <div class="form-group">
                <input type="number" class="form-control" size="50" placeholder="Id number" id={this.state.id} name="id" onChange={this.handleChange} required />
            </div>
            <div class="form-group">
                <input type="email" class="form-control" size="50" placeholder="Email" email={this.state.email} name="email" onChange={this.handleChange} required />
            </div>
            <div class="form-group">
                <input type="text" class="form-control" size="50" placeholder="Username" user_name={this.state.user_name} name ="user_name" onChange={this.handleChange} required />
            </div>
            <div class="form-group">
                <input type="text" class="form-control" size="50" placeholder="Password" password={this.state.password} name="password" onChange={this.handleChange} required />
            
            </div>

            <div class="text-right">
                <button type="submit"  class="btn btn-light " value="Submit">Create a new user</button>
               </div>
               <br />
            </form>
            
      </div>
      
    </div>
    

      
    );
    }
}

  export default SignUp;