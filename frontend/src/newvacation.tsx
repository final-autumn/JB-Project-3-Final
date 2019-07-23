import React from 'react';
import queryString from 'querystring';

interface INew {
		start: string;
		end: string;
		price: number;
		piclink: string;
		description: string;
		destination: string;
}
export default class NewVacation extends React.Component<any, INew> {
    state = {
		start: '2012-12-21',
		end: '2012-12-21',
		price: 0,
		piclink: '',
		description: '',
		destination: '',
    };
	
    render() {
		const {start, end, destination, description, price, piclink} = this.state;
        return (
          <div>
              Create a new Vacation:
			  Destintation: <input value={destination} onChange={e=>{this.setState({destination:e.target.value})}}></input>
			  Description: <input value={description} onChange={e=>{this.setState({description:e.target.value})}}></input>
			  Price: <input value={price} onChange={e=>{
				  if (!Number(e.target.value)){
					  return false;
				  }
				  this.setState({price:Number(e.target.value)}
				  )}}></input>
			  Picture Link: <input value={piclink} onChange={e=>{this.setState({piclink:e.target.value})}}></input>
			  Start: <input type='date' value={start} onChange={e=>{this.setState({start:e.target.value})}}></input>
			  End: <input type='date' value={end} onChange={e=>this.setState({end:e.target.value})}></input>
			  <button onClick={()=>{
				  console.log(this.state)
				if (!Object.values(this.state).every(val=>!!val===true)) {
					return
				};
				fetch('http://localhost:3000/vacations/new', {
				method: 'POST',
				headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
			  body: queryString.stringify({start, end, destination, description, price, piclink})}).then(res=>res.json())}}>Create</button>
          </div>
        );
    }
  }
  