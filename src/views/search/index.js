import React, {Component} from 'react'
import styles from './index.module.scss'
import {searchHongren, searchGoods} from "./model";
import store from "../../store";

class Search extends Component {
		constructor(props) {
				super(props);

				this.state = {
						searchValue: '',
						goodsData: [],
						hongrenData: []
				};
		}

		render() {
				return (
						<div className={styles.search}>
								<div className={styles.layer}>
										<div className={styles.hongren}>
												<h3 className={styles.hongrenTitle}>“{this.state.searchValue}”相关红人</h3>
												<div className={styles.hongrenContent}></div>
										</div>
										<div className={styles.product}>
												<h3 className={styles.productTitle}>“{this.state.searchValue}”相关商品</h3>
												<div className={styles.productContent}></div>
										</div>
								</div>
						</div>
				)
		}


		componentDidMount() {
				store.dispatch({
						type: 'isShow',
						payLoad: false
				});
				console.log(this.props.location);
				let searchValue = this.props.location.search.slice(4);
				// console.log();
				this.setState({
						searchValue: decodeURI(searchValue)
				});
				searchGoods(searchValue, 0).then(res => {
						this.setState({
								goodsData: res.goods_infos
						})
				});
				searchHongren(searchValue, 0).then(res => {
						this.setState({
								hongrenData: res.hongren_infos
						})
				})
		}

}

export default Search
