import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Consumer } from './App';


export default class Chart extends React.Component<any> {
  state = {
    data : {
        labels: [],
        datasets: [{
            label: 'Active Vacations',
            backgroundColor: 'rgba(20,250,30, 1)',
            borderColor: 'rgba(1,1,1,1)',
            borderWidth: 1,
            data: []
        }]
      }
    }
    gettingInterval = setInterval(()=>{
      fetch('http://localhost:3000/vacations/chart').then(res=>res.json()).then(res=> {
        this.setState({
            data: {
                labels: res.names,
                datasets: [{
                    label: 'Active Vacations',
                    backgroundColor: 'rgba(20,250,30, 1)',
                    borderColor: 'rgba(1,1,1,1)',
                    borderWidth: 1,
                    data: res.data
                }]
            }
        })
    }).catch(e=>console.log(e));
    }, 100);
    componentWillUnmount=()=>{
      clearInterval(this.gettingInterval);
    };
    render() {
        return (
          <div>
              <Consumer>{({setMode})=>{return <button className='btn' onClick={()=>setMode('vacations')}>Return</button>}}</Consumer>
              <Bar data={this.state.data} options={{maintainAspectRatio: false}} />
          </div>
        );
    }
  }
  