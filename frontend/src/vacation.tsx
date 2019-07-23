import React from 'react';
import { IVacation } from './vacations';
import { Consumer } from './App';
import Cookies from 'universal-cookie';
import queryString from 'querystring';
import './vacation.css';

interface IProps {
    value: IVacation;
    edit: {
        willedit: Boolean;
        changeedit: ()=>void;
    }
}
export default class Vacation extends React.Component<IProps, IVacation> {
    state = this.props.value;
    updateIt = setInterval(()=>{
		if(!this.props.edit.willedit){
			fetch(`http://localhost:3000/vacations/one/${this.state._id}`).then(res=>res.json())
			.then(res=>{
				if (res._id) {
					this.setState(res);
				};
			}).catch(e=>console.log(e));
		}
    }, 100);
    componentWillUnmount() {
        clearInterval(this.updateIt);
    }
    render() {
        const {description, destination, price, start, end, following, piclink, _id} = this.state;
		if (!this.props.edit.willedit){
			return (
			  <div className={'col-4'}>
				  <Consumer>
					  {({isadmin})=>{
						return <div>
							{isadmin ? <div>
							<span className='glyphicon glyphicon-pencil' onClick={this.props.edit.changeedit}></span>
							<span onClick={()=>{fetch(`http://localhost:3000/vacations/${_id}`, {method:'DELETE'})}} className='glyphicon glyphicon-remove' ></span></div> :''}
							<div>{destination}</div>
							<div>{description}</div>
							<div>{price}</div>
							<div>{start}-{end}</div>
							<div>{following.length}</div>
							<img className='vacationimg' src={piclink} alt={destination}></img>
							<button onClick={()=>{
								fetch('http://localhost:3000/vacations', {
									method: 'POST',
									headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
									body: queryString.stringify({id: _id, userid: new Cookies().get('id')})
							}).then(res=>res.json()).then(res=>{})
							}}>{following.includes(new Cookies().get('id'))?'Unfollow':'Follow'}</button>
						</div>
						}

					}
				  </Consumer>
			  </div>
			);
		}
		return <div>
			<input value={destination} onChange={(e)=>this.setState({destination:e.target.value})}></input>
			<button onClick={()=>{
				fetch(`http://localhost:3000/vacations/edit/${_id}`, {
					method: 'POST',
					headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', credentials: 'include'},
					body: queryString.stringify({description, destination, price, start, end, following, piclink})
				});
				this.props.edit.changeedit();
			}}>Update</button>
		</div>
    }
  }
  