import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import Swipe from '../../component/swipe'
import {Link} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import store from '../../store'
class Home extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		  zzList:[],
		  pList:[],
		  bannerList:[]
	  };
	}

	componentDidMount(){
		store.dispatch({
			type:'fatherId',
			payLoad:0
		})
		store.dispatch({
			type:'isShow',
			payLoad:true
		})

		// console.log(this.props.location.state.myid)
		axios('/pc/pcIndex/recHot').then((res)=>{
            this.setState({
				zzList:res.data.ad.PCHotTopic,
				bannerList:res.data.ad.pc_hongren_rec
			})
			console.log(this.state.bannerList)
			new Swiper('.swiper-ccc', {
				slidesPerView: 5,
				spaceBetween: 30,
				navigation: {
										nextEl: '.swiper-button-next',
										prevEl: '.swiper-button-prev',
								}
	
				});
		})
		axios('/pc/rec/single?cls_id=0&offset=0').then((res)=>{
            this.setState({
				pList:res.data.recList
			})
			
			
		})
	}
	render(){
		return <div id={ccc.Home}>
			<div className={ccc.top}>
				<div className={ccc.swipe}>
				<Swipe></Swipe>
				</div>
				<div className={ccc.zz}>
					{
						this.state.zzList.map((item)=>						
							<Link to={`/vdetail/${item.notify.content.video_id}`} key={item.notify.content.video_id}>
								<div className={ccc.topdiv}></div>
								<img src={item.ad_image} alt=""/>
								<p className={ccc.v1}>{`${Math.floor(item.video_length/60)}:${item.video_length%60}`} | {item.hongren_info.user_name}</p>
								<p className={ccc.v2}>{item.title}</p>
							</Link>
						)
					}
				</div>
				<div className={ccc.user}></div>
			</div>
			<div className={ccc.mid}>
				<p className={ccc.topp}>人气红人<Link to='/hot/list'>查看更多</Link></p>
				<div className="swiper-ccc" key={this.state.bannerList.length}>
					<div className="swiper-wrapper">
						{
							this.state.bannerList.map((item)=>
								<Link to={`/hongren/${item.hongren_info.uid}`} className="swiper-slide" key={item.hongren_info.uid}>
									<img src={item.ad_image} alt=""/>
									<p className={ccc.fan}>粉丝：<span>{item.hongren_info.fcount}</span></p>
								</Link>
							)
						}
					</div>
					
					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>

				</div>
			</div>
			<div className={ccc.bottom}>
				<p className={ccc.topp}>为您推荐</p>
				<ul className={ccc.dataList}>
					{
						this.state.pList.map(
							(item)=><li key={item.goods[0].goods_id}>
								<Link to={`/gdetail/${item.goods[0].goods_id}`}>
									<div>
										<img src={item.rec_img} alt=""/>
									</div>
									<p className={ccc.p1}>{item.goods[0].goods_desc}</p>
									<p className={ccc.p2}>{item.rec_title}</p>
									<p className={ccc.p3}><span className={ccc.s1}>￥{item.goods[0].goods_price}</span><span className={ccc.s2}>￥{item.goods[0].goods_marketprice}</span></p>
								</Link>
							</li>
						)
					}
				</ul>
			</div>
		</div>
	}

}

export default Home