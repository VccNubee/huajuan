import React,{Component} from 'react'
import styles from './index.module.scss'

class Footer extends Component{
		constructor(props) {
				super(props);

				this.state = {};
		}

		render(){
			return (
					<div className={styles.footer}>
							<p>Copyright © {2019} 花卷</p>
							<p>京ICP备16023684号-1</p>
							<p className="companyInfo">
									<span>北京花卷儿科技有限公司</span>
									<span>地址：北京市海淀区地锦路7号院14号楼2层201</span>
									<span>电话：57610646</span>
							</p>
					</div>
			)
		}

}

export default Footer
