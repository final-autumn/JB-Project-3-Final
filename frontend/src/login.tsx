import React from 'react';
import { Consumer } from './App';
import queryString from 'querystring';
import Cookies from 'universal-cookie';
//import './formstyle.css'
interface ILogin {
  username: string;
  password: string;
}
export default class Login extends React.Component<any, ILogin> {
  state = {
    username: '',
    password: ''
  };
  render() {
    const {username, password} = this.state;
	  return (
    <div className='formbox'>
      <h1>Login</h1>
      <Consumer>
        {({setMode, setInfo})=>{
        return <form className='form' onSubmit={(e)=>e.preventDefault()}>
          <div className='myInput'>Username: <input value={username} onChange={(e)=>this.setState({username:e.target.value})}></input></div>
          <div className='myInput'>Password: <input value={password} onChange={(e)=>this.setState({password:e.target.value})}></input></div>
          <button type='submit' onClick={()=>{
            fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
            body: queryString.stringify({username, password})
          }).then(res=>res.json()).then(res=>{
            if(res.name) {
              setInfo(res.isadmin, res.name);
              new Cookies().set('id', res.id);
              setMode('vacations');
            }
          }).catch(e=>console.log(e))
          }} className='btn btn-primary'>Login</button>
          <button onClick={()=>setMode('signup')} className='btn btn-secondary'>No Account?</button>
        </form>}}
      </Consumer>
    </div>
	  );
  }
}
