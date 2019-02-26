import React,{Component} from 'react'
import styles from './index.module.scss'

class Vdetail extends Component{
	constructor(props) {
	  super(props);

	  this.state = {};
	}


	render(){
		return (
				<div className={styles.vDetail}>
						视频详情
				</div>
		)
	}

}

export default Vdetail
