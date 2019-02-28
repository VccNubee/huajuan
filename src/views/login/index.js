import React, {Component}from 'react'
import styles from './index.module.scss'
import {loginRec} from "./model";
import store from "../../store";

class Login extends Component{
		constructor(props) {
				super(props);

				this.state = {
						loginRec: null
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
																				<form action="/api/login" method="post">
																						<input type="tel" placeholder="请输入手机号" name="mobile"/>
																						<input type="password" placeholder="请输入密码" name="password"/>
																						<button type="submit">登录</button>
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

		componentDidMount() {
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
