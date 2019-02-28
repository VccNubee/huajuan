import React, {Component} from 'react'
import { getGoodsDetail } from "./model";
import styles from './index.module.scss'
import { Breadcrumb, message, Spin } from 'antd';
import store from '../../store'

message.config({
		top: 160
});
class gDetail extends Component {
		constructor(props) {
				super(props);
				this.state = {
						goodsDetail: null,
						currentVideo: 0,
						count: 1,
						isLoading: false
				};
		}

		render() {
				return (
						<div id={styles.gDetail}>
								<Spin size="large" wrapperClassName={styles.spin} spinning={this.state.isLoading} delay={400}>
								{
										this.state.goodsDetail?
												<main className={styles.layer}>
														{/*面包屑导航*/}
														<div className={styles.breadNav}>
																<Breadcrumb separator=">">
																		<Breadcrumb.Item href="#/home">首页</Breadcrumb.Item>
																		{
																				this.state.goodsDetail.tags.map(item =>
																						<Breadcrumb.Item href={`#/list/${item.gc_id}`} key={item.tag_id}>{item.tag_name}</Breadcrumb.Item>
																				)
																		}
																		<Breadcrumb.Item>{this.state.goodsDetail.goodsInfo.goods_name}</Breadcrumb.Item>
																</Breadcrumb>
														</div>

														<div className={styles.goods}>
																{/*左侧商品*/}
																{/*视频商品*/}
																{
																		this.state.goodsDetail.videos.length !== 0?
																				<div className={styles.lf}>
																						<div className={styles.mediaWrap}>
																								<video controls src={this.state.goodsDetail.videos[this.state.currentVideo].video_url} poster={this.state.goodsDetail.videos[this.state.currentVideo].image_url} />
																						</div>
																						<div className={styles.videoList}>
																								{
																										this.state.goodsDetail.videos.map((item,index) =>
																												<div className={this.state.currentVideo === index?`${styles.videoItem} ${styles.videoItemActive}` :styles.videoItem} key={item.video_id}>
																														<div className={styles.videoItemImage} style={{backgroundImage:`url(${item.image_url})`}} onClick={this.changeVideo.bind(this,index)}/>
																														<h3>{item.video_type_cn}视频</h3>
																												</div>
																										)
																								}
																						</div>
																				</div>
																				:
																				//图片商品
																				<div className={styles.lf}>
																						<div className={styles.mediaWrap} style={{backgroundImage:`url(${this.state.goodsDetail.goodsInfo.goods_image})`}}>
																						</div>
																				</div>
																}
																{/*商品详情*/}

																<div className={styles.md} style={Object.keys(this.state.goodsDetail.hongren).length===0?{marginLeft:"160px"}:{marginLeft:"30px"}}>
																			<div className={styles.goodsDetail}>
																					<h2>{this.state.goodsDetail.goodsInfo.goods_desc}</h2>
																					<h3>{this.state.goodsDetail.goodsInfo.goods_name}</h3>
																					<div className={styles.price}>
																							<span>花卷价<span className={styles.hprice}>￥{this.state.goodsDetail.goodsInfo.goods_price}</span></span>
																							<span className={styles.marketprice}>市场价<span>￥{this.state.goodsDetail.goodsInfo.goods_marketprice}</span></span>
																					</div>
																					<span className={styles.spec}>规格<span>{this.state.goodsDetail.goodsInfo.goods_spec}</span></span>
																			</div>
																			<div className={styles.buy}>
																					<div className={styles.count}>
																							<span className={styles.btn} onClick={this.handleSub.bind(this)}>-</span>
																							<span>{this.state.count}</span>
																							<span className={styles.btn} onClick={this.handleSum.bind(this)}>+</span>
																					</div>
																					{
																							this.state.goodsDetail.goodsInfo.goods_stock === '0'?
																									<button className={styles.disabled} disabled>已售罄</button>
																							:<button className={styles.normal} onClick={this.toShopCar.bind(this)}>加入购物车</button>
																					}

																					<div className={styles.collect}>
																							<span className="iconfont icon-xin"/>
																							<span className={styles.text} onClick={this.toLogin.bind(this)}>收藏</span>
																					</div>
																			</div>
																</div>
																{/*右侧红人信息*/}
																<div>
																		{
																				Object.keys(this.state.goodsDetail.hongren).length===0?
																						null
																						:
																						<div className={styles.rt}>
																								<div className={styles.baseInfo}>
																										<img src={this.state.goodsDetail.hongren.user_avatar} alt=""/>
																										<p>{this.state.goodsDetail.hongren.user_name}</p>
																								</div>
																								<div className={styles.dInfo}>
																										<div className={styles.item}>
																												<span className={styles.title}>小铺号</span>
																												<span className={styles.num}>{this.state.goodsDetail.hongren.hongren_number}</span>
																										</div>
																										<div className={styles.item}>
																												<span className={styles.title}>宝贝</span>
																												<span className={styles.num}>{this.state.goodsDetail.hongren.goods_num}</span>
																										</div>
																										<div className={styles.item}>
																												<span className={styles.title}>粉丝</span>
																												<span className={styles.num}>{this.state.goodsDetail.hongren.fcount}</span>
																										</div>
																								</div>
																								<div className={styles.other}>
																										<div onClick={this.toLogin.bind(this)}>+关注</div>
																										<a href={`#/hongren/${this.state.goodsDetail.hongren.uid}`}>进店逛逛</a>
																								</div>
																						</div>
																		}
																</div>
														</div>
														<div>
																{
																		Object.keys(this.state.goodsDetail.goodsInfo.goods_other_detail).length !==0?
																				<div className={styles.products}>
																						<h3>{this.state.goodsDetail.goodsInfo.goods_other_detail.other_title}</h3>
																						<div dangerouslySetInnerHTML={{__html:this.state.goodsDetail.goodsInfo.goods_other_detail.other_content }}/>
																				</div>
																		:null
																}
														</div>

												</main>
										:null
								}
								</Spin>
						</div>
				)
		}

		componentWillMount() {
				this.setState({
						isLoading: true
				});
		}

		componentDidMount() {
				store.dispatch({
						type:'isShow',
						payLoad:false
				});
				getGoodsDetail(this.props.match.params.id).then(res => {
						console.log(res);
						//没有这个商品 -404
						if (res.code !== 200) {
								message.error(res.info);
								this.props.history.push('/home');
								return
						}
						this.setState({
								goodsDetail: res,
						});
						setTimeout(() => {
								this.setState({
										isLoading: false
								})
						},700)
				})
		}
		handleSum() {
				this.setState({
						count: this.state.count+1
				})
		}

		handleSub() {
				this.setState({
						count: this.state.count-1
				});
				if(this.state.count <= 1) {
						message.warning('最小购买数量不可小于1件');
						this.setState({
								count: 1
						})
				}
		}

		toLogin() {
				console.log(this);
				let redirect = decodeURI(this.props.location.pathname);
				this.props.history.push(`/login?redirect=${redirect}`)
		}

		toShopCar() {
				this.props.history.push('/login');
				message.warning('购物车模块正在努力开发中...');
		}

		changeVideo(index) {
				this.setState({
						currentVideo: index
				})
		}
}

export default gDetail
