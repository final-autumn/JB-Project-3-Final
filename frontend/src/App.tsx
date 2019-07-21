import React from 'react';
import './App.css';
import Login from './login';
import Chart from './chart';
import Signup from './signup';
import Vacations from './vacations';
//import Sidebar from './sidebar';

export const {Provider, Consumer} = React.createContext<{isAdmin: boolean,setMode(mode: String):void,setInfo(isAdmin:boolean, username:string):void}>({} as any);

interface IMainState {
  isAdmin : boolean;
  mode: String;
  username: String;
}

//const App: React.FC = () => {
class App extends React.Component<any, IMainState> {
  constructor(props : any) {
    super(props);
    fetch('http://localhost:3000/users/get').then(res=>res.json()).then(res=>console.log(res)).catch(e=>console.log(e));
  }
  state = {
	  mode: 'login',
    isAdmin: false,
    username: '',
  };
  setMode = (mode: String) => this.setState({mode});
  setInfo = (isAdmin: boolean, username: string) =>this.setState({isAdmin, username});
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
        <Provider value={{setMode : this.setMode, isAdmin: this.state.isAdmin, setInfo: this.setInfo}}>
          <div className='notSidebar'><input onChange={(e)=>this.setMode(e.target.value)}></input></div>
          {this.chooseMode()}
        </Provider>
		</div>
	  );
  }
}

export default App;
