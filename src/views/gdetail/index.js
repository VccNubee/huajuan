import React, {Component} from 'react'
import { getGoodsDetail } from "./model";
import styles from './index.module.scss'

class gDetail extends Component {
		constructor(props) {
				super(props);
				this.state = {
						goodsDetailData: null
				};
		}

		render() {
				return (
						<div id={styles.gDetail}>
								<main className={styles.layer}>
										<div className={styles.breadNav}>

										</div>
								</main>
						</div>
				)
		}

		componentDidMount() {
				getGoodsDetail(1465568).then(res => {
						console.log(res);
						this.setState({
								goodsDetailData: res
						})
				})
		}

}

export default gDetail
