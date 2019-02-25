import React,{Component} from 'react'

class Home extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	componentDidMount(){
		// console.log(this.props.location.state.myid)
	}

	render(){
		return <div>
			Home
		</div>
	}

}

export default Home