import React,{Component} from 'react'
import axios from 'axios'
import ch from './index.module.scss'

class Hotvideo extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
          datalist:[]
      };
	}

	componentDidMount(){
        axios({
            url:'/pc/hongren/getDetailData?hongren_uid=96029699471632'
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
				datalist:res.data.data.hot_video
			})
        })
	}

	render(){
		return <div>
           
			<div className={ch.hotSeries}>
                <h3 className={ch.hotSeriesTitle}>热门视频</h3>
                <div className={ch.hotVideoList}>
                    <div className={ch.hotVideoItem}>
                        <div>
                            <a href="#"><img src="" alt=""/></a>
                            <div></div>
                            <div>相关商品：{this.state.datalist.brand_id}</div>
                        </div>
                    </div>
                    <div className={ch.hotVideoItem}></div>
                </div>
            </div>
		</div>
	}

}

export default Hotvideo