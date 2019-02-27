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
																				<div className="l-captcha"
																						 data-site-key="83c2acd5607e012a23a77273a2bb963f"/>
																				<form action="">

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