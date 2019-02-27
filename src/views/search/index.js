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
												<h3 className={styles.hongrenTitle}>“{this.state.searchValue}” 相关红人</h3>
												<div className={styles.hongrenContent}>
														{
																this.state.hongrenData.length ?
																		<div className={styles.hongrenList}>
																				{
																						this.state.hongrenData.map(item =>
																								<div className={styles.hongrenItem} key={item.uid} onClick={this.toHongren.bind(this,item.uid)}>
																										<img src={item.share_image} alt=""/>
																								</div>
																						)
																				}

																		</div>
																:
																		<div className={styles.no}>
																				<div className={styles.img}/>
																				<p>暂无更多红人</p>
																		</div>
														}
												</div>
										</div>
										<div className={styles.goods}>
												<h3 className={styles.goodsTitle}>“{this.state.searchValue}” 相关商品</h3>
												<div className={styles.goodsContent}>
														{
																this.state.goodsData.length ?
																		<div className={styles.goodsList}>
																				{
																						this.state.goodsData.map(item =>
																						<div className={styles.goodsItem} key={item.goods_id} onClick={this.toGoods.bind(this, item.goods_id)}>
																								<div className={styles.imgBox}>
																										<img src={item.goods_image} alt=""/>
																										{
																												item.goods_stock? null
																												:<span className={styles.stock}>已售罄</span>
																										}
																								</div>
																								<div className={styles.name}>{item.goods_desc}</div>
																								<div className={styles.desc}>{item.goods_name}</div>
																								<div className={styles.price}>
																										<span className={styles.hprice}>￥{item.goods_price}</span>
																										<span className={styles.mprice}>￥{item.goods_marketprice}</span>
																								</div>
																						</div>
																						)
																				}
																		</div>
																:
																		<div className={styles.no}>
																				<div className={styles.img}/>
																				<p>暂无更多商品</p>
																		</div>
														}
												</div>
										</div>
								</div>
						</div>
				)
		}

		toHongren(id) {
				this.props.history.push(`/hongren/${id}`)
		}

		toGoods(id) {
				this.props.history.push(`/gdetail/${id}`)
		}

		componentWillReceiveProps(nextProps, nextContext) {
				console.log(nextProps);
				let searchValue = nextProps.location.search.slice(4);
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
