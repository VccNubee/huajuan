import React,{Component} from 'react'
import styles from './index.module.scss'
import {getVideoDetail} from "./model";
import {Breadcrumb} from "antd";

class Vdetail extends Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  		videoDetail: null
		};
	}


	render(){
		return (
				<div className={styles.vDetail}>
						{
								this.state.videoDetail?
										<main className={styles.layer}>
												<div className={styles.breadNav}>
														<Breadcrumb separator=">">
																<Breadcrumb.Item href="/home">首页</Breadcrumb.Item>
																{
																		this.state.videoDetail.tags.map(item =>
																				<Breadcrumb.Item href={`/list/${item.gc_id}`} key={item.tag_id}>{item.tag_name}</Breadcrumb.Item>
																		)
																}
																<Breadcrumb.Item>{this.state.videoDetail.video.video_title}</Breadcrumb.Item>
														</Breadcrumb>
												</div>
												<div className={styles.detailMain}>
														<div className={styles.videoInfo}>
																<div className={styles.video}>
																		<video controls src={this.state.videoDetail.video.video_url} poster={this.state.videoDetail.video.cover_url}/>
																</div>
																<div className={styles.videoTitle}>
																		<h3>{this.state.videoDetail.video.video_title}</h3>
																		<div className="iconfont icon-xin"><span>收藏</span></div>
																</div>
																<div className={styles.hongrenInfo}>
																		<div className={styles.lm}>
																				<a href={`/hongren/${this.state.videoDetail.hongren_info.uid}`}>
																		<div className={styles.left}>
																				<img src={this.state.videoDetail.hongren_info.user_avatar} alt=""/>
																				<span className={styles.user}>{this.state.videoDetail.hongren_info.user_name}</span>
																		</div>
																				</a>
																		<div className={styles.middle}>
																				<span>小铺号<i>{this.state.videoDetail.hongren_info.hongren_number}</i></span>
																				<span>粉丝<i>{this.state.videoDetail.hongren_info.fcount}</i></span>
																				<span>宝贝<i>{this.state.videoDetail.goods_count}</i></span>
																		</div>
																		</div>
																		<div className={styles.right}>
																				<div className={styles.follow}>+关注</div>
																				<a href={`/hongren/${this.state.videoDetail.hongren_info.uid}`}>进店逛逛></a>
																		</div>
																</div>
														</div>
														<div className={styles.aboutProducts}>
																<h3>相关商品 {this.state.videoDetail.goods_info.length}</h3>
																<div className={styles.container}>
																<div className={styles.hotGoods}>
																		{
																				this.state.videoDetail.goods_info.map((item,index) =>
																						<div className={styles.hotGoodsItem} key={item.goods_id} onClick={this.toGdetail.bind(this,item.goods_id)}>
																								<img src={item.goods_image} alt=""/>
																								<div className={styles.imgIndex}>{index+1}</div>
																								<div className={styles.watch}>立即查看</div>
																								<div className={styles.itemInfo}>
																										<h3>{item.goods_desc}</h3>
																										<div className={styles.name}>{item.goods_name}</div>
																										<div className={styles.spec}>规格	<span>{item.goods_spec}</span></div>
																										<div className={styles.price}>￥{item.goods_price}</div>
																										<div className={styles.mprice}>￥{item.goods_marketprice}</div>
																								</div>
																						</div>
																				)
																		}

																</div>
																</div>
														</div>
												</div>
												<div className={styles.moreVideos}>
														<h3>更多相关视频</h3>
														<div className={styles.videoList}>
																{
																		this.state.videoDetail.more_video.map(item =>
																				<div className={styles.videoItem} key={item.video_id}>
																						<div className={styles.img} onClick={this.toVdetail.bind(this,item.video_id)}>
																								<img src={item.image_url} alt=""/>
																						</div>
																						<div className={styles.videoName}>
																								{item.video_title}
																						</div>
																						<div className={styles.videoBottom}>
																								<div className={styles.user} onClick={this.toHongren.bind(this,item.hongren_info.uid)}>
																									<img src={item.hongren_info.user_avatar} alt=""/>
																									<span className={styles.username}>{item.hongren_info.user_name}</span>
																								</div>
																								<span className={styles.aboutpro}>相关商品：{item.goods_count}</span>
																						</div>
																				</div>
																		)
																}
														</div>
												</div>
										</main>
								:null
						}
				</div>
		)
	}

		componentDidMount() {
				getVideoDetail(this.props.match.params.id).then(res => {
						console.log(res);
						this.setState({
								videoDetail: res
						})
				})
		}

		componentWillReceiveProps(nextProps, nextContext) {
			console.log(nextProps);
				getVideoDetail(nextProps.match.params.id).then(res => {
						console.log(res);
						this.setState({
								videoDetail: res
						});
						document.documentElement.scrollTop = document.body.scrollTop = 0
				})
		}

		toGdetail(id) {
			this.props.history.push(`/gdetail/${id}`)
		}

		toHongren(id) {
				this.props.history.push(`/hongren/${id}`)
		}

		toVdetail(id) {
				this.props.history.push(`/vdetail/${id}`)
		}

}

export default Vdetail
