import React, {Component} from 'react'
import store from "../../store";
import styles from './index.module.scss'
import { Modal } from "antd";
import money from './money.png'

class ChargeTutoria extends Component {
		constructor(props) {
				super(props);

				this.state = {
						visible: false,
						dataList: [
								"夏天的橙红色眼影，那些最受欢迎？",
								"保姆到时装博主的逆袭之路是如何实现的？",
								"你的护肤品该扔了！日本超火的省时护肤法，10秒解决痘痘毛孔的问题。",
								"夏日底妆大分享，补妆好气色来get一下。",
								"修容大法解析/ 十分钟搞定的超立体感性冷淡妆",
								"瞬间拯救疲倦肌肤的秘密武器",
								"普通卷发太老气？不如换个小波浪卷发试试看？",
								"万年黑眼圈遮瑕术。",
								"当你的腮红颜色不够常规怎么办？",
								"用一盘眼影打造6种妆容，还不快来学一学？"
						]
				};
		}


		render() {
				return (
						<div className={styles.ChargeTutoria}>
								<div className={styles.layer}>
										<ul>
												{
														this.state.dataList.map((item,index)=>
																<li key={index}>
																		<span onClick={this.handleClick.bind(this)}>{item}</span>
																</li>
														)
												}
										</ul>
								</div>
								<Modal
										title="扫描下方二维码，付费20元即可查看"
										visible={this.state.visible}
										footer={null}
										width="320px"
										closable={false}
										className={styles.modal}
										onCancel={()=> {
												this.setState({
														visible: false
												})
										}}
								>
										<img src={money} width="100%" alt=""/>
								</Modal>
						</div>
				)
		}

		handleClick() {
				this.setState({
						visible: true
				})
		}

		componentDidMount() {
				store.dispatch({
						type: 'isShow',
						payLoad: false
				})
		}
}

export default ChargeTutoria
