import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import Swipe from '../../component/swipe'

class Home extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		  videoSwipe:[]
	  };
	}

	componentDidMount(){
		// console.log(this.props.location.state.myid)
	}

	render(){
		return <div id={ccc.Home}>
			<div className={ccc.top}>
				<div className={ccc.swipe}>
				<Swipe></Swipe>
				</div>
				<div className={ccc.zz}>
					<div></div>
					<div></div>
				</div>
				<div className={ccc.user}></div>
			</div>
			<div className={ccc.mid}></div>
			<div className={ccc.bottom}></div>
		</div>
	}

}

export default Home