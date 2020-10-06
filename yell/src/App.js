import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, Avatar, Input, Typography } from 'antd';

const client =  new WebSocket('ws://192.168.0.136:3333');

const { Search } = Input;

export default class App extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       messages:[],
       
      fuelAmount:"",
      pompNum:""
    }
  }
  

  componentDidMount= ()=>{
    client.onopen = () =>{
      console.log('Connection opened!');
    };
    client.onmessage = ({data}) =>{
      const dataFromServer = JSON.parse(data);
      this.setState((state) =>
          ({
            messages: [...state.messages, dataFromServer.fuel, dataFromServer.pompNum]
          })
        );
      
    }
   
}

  onTypeFuel = (e) =>{
    this.setState({fuelAmount: e.target.value})
  }
  onTypePomp = (e) =>{
    this.setState({pompNum: e.target.value})
  }

  onButtonClick = () =>{
    this.setState({fuelAmount:"", pompNum:""})
   
    client.send(JSON.stringify({
      fuel: this.state.fuelAmount,
      pompNum: this.state.pompNum
    }))
  }
  msgsShow = () => this.state.messages.map(msg => 
  <p key={msg}>{msg}</p>
    )
  render=()=> 
   
      <div>
          <form >
          <h1>Start Fuel</h1>
           <div className="icon">
             <i className="fas fa-gas-pump"></i>
           </div>
           <div className="formcontainer">
      <div className="container">
        <label ><strong>Fuel Amount</strong></label>
        <input className="form-control" type="text" value={this.state.fuelAmount} placeholder="Enter Fuel Amount in LT" onChange={this.onTypeFuel} required />
        <label ><strong>Pomp Number</strong></label>
        <input type="text" value={this.state.pompNum} placeholder="Enter Pomp Number" onChange={this.onTypePomp} required />
      </div>
      <button type="button" onClick={this.onButtonClick}><strong>Charge Fuel</strong></button>
      <div className="container" >
        {this.msgsShow()}
      </div>
      </div>
          </form>

      </div>
  
}
