import React,{Component} from 'react'
import axios from 'axios'
import ch from './index.module.scss'
import store from '../../../store'
class Hotvideo extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
          datalist:[],
          loplist:[],
          daylist:[],
          brandlist:[],
          goodlist:[],
          isShow:false,
          
          isGcid:null
      };
	}

	componentDidMount(){

        store.dispatch({
			type:'isShow',
			payLoad:false
        })
        

        axios({
            url:`/pc/hongren/getDetailData?hongren_uid=${this.props.match.params.id}`
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
                datalist:res.data.data.hot_video,
                loplist:res.data.data,
                daylist:res.data.data.class_info,
                brandlist:res.data.data.brand_info,
               
			})
        })

        axios({
            url:`/pc/hongren/hongrenGoodsList?hongren_uid=${this.props.match.params.id}&offset=0&limit=10`
        }).then(res=>{
            console.log(res.data.data.goods_info)
            this.setState({
                goodlist:res.data.data.goods_info
            })
        })
    }
    

	render(){
		return <div>

        <div className={ch.mainBody}>
            {
                this.state.datalist.length?
                <div>
                    <div className={ch.hotSeries}>
                        <h3 className={ch.hotSeriesTitle}>热门视频</h3>
                        <div className={ch.hotVideoList}>
                            {
                                this.state.datalist.map(item=>
                                    <div className={ch.hotVideoItem} key={item.video_id}>
                                        <div className={ch.hotVideoItemOne}>
                                        <a className={ch.hotVideoCover} href={`#/vdetail/${item.video_id}`}><img alt="" src={item.image_url} className={ch.imgclass}/></a>
                                        <div className={ch.hotVideoName}>{item.video_title}</div>
                                        <div>相关商品：{item.video_goods_num}</div>
                                        </div>
                                    </div>
                                    )
                            }
                        </div>
                    </div>
                </div>
                :null
            }
            
            {/* 轮播· */}

           
               
                {/* <div className={ch.hotSeriesTwo}>
                    <h3 className={ch.hotSeriesTitle}>热卖宝贝</h3>
                    <div className={ch.hotGoodsList}>
                    
                    </div>
                </div> */}
            
          


            <div className={ch.allGoods}>
                <h3 className={ch.allGoodsTitle}>全部宝贝<span className={ch.spanclass}>共({this.state.loplist.goodsCount})件</span></h3>
                <div className={ch.filterList}>
                    <div className={ch.filterListone}>
                        <div className={ch.classFilterList}>
                            <div className={ch.classfilterListtwo}>
                            <span className={ch.classTitle}>品类</span>
                            <ul className={ch.classTypeList}>
                            <li className={ch.classTypeName}><span className={ch.spanone} tabIndex={1}>全部</span></li>
                        {
                            this.state.daylist.map(ite=>
                               
                                    <li className={ch.classTypeName} key={ite.gc_id}>
                                        <span className={ch.spanone} onClick={this.handleclick.bind(this,ite.gc_id)} tabIndex={1}>{ite.gc_name}</span>
                                    </li>
                                
                                )
                        }

                            </ul>
                            </div>
                        </div>
                       
                       
                        
                        <div className={ch.brandFilterListo}>
                            <div className={ch.brandFilterList} style= {this.state.isShow?{ height:"250px"}:{}} >
                                <div className={ch.extendAll} onClick={this.zhankai.bind(this)}>展开全部</div>
                                <span className={ch.brandTitle}>品牌</span>
                                <div className={ch.brandTypeList}>
                                    <ul className={ch.brandTypeUl}>
                                        <li className={ch.brandTypeName}><span className={ch.spanttt} tabIndex={1}>全部</span></li>
                                        {
                                            this.state.brandlist.map(it=>
                                                <li className={ch.brandTypeName} key={it.brand_id} >
                                                    <span className={ch.spanttt} tabIndex={1}>{it.brand_name}</span>
                                                </li>
                                                )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <ul className={ch.ullist}>
                    <div className={ch.goodsItemList}>
                        {
                            this.state.goodlist.map(i=>
        
                                <div className={ch.goodsItem} key={i.goods_id}>
                                    <div className={ch.goodsItemoo}>
                                        <a href={`#/gdetail/${i.goods_id}`}>
                                            <div className={ch.goodsImageBox}>
                                                <img src={i.goods_image} alt="" className={ch.originalImage}/>
                                            </div>
                                            <div className={ch.goodsDesc}>{i.goods_desc}</div>
                                            <div className={ch.goodsName}>{i.goods_name}</div>
                                            <div className={ch.goodsPriceBox}>
                                                <span className={ch.spangoodsPrice}>
                                                    <b className={ch.bb}>￥</b>{i.goods_price}
                                                </span>
                                                <span className={ch.goodsMarketprice}>
                                                    <b className={ch.bb}>￥</b>{i.goods_marketprice}
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </ul>

            </div>
        </div>
     	
		</div>
    }
    zhankai(){
        this.setState({
            isShow:!this.state.isShow
          })
    }
    handleclick(gcid){
        console.log(gcid)
       
        axios({
            url:`/pc/hongren/hongrenGoodsList?hongren_uid=${this.props.match.params.id}&offset=0&gc_id=[]&brand_id=[]`
        })

        // axios({
        //     url:`/pc/hongren/hongrenGoodsList?hongren_uid=${this.props.match.params.id}&offset=0&gc_id=[${gcid}]&brand_id=[${brandid}]`
        // })
    }
   
}


export default Hotvideo