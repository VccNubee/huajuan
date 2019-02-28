import React, {Component}from 'react'
import styles from './index.module.scss'
import {loginRec} from "./model";
import store from "../../store";
import {notification} from "antd";
import axios from "axios";

class Login extends Component{
		constructor(props) {
				super(props);

				this.state = {
						loginRec: null,
						isShow: false
				}
		}

		render() {
				return (
						<div className={styles.login}>
								{
										this.state.loginRec?
												<div className={styles.container} style={{background: this.state.loginRec.pc_login_ad.background_color}}>
														<div className={styles.layer}>
																<a href={this.state.loginRec.pc_login_ad.ad_url}>
																<img className={styles.ad} src={this.state.loginRec.pc_login_ad.ad_image} alt=""/>
																</a>
																<div className={styles.form}>
																		<header>
																				<h2>欢迎登录</h2>
																		</header>
																		<main>
																				<p>您的手机号将被默认作为花卷app账号使用</p>
																				<form autoComplete="off" onSubmit={this.handleSubmit}>
																						<input type="tel" placeholder="请输入手机号" name="mobile" ref="mobile"/>
																						{
																								this.state.isShow ?
																										<p className={styles.error}>*手机号或密码输入错误 (｡･ω･｡)</p>
																								:null
																						}

																						<input type="password" placeholder="请输入密码" name="password" ref="password"/>
																						<button onClick={this.login.bind(this)}>登录</button>
																				</form>
																		</main>
																</div>
														</div>
												</div>
										:null
								}
						</div>
				)
		}
		handleSubmit =(e) => {
				e.preventDefault()
		};
		login() {
				// console.log(this)
				axios({
						url:"/api/login",
						method: "post",
						data:{
								mobile: this.refs.mobile.value,
								password: this.refs.password.value
						}
				}).then(res => {
						console.log(res.data);
						if(res.data.ret === "success") {
								let redirect = (this.props.location.search).slice(10)
								this.props.history.push(redirect)
						} else {
								this.setState({
										isShow: true
								})
						}
				})
		}

		componentDidMount() {
				notification["info"]({
						message: '测试号',
						description: '手机：15800000000；密码：test',
						duration: null,
						style: {
								height:100,
								width: 600,
								marginLeft: 335 - 600,
						},
				});
				store.dispatch({
						type: 'isShow',
						payLoad: false
				});
				loginRec().then(res => {
						console.log(res);
						this.setState({
								loginRec: res.ad
						})
				})
		}

}

export default Login
