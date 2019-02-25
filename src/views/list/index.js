import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import {NavLink,Link} from 'react-router-dom'
class List extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		  pList:[],
		  aList:[]
	  };
	}
	componentDidMount(){
		axios(`/pc/goods/gcGoods?gc_id=${this.props.match.params.id}&limit=15&offset=0`).then(
			(res)=>{
				this.setState({
					pList:res.data.goods_info
				})
				console.log(this.state.pList)
			}
		)	
		
	}
	componentWillReceiveProps(nextprops){
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
				console.log(this.state.pList)
			}
		)
	}

	render(){
		return <div id={ccc.List}>
			<ul>
				<li>品类</li>
				{
					this.state.aList.map(
						(item)=>
						<li key={item.gc_id}><NavLink activeClassName={ccc.active} to={`/list/${item.gc_id}`}>{item.gc_name}</NavLink></li>
					)
				}
			</ul>
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