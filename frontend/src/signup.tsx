import React from 'react';
import {Consumer} from './App';
import queryString from 'querystring';

interface ISignup {
  username: string;
  password: string;
  name: string;
  lastname: string;
};
export default class Signup extends React.Component<any, ISignup> {
    state = {
      username: '',
      password: '',
      name: '',
      lastname: '',
    };
    render() {
        const {username, password, name, lastname} = this.state;
        return (
          <div className='formbox'>
          <h1>Sign Up</h1>
          <Consumer>
            {({setMode})=>{
            return <form className='form' onSubmit={(e)=>e.preventDefault()}>
              <div className='myInput'>Name: <input value={name} onChange={e=>this.setState({name:e.target.value})}></input></div>
              <div className='myInput'>Last Name: <input value={lastname} onChange={e=>this.setState({lastname:e.target.value})}></input></div>
              <div className='myInput'>Username: <input value={username} onChange={e=>this.setState({username:e.target.value})}></input></div>
              <div className='myInput'>Password: <input value={password} onChange={e=>this.setState({password:e.target.value})}></input></div>
              <button type='submit' onClick={()=>{
                if (username && password && name && lastname) {
                  fetch('http://localhost:3000/users/new', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
                    body: queryString.stringify({username, password, name, lastname})
                  }).then(_=>setMode('login')).catch(e=>alert('WRONG'));
                }
                }} className='btn btn-primary'>Signup</button>
              <button onClick={()=>{
                setMode('login');
                }} className='btn btn-secondary'>Return</button>
            </form>}}
          </Consumer>
        </div>
        );
    }
  }
  