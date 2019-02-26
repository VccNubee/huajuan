import React,{Component} from 'react'
import ch from './index.module.scss'
import axios from 'axios'
import Hotvideo from '../../component/hotChild/hotvideo'

class Hot extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
		looplist:[]
	  };
	}

	componentDidMount(){
		// console.log(this.props.location.state.myid)
		
		axios({
			url:`/pc/hongren/getDetailData?hongren_uid=${this.props.match.params.id}`
		}).then(res=>{
			// console.log(res.data)
			this.setState({
				looplist:res.data.data.hongrenInfo
			})
		})
	}

	render(){
		return <div>
			<link rel="stylesheet" href="./iconfont.css"></link>
			<div className={ch.headBg}>
			 {
				this.state.looplist?
				<div className={ch.hongrenHeadBackground}>
					<div className={ch.hongrenAvatar}>
						<img className={ch.userimg} src={this.state.looplist.user_avatar}/>
					</div>
						<div className={ch.hongrenInfo}>
							<div className={ch.hongrenItem}>
							<span className={ch.hongrenname}>{this.state.looplist.user_name}</span>
								<div className={ch.hongrenAttention}>
									<span className={ch.hongrenguanzhu}>关注</span>
								</div>
						</div>
						<div className={ch.hongrenItemtwo}>
							<div className={ch.hongrenStore}>
								<span className="iconfontone iconfont icon-dianpu">小铺号：{this.state.looplist.hongren_number}</span>
								
							</div>
							<div className={ch.fansnum}>
								<span className="iconfont icon-fans">粉丝：{this.state.looplist.fcount}</span>
								
							</div>
						</div>
					</div>
					
				</div>
				:null
			}
			<Hotvideo/>
			</div>
			
		</div>
	}

}

export default Hot