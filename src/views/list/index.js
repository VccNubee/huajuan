import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import {NavLink,Link} from 'react-router-dom'
import store from '../../store'
class List extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		  pList:[],
		  add:0,
		  flag:false
		};
	}
	
	componentDidMount(){
		store.dispatch({
			type:'fatherId',
			payLoad:this.props.match.params.id
		})
		axios(`/pc/goods/gcGoods?gc_id=${this.props.match.params.id}&limit=15&offset=0`).then(
			(res)=>{
				this.setState({
					pList:res.data.goods_info,
					flag:true,
					allCount:res.data.allCount
				})
			}
			)
			
		window.onscroll = ()=>{
			this.lazyLoad()
		}
	}
			lazyLoad = ()=>{
				
				   	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
				   		//变量windowHeight是可视区的高度
				  	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				   		//变量scrollHeight是滚动条的总高度
				   	var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
				               //滚动条到底部的条件
				  	if(scrollTop+windowHeight>=scrollHeight-1000&&this.state.flag&&this.state.allCount>this.state.add+15){
						this.setState({
							add:this.state.add + 15,
							flag:false
						})
					  	axios(`/pc/goods/gcGoods?gc_id=${this.props.match.params.id}&limit=15&offset=${this.state.add}`).then(
							(res)=>{
								this.setState({
									pList:[...this.state.pList,...res.data.goods_info],
									flag:true
								})
							  }
						)
				    }   

			}
			componentWillUnmount(){
				window.onscroll = null
			}
			componentWillReceiveProps(nextprops){
				this.setState({
					add:0
				})
				store.dispatch({
					type:'fatherId',
					payLoad:nextprops.match.params.id
				})
				console.log(nextprops.match.params.id,"dispatch")
		// axios('/pc/pcIndex/class').then((res)=>{
		// 	this.setState({
		// 		aList:res.data.goodsClass
		// 	})
		// 	console.log(nextprops)
		// })
		axios(`/pc/goods/gcGoods?gc_id=${nextprops.match.params.id}&limit=15&offset=0`).then(
			(res)=>{
				this.setState({
					pList:res.data.goods_info
				})
			}
		)
	}

	render(){
		return <div id={ccc.List}>
			<ul className={ccc.dataList}>
				{
					this.state.pList.map(
						(item)=><li key={item.goods_id}>
							<Link to={`/gdetail/${item.goods_id}`}>
								<div>
									<img src={item.goods_image} alt=""/>
								</div>
								<p className={ccc.p1}>{item.goods_desc}</p>
								<p className={ccc.p2}>{item.goods_name}</p>
								<p className={ccc.p3}><span className={ccc.s1}>￥{item.goods_price}</span><span className={ccc.s2}>￥{item.goods_marketprice}</span></p>
							</Link>
						</li>
					)
				}
			</ul>
		</div>
	}

}

export default List