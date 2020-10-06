import React, { Component } from 'react'
import { Card, Avatar, Input, Typography } from 'antd';

const client =  new WebSocket('ws://192.168.0.136:3333');

const { Search } = Input;

export default class login extends Component {
    render() {
        return (
            <div>
         <div style={{ padding: '200px 40px' }}>
          <Search
            placeholder="Enter Username"
            enterButton="Login"
            size="large"
            onSearch={value => this.setState({ isLoggedIn: true, userName: value })}
          />
        </div>
            </div>
        )
    }
}
