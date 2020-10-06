import React, { Component } from 'react'
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect, Link
} from "react-router-dom";
import App from '../App'
import login from './login';
import Login from './login'

const fakeAuth =false;

function Mainpage() {
    
  return(
            <div>
                
                <Router>
                    <Routes/>
                    <Link to="/login"> Login</Link>
                    <Link to="protected">..Protec..</Link>
                    <Link to="/dash"> DashBoard</Link>
                </Router>
            </div>
  )
}

const Routes = () =>{
    return(
        <Switch>
            <Route path="/login" component={login}></Route>
            <Route path="/dash" component={App}></Route>
            <PrivateRoute path="/protected" component={protectedPage}/>
        </Switch>
    )
}
const protectedPage= () =>{
return(
    <h2>Protected</h2>
)
}

function PrivateRoute ({component: Component ,...rest}) {
    return(
<Route {...rest} render={(props) => (
    fakeAuth === true ?
    <component {...props} />
    : <Redirect to="/login"/>
)} />
    )}

export default Mainpage;