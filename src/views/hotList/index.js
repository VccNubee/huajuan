import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import Swipe from '../../component/swipe'
import {Link} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import store from '../../store'

class HotList extends Component {
    constructor(props){
        super(props)
        this.state={
            dataList:[],
            add:0,
            flag:false
        }
    }
    componentDidMount(){
        store.dispatch({
            type:'isShow',
            payLoad:false,
            allCount:0
    });
        axios('/pc/hongren/hongrenList?limit=10&offset=0').then((res)=>{
            console.log(res.data.data.hongren_list)
            this.setState({
                dataList:res.data.data.hongren_list
            })
            new Swiper('.swiper-ccc', {
				slidesPerView: 4,
				spaceBetween: 30,
				navigation: {
										nextEl: '.swiper-button-next',
										prevEl: '.swiper-button-prev',
								}
	
				});
                this.setState({
                    flag:true,
                    allCount:res.data.data.count
				})

        })
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
        console.log(this.state.flag)
        console.log(scrollTop+windowHeight>=scrollHeight-1000)
          	if(scrollTop+windowHeight>=scrollHeight-1000&&this.state.flag&&this.state.allCount>this.state.add+15){
            this.setState({
                add:this.state.add + 15,
                    flag:false
                })
              	axios(`/pc/hongren/hongrenList?limit=10&offset=${this.state.add}`).then(
                    (res)=>{
                        this.setState({
                            dataList:[...this.state.dataList,...res.data.data.hongren_list],
                            flag:true
                        },()=>{
                            new Swiper('.swiper-ccc', {
                                slidesPerView: 4,
                                spaceBetween: 30,
                                navigation: {
                                                        nextEl: '.swiper-button-next',
                                                        prevEl: '.swiper-button-prev',
                                                }
                    
                                });
                
                        })
                      }
                )
            }   

    }
    componentWillReceiveProps(){
        this.setState({
            add:0
        })

    }
    componentWillUnmount(){
        window.onscroll = null
    }

    render(){
        return <div className={ccc.HotList}>
            <p className={ccc.top}>红人列表</p>
            <ul className={ccc.list}>
                {this.state.dataList.map((item)=>
                    <li className={ccc.user} key={item.hongren_id}>
                        <div className={ccc.mine}>
                            <img src={item.user_avatar} alt=""/>
                            <p>
                                {item.user_name}
                                <span>店铺号:{item.hongren_number}</span>
                            </p>
                            <Link to={`/hongren/${item.uid}`}>进入店铺</Link>
                        </div>
                        <div className={ccc.swipe}>
                        <div className="swiper-ccc" key={this.state.dataList.length}>
                        <div className="swiper-wrapper">
                        {
                            item.hasOwnProperty('goods')?
                                item.goods.map((item2)=>
                                    <Link to={`/gdetail/${item2.goods_id}`} className="swiper-slide" key={item2.goods_id}>
                                        <div>
                                        <img src={item2.goods_image} alt=""/>
                                        </div>
                                        <p className={ccc.p1}>{item2.goods_desc}</p>
                                        <p className={ccc.p2}>{item2.goods_name}</p>
                                        <p className={ccc.p3}><span className={ccc.s1}>￥{item2.goods_price}</span><span className={ccc.s2}>￥{item2.goods_marketprice}</span></p>
                                    </Link>
                                )
                                :null
                            }
                        </div>
                        
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
    
                    </div>    
                        </div>
                    </li>
                )}
            </ul>
        </div>
    }


}

export default HotList