import React,{Component} from 'react'
import styles from './index.module.scss'
import { searchHongren, searchGoods } from "./model";

class Search extends Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  		goodsData: [],
				hongrenData: []
		};
	}


	render(){
		return (
				<div className={styles.search}>

				</div>
		)
	}

	componentDidMount() {
			console.log(this.props.location);
			searchGoods("面膜",0).then(res => {
					console.log(res)
			})
	}

}

export default Search
