import React from 'react';
import './App.css';
import Login from './login';
import Chart from './chart';
import Signup from './signup';
import Vacations from './vacations';
import queryString from 'querystring';
import Cookies from 'universal-cookie';
//import Sidebar from './sidebar';

export const {Provider, Consumer} = React.createContext<{name: String, isadmin: boolean,setMode(mode: String):void,setInfo(isadmin:Boolean, name:String):void}>({} as any);

interface IMainState {
  isadmin : boolean;
  mode: String;
  name: String;
}

//const App: React.FC = () => {
class App extends React.Component<any, IMainState> {
  constructor(props : any) {
    super(props);
    fetch('http://localhost:3000/users/logbackin', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
      body: queryString.stringify({id: new Cookies().get('id')}),
    }).then(res=>res.json()).then(res=>{
      if (res.name) {
        this.setInfo(res.isadmin, res.name);
        this.setMode('vacations');
      };
    }).catch(e=>console.log(e));
  };
  state = {
	  mode: 'login',
    isadmin: false,
    name: '',
  };
  setMode = (mode: String) => this.setState({mode});
  setInfo = (isadmin: boolean, name: string) =>this.setState({isadmin, name});
  chooseMode = () => {
    switch(this.state.mode) {
      case 'login':
        return <Login/>
      case 'signup':
        return <Signup/>
      case 'vacations':
        return <Vacations/>
      case 'chart':
        return <Chart/>
      default:
        return <div>Something must have gone wrong...</div>
    }
  }
  render() {
	  return (
		<div>
        <Provider value={{name: this.state.name, setMode : this.setMode, isadmin: this.state.isadmin, setInfo: this.setInfo}}>
          {/*<div className='notSidebar'><input onChange={(e)=>this.setMode(e.target.value)}></input></div>*/}
          {this.chooseMode()}
        </Provider>
		</div>
	  );
  }
}

export default App;
