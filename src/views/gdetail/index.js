import React, {Component} from 'react'
import { getGoodsDetail } from "./model";
import styles from './index.module.scss'
import { Breadcrumb, message } from 'antd';

message.config({
		top: 160
});
class gDetail extends Component {
		constructor(props) {
				super(props);
				this.state = {
						goodsDetail: null,
						currentVideo: 0,
						count: 1
				};
		}

		render() {
				return (
						<div id={styles.gDetail}>
								{
										this.state.goodsDetail?
												<main className={styles.layer}>
														{/*面包屑导航*/}
														<div className={styles.breadNav}>
																<Breadcrumb separator=">">
																		<Breadcrumb.Item href="/home">首页</Breadcrumb.Item>
																		{
																				this.state.goodsDetail.tags.map(item =>
																						<Breadcrumb.Item href={`/list/${item.gc_id}`} key={item.tag_id}>{item.tag_name}</Breadcrumb.Item>
																				)
																		}
																		<Breadcrumb.Item>{this.state.goodsDetail.goodsInfo.goods_name}</Breadcrumb.Item>
																</Breadcrumb>
														</div>

														<div className={styles.goods}>
																{/*左侧商品*/}
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
																{/*商品详情*/}
																<div className={styles.md}>
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
																					<button>加入购物车</button>
																					<div className={styles.collect}>
																							<span className="iconfont icon-xin"/>
																							<span className={styles.text}>收藏</span>
																					</div>
																			</div>
																</div>
																{/*右侧红人信息*/}
																<div className={styles.rt}>

																</div>
														</div>
												</main>
										:null
								}
						</div>
				)
		}

		componentDidMount() {
				getGoodsDetail(this.props.match.params.id).then(res => {
						console.log(res);
						this.setState({
								goodsDetail: res
						})
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

		changeVideo(index) {
				this.setState({
						currentVideo: index
				})
		}
}

export default gDetail
