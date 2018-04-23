import React from 'react';
import logo from '../img/logo.jpg';

class Logo extends React.Component{
	render(){
		return (<div className="bms_logo">
		          <img src={logo} alt="BookMyShow" title="BookMyShow" />
		        </div>)
	}
}

export default Logo;