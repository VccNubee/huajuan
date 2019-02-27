import { Link, withRouter } from 'react-router-dom'
import React,{Component} from 'react'
import ccc from './index.module.scss'
import logo from './logo.png'
import {message} from "antd";

class Header extends Component{
		constructor(props) {
				super(props);
				this.state = {
						search: ''
				}
		}

		render() {
     return <div id={ccc.Header}>
        <div className={ccc.top}>
            <div>
                <Link to='/home' className={ccc.a1}><span className="iconfont icon-1"></span>首页</Link>
                <ul>
                <li className={ccc.l4}><img src="http://static.huajuanmall.com/subject/o_1d1su43d25utq1s1s0re8l95jm.png" alt="" height="18px"/><a href="https://www.huajuanmall.com/#/miniDraw">重赏福利小程序</a></li>
                <li className={ccc.l3}><a href="https://m.huajuanmall.com/">花卷app下载</a></li>
                <li className={ccc.l2}><a href="#/login">登陆</a></li>
                <li className={ccc.l1}>Hi！花卷商城欢迎你~</li>
                </ul>
            </div>
        </div>
        <div className={ccc.bottom}>
            <Link to='/home' replace><img src={logo} alt="" height='68px'/></Link>
            <div className={ccc.cart}>
                <span className="iconfont icon-gouwuche"></span>
                我的购物车
            </div>
            <div className={ccc.search}>
                <input type="search" placeholder='请输入想找的红人或者商品' ref="search" onKeyDown={this.handleKeyDown.bind(this)} onInput={this.handleInput.bind(this)}/>
                <button onClick={this.handleClick.bind(this)}><span className="iconfont icon-sousuo"></span></button>
            </div>
        </div>
     </div>
    }

		handleInput() {
    		this.setState({
						search: this.refs.search.value
				})
		}
		handleClick() {
				// console.log()
				if (this.state.search === '') {
						message.warning('请输入要搜索的红人或商品');
				} else {
						// console.log(this.props);
						this.props.history.push(`/search?kw=${this.state.search}`);
				}

		}
		handleKeyDown(event) {
				if(event.keyCode === 13) {
						if (this.state.search === '') {
								message.warning('请输入要搜索的红人或商品');
						} else {
								// console.log(this.state.search)
								this.props.history.push(`/search?kw=${this.state.search}`);
						}
				}
		}
}
export default withRouter(Header)
