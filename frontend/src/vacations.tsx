import React from 'react';
import { Consumer } from './App';
import Vacation from './vacation';
import NewVacation from './newvacation';
import Cookies from 'universal-cookie';

interface IVacations {
  willedit: Number;
  vacations: IVacation[];
}
export interface IVacation {
  destination: string;
  description: string;
  piclink: string;
  following: string[];
  start: string;
  end: string;
  price: Number;
  _id: string;
}

export default class Vacations extends React.Component<any, IVacations> {
    constructor(props:any) {
      super(props);
      fetch('http://localhost:3000/vacations').then(res=>res.json()).then((res : IVacation[])=>this.setState({vacations: res}));
    };
    updateIt = setInterval(()=>{
      fetch('http://localhost:3000/vacations').then(res=>res.json()).then(res=>{
        if(res.length !== this.state.vacations.length) {
          this.setState({vacations: res});
        }
      }).catch(e=>console.log(e));
    }, 100);
    state = {
      willedit: -1,
      vacations: []
    };
    componentWillUnmount =()=>{
      clearInterval(this.updateIt);
    };
    render() {
        return (
          <div>
              <Consumer>
                {({isadmin, name, setMode, setInfo})=>{
                  return <div>
                            <div>Hello {name}</div><button onClick={()=>{
                              new Cookies().set('id', null);
                              setInfo(false, '');
                              setMode('login');
                              }}>Logout</button>
                            {isadmin ? <div><NewVacation/><button className='btn' onClick={()=>setMode('chart')}>Go to chart</button></div>:''}
                            <div className='container'>
                                <div className='row'>
                              {this.state.vacations.map((vacation, index)=>{
                                return <Vacation value={vacation} edit={{
                                  willedit: index===this.state.willedit,
                                  changeedit: ()=>{index===this.state.willedit?this.setState({willedit:-1}):this.setState({willedit:index});}
                                }} key={index}/>
                                })}
                                </div>
                              </div>
                        </div>
                }}
              </Consumer>
          </div>
        );
    }
  }
  