import React,{Component} from 'react'
import styles from './index.module.scss'
import { searchHongren, searchGoods } from "./model";

class Search extends Component{
	constructor(props) {
	  super(props);

	  this.state = {};
	}


	render(){
		return (
				<div className={styles.search}>

				</div>
		)
	}

	componentDidMount() {
			console.log(this.props.location)
	}

}

export default Search
