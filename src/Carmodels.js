import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";



class Carmodels extends Component{
    constructor(props){
        super(props);
        this.state ={
            getModels: "",
            postModels:"",
            id: 0,
            model: "",
            brand: "",
            price: 0,
        
    };
        this.onClickGet=this.onClickGet.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onDelete(event){
        event.preventDefault();
        
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id})
        };
       
        fetch("/carmodels/"+this.state.id, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    
        alert("Car with id: "+ this.state.id + " was deleted");
        this.form2.reset();
        this.setState({
            getModels: "",
            postModels:"",
            id: 0,
            model: "",
            brand: "",
            price: 0,
        
    });

    }
    onClickGet() {
        fetch("/carmodels")
            .then(res => res.text())
            .then(res => this.setState({ carModels: res }));
    }

    handleIdChange(event){
        this.setState({id: event.target.value});
        
    }


    handleModelChange(event){
        this.setState({model: event.target.value});
        
    }

    handleBrandChange(event){
        this.setState({brand: event.target.value});
    }

    handlePriceChange(event){
        this.setState({price: event.target.value});
        
    }

   
    handleSubmit(event){
        event.preventDefault();
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.id,  brand: this.state.brand, model: this.state.model, price: this.state.price })
        };
       
        fetch("/carmodels", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    
        alert("Car with id: "+ this.state.id + " was added");
        this.form.reset();
        this.setState({
            getModels: "",
            postModels:"",
            id: 0,
            model: "",
            brand: "",
            price: 0,
        
    });
    }

    render(){
        
        
        return(
         
           
            <div className="container">
            <div class="bg-text">
            <div class="text-left">
                <button  class="btn btn-light" onClick={this.onClickGet}>View all carmodels</button>
             </div>
             
             
                
                
                <form ref={form => this.form = form} onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <input type="number" class="form-control" size="50" placeholder="Id number" id={this.state.id} onChange={this.handleIdChange} required />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" size="50" placeholder="Model" model={this.state.model} onChange={this.handleModelChange} required />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" size="50" placeholder="Brand" brand={this.state.brand} onChange={this.handleBrandChange} required />
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" size="50" placeholder="Price" price={this.state.price} onChange={this.handlePriceChange} required />
                
                </div>

                <div class="text-right">
                    <button type="submit"  class="btn btn-light " value="Submit">Add a new carmodel</button>
                   </div>
                   <br />
                </form>
                <form ref={form2 => this.form2 = form2} onSubmit={this.onDelete}>
                <div class="form-group">
                    <input type="number" class="form-control" size="50" placeholder="Id number" id={this.state.id} onChange={this.handleIdChange} required />
                </div>
                <div class="text-right">
                    <button type="submit"  class="btn btn-danger " onClick={this.Delete}>Delete a carmodel</button>
                   </div>
                </form>
                <p>{this.state.carModels}</p>
          </div>
          
        </div>
        
        );
    }
}

export default Carmodels;