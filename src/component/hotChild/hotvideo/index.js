import React,{Component} from 'react'
import axios from 'axios'
import ch from './index.module.scss'
import swiper from 'swiper'
class Hotvideo extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
          datalist:[],
          loplist:[],
          daylist:[]
      };
	}

	componentDidMount(){
        axios({
            url:`/pc/hongren/getDetailData?hongren_uid=${this.props.match.params.id}`
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
                datalist:res.data.data.hot_video,
                loplist:res.data.data,
                daylist:res.data.data.class_info
			})
        })
	}

	render(){
		return <div>

        <div className={ch.mainBody}>
            <div className={ch.hotSeries}>
                <h3 className={ch.hotSeriesTitle}>热门视频</h3>
                <div className={ch.hotVideoList}>
                    {
                        this.state.datalist.map(item=>
                            <div className={ch.hotVideoItem} key={item.brand_id}>
                                <div className={ch.hotVideoItemOne}>
                                <a className={ch.hotVideoCover} href="#"><img src={item.image_url} className={ch.imgclass}/></a>
                                <div className={ch.hotVideoName}>{item.video_title}</div>
                                <div>相关商品：{item.video_goods_num}</div>
                                </div>
                            </div>
                            )
                    }
                </div>
            </div>
            
            {/* 轮播· */}
            <div className={ch.hotSeriesTwo}>
                <h3 className={ch.hotSeriesTitle}>热卖宝贝</h3>
                <div className={ch.hotGoodsList}>
                
                </div>
            </div>



            <div className={ch.allGoods}>
                <h3 className={ch.allGoodsTitle}>全部宝贝<span className={ch.spanclass}>共({this.state.loplist.goodsCount})件</span></h3>
                <div className={ch.filterList}>
                    <div className={ch.filterListone}>
                        <div className={ch.classFilterList}>
                            <div className={ch.classfilterListtwo}>
                            <span className={ch.classTitle}>品类</span>
                            <ul className={ch.classTypeList}>
                            <li className={ch.classTypeName}><span className={ch.spanone}>全部</span></li>
                        {
                            this.state.daylist.map(ite=>
                               
                                    <li className={ch.classTypeName} key={ite.gc_id}>
                                        <span className={ch.spanone}>{ite.gc_name}</span>
                                    </li>
                                
                                )
                        }

                            </ul>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
     	
		</div>
    }
    

}


export default Hotvideo