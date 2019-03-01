import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import Swipe from '../../component/swipe'
import {Link} from 'react-router-dom'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import store from '../../store'
class Home extends Component{
	constructor(props) {
	  super(props);

	  this.state = {
		  zzList:[],
		  pList:[],
		  bannerList:[],
			isLogin: false,
			user:''
	  };
	}

	componentWillReceiveProps(nextProps, nextContext) {
			axios.get("/api/checkLogin").then(res => {
					if(res.data.ret === 1) {
							this.setState({
									isLogin: true,
									user: res.data.user
							})
					} else {
							this.setState({
									isLogin: false
							})
					}
			});
	}

		componentDidMount(){
		//	检查登录状态
			axios.get("/api/checkLogin").then(res => {
					if(res.data.ret === 1) {
							this.setState({
									isLogin: true,
									user: res.data.user
							})
					} else {
							this.setState({
									isLogin: false
							})
					}
			});

		store.dispatch({
			type:'fatherId',
			payLoad:0
		})
		store.dispatch({
			type:'isShow',
			payLoad:true
		})

		// console.log(this.props.location.state.myid)
		axios('/pc/pcIndex/recHot').then((res)=>{
            this.setState({
				zzList:res.data.ad.PCHotTopic,
				bannerList:res.data.ad.pc_hongren_rec
			})
			new Swiper('.swiper-ccc', {
				slidesPerView: 5,
				spaceBetween: 30,
				navigation: {
										nextEl: '.swiper-button-next',
										prevEl: '.swiper-button-prev',
								}

				});
		})
		axios('/pc/rec/single?cls_id=0&offset=0').then((res)=>{
            this.setState({
				pList:res.data.recList
			})


		})
	}

		login() {
			this.props.history.push('/login')
		}

	render(){
		return <div id={ccc.Home}>
			<div className={ccc.top}>
				<div className={ccc.swipe}>
				<Swipe></Swipe>
				</div>
				<div className={ccc.zz}>
					{
						this.state.zzList.map((item)=>
							<Link to={`/vdetail/${item.notify.content.video_id}`} key={item.notify.content.video_id}>
								<div className={ccc.topdiv}></div>
								<img src={item.ad_image} alt=""/>
								<p className={ccc.v1}>{`${Math.floor(item.video_length/60)}:${item.video_length%60}`} | {item.hongren_info.user_name}</p>
								<p className={ccc.v2}>{item.title}</p>
							</Link>
						)
					}
				</div>
				<div className={ccc.user}>
					<div className={ccc.head}>
						<div className={ccc.Img}>
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAGJ1JREFUeAHtnWuMZEd1x+ve7p7u6Xnvy/vwrteP9fotx961Y5AJWYhsBA4fYpMoCJDAH/kYCSL4CAoo4RsfDRJESCGQD0AQIGAhWQnb8drxS15v/PZ636/p6Zme6efN+VVv9VZXP6a7p2/fO/Yc7eytrluPU/W/VafqnHPreup9QEEQZJYun90X+MH+aq263/PUfhV426RpU4EKppTnTXkSVoQ1eflAqbwKgrynvLxE5ZUXnAsCdTzhJ457Ne/4xNw1r3met1JPv37/l3avP8rnT91aKweHAi/4S6W8e6URewRkf5gtEXBr8hC8Kw/Fs17g/cFPeYenpnYeG2YdoyhrXQC8sHBqi6oFnw5q6pB0yiEZldtH0TluHTLaz0jcYc9Xh5Xv/Wx6eucFN03cfscWYBmR6cXcmUdqQe3zMooelukzFafOEzFQltnj177n/3ByZvsvZMQX48Sf4SV2AOdypw961eqXap76WxWoWcNorK+emvcD9eMgkfjezMyOZ+LEa2wAzl8+/dGqqn1NFj4fj1MH9c2L5/0uofxvTs3t+GPfeUPIEDnAMmI/oaq1r4tc/VAI7YusSJHXf1IJ/xsyon8VGRNScWQA53Jn7le16ndF1h6IsgPCrltk81HlJ748M7P96bDralf+yAHO5XKbgurit2SR8riAO/L623VC2HECsjRVPeElJr86MzNzKez67PJH1sGAmc+d+qI09NsS3mwz8UEJC9AX5cH+ytTMzu8D+ijaPRKAC4WTu8tF9SMB9sFRNCrudQi4R1Jp9dlsdteJsHkNHeDcpdOfVF7tBx/UUdsJQEazCvwvzGza8ctOaYYRP1T1ns2QAJqcv3TynwXcX2yAa/dMPaz7RPqGPqKvWlMMJyaUEVwoXNhVXin+RLY+DwyHzfd3KbKlejKVST+WzW45OeyWDh1gDAHVcvAbUS/uHjaz7+/yvBOJlPfQsA0aQ52iZW/757VKcGQD3EEexWA3fUcfDpK7U56hAYxGKqhWf78hbzt19erx9B19qLV7qyfvKcVQAM7lTv6dqtV+LiM321OtG4m69ID0ofSl7tMuqXq9tWYZrJ82YSjMlWCvjXk/pZNtVEX5/l+vVZe9JoCRF0wpGyM3rEfLK3iJxMdEj/3UoDUMDLB2m5FFQRxlbiKRUolkWiUSSRkE/CXErCKbEXHFgAJxDZH/ZCYUA2WtoqpV+asU5So2/JgRChE/6T046Op6IIDZ55ZWik9KL8VmK5RMZdTYWFYlRQdogOwXK4CviE61VCrINU7+dt6JsUz6gUH2yX0DjKxduHzqv+OixEhnJtVYerI+SvtFtEt6RnepuKiKK4tdUo3uFsqQ6bmdH9GyuY9q+15F5y6f+qc4gJuS0To1s11lxmeGDi79x7RO2dRBXVETfU7f98tHXyP4iuEA3XJf+fplqlv6pMjWTHZG5GtnHzzhT0+xFZGrNZGvyFnitOyVwpnCZSQIiCKfRU5TJlM8cZ0I+bxSyCnKjIqEP2mE/0g/BorOLXJaccXk97/SUZHZctOZaRlVV3zXHf6CWk2Vy8vyt6LlqKwPnBSr/fS0/E4J0KnUuPL89pPbynJepu2F1QoL7b6AfFGWGX/Wq6mxJ4AZsQvzp/5LrhHZcz2VnZiTqXK8peMYlcjJuqzsF9SW4q5EeArZzl+7BVu5tKwKS5cl7bDq68RH+3gB+cj07M6/0CO6fZJGbE8AL8yf/FKtFjzRyDXCgCeycGJyc8uUzJRbltXuyvJCY+odNluAmxmf1jJYOrOpeKbspUUx6cpiLAryfe/x6dld31ut7mau26TGh0rVFv8viqkZcCentrYsoljhFqRzR7VvRd5n5SHT+2mrj+BjMX8+EpCZqpU/efNqPl7tBY3VCBzkogAXh09GrtuplUpJLS6cGxm4dAUPEnVSt03wBo9ROKeCCdjY/LQLdx3BV1xbn5TCuqZrV/Ba47ITm1pkbqlYUMsFZF90NJ6dk31387apLpNH6iypO0DLYD/xQDeX3O4juO63PHJwWS27C6o4gEuv8oDBi03wCs+jJj3wBKNu9XYEWNt3I3BK1/tcZyvE1Bj1yLU7EV7c6ZrtG7yPmgTkA93sxx0B5nWSUTNLfSgxbDILKjsuDmEWefBmk8u7fS/UcFXe6epAbQHmRTBRmYz8XSFUgraGSp5OvVo2GqgObYgkGp4AGR4NwXsUak3B6sNgZviwr20B1m/52alGFGbPaRP73FFthex6ew3DGzza5LbBvhdmuBNmLQDLfH5QHsuRv8KJ1sjeEjFCUGLEnVxFC22gLSMnwUxj51TcArB4aDzupBnJT0x+NqF6jOPUbPNIGB5dk6LbFjdPWL/bYdcEsMgTsZarz4TFQKdyseQ0jV4xHLid1ilvHOL1wyg8G6IttGnkJNhpDK2KmwDmTIwojk3AE8MmrEJRKfJtPnoPi15c83w1h9umq3dCDMmRFxpDq4omgOsHnlh3RxTEzcYmTH7rjVye3TaNqj0uhg2A9VFFcprNqBgx9bC1sE1ybDvwi1pvBM/2lok22Vu+0bUneLiOZb3GBsD6HKoIjirC+9GmurPb1b2lfS/e4boXic2j2zb7XlhhGR8psDTlNwCWxeAhEznKK66tNkXpEmPzMUjY5d1t2yBlDpLHxrIBsBQUCcD4RdmED9V6JZd3t20jbFcDSw0wTuyi7orkeEB7e0QH4CC3Xsnl3W3bqNoFlmBKfRpgDvYcVeUt9TiuMPZCpSVtzCNaeHfaNkr2DaYaYDm1NTKA7RU0HbAetFedgHJ5d9vWKV8Y8fWTeJWqC0DPv0ccixr1TE1vE3/hzn7HjYQhBGbmdoVQajRF4qg3qvbUxPCRF7eiBnn+vYR9mVYyckzXHnMDpqIC1/Cwce2/B8AM7AyBKdj6paXL+ySgp2pu4sm4QeuzB2zswBRs/WoQ7Lebk3C2Lfa9jXC8e8DFDmz9qio3Acy7Ohu0PnvAxQ5s/aDWPILdROuzqR9Mrl3swNaXD05cY3dHhNoXm42N8AA94GIHtnISvfnUTL1EeyU2QB0bWSLsARc7sE2KZqHJV0Y2SaGyWCgU1OnTp9WlS5dUsVg3C6bTabVp0ya1Y8cOlc02G/9DZSaEwqNsXwt2gq03P3/qLVEA7zVtnZY32u3ltolf61WW7er1119Xp06darKb2uXyBO7cuVPddNNNTXs6O01cw3FoH286LuTOXO0i339b3vs9eUFeDW281D09u6PJAH819eAhGv/iiy8qRuru3bv1dWFhQb3xxhtqaWmppeC5uTl11113rRuQ49I+VKUL86cb/SmvmF5Ek9X0ynwY+lNGLuDecsstamJiQl7xSOop+e6775aTccYaDJnA5cuX9Wg3v+N+jUv7XOzANlyBK8ggk5iWGbkupVIpLXfdeH6Th7xxp7i3zxe5l7c70bWI2PcGCbOgYgpjBLejTKa9eyl5yBt3ilP7XOzA1q/Vv755tR+lY4dJrJYhZG476hRPWpO3Xb64xBkeO7WjU3wo7XOwA1tfNsLOCB4uwGYrxIKqXG4+KnB+fl6dOWOt+hzUTF4nOlY/DY9xaB+znk1gi+K5GWB11S5sJ15reHl5WR07dkxNTU0ppmWebMB1mVprPVHlj0P75PRNt/n5pGw95UPJV+OH3eHI3kqlolgxT09P663R8ePHr1bYJdRJbnfJMvJbcWqfix3Y+oHnWW4Aw3d6Q0M1KK0l76B19ptvLTyuJW87Pl2nP7BNer53XFkvqruun+0K6icO9eN7772nnn/+eb0HzuebJELHotBqkTfuFKf2udiBrfhvpJrmSzfRWjsY3TLqx5q8fdcruNRJnvWgl45T+1zswNZPeDKCLaqG4JeMbhn1Y69EWvKsF4pL+1zswFZ8s4KMnEO5JFet1WJqlHMQh963LAA2jA3hGlMEx8auRHCsCY4T2g3PtSiF6TYbpTlt6E9tmwKjal+L26xYkmZnd16vARYLxE/lSKC/MfyOy1FGUR1DYHjYuPbXA5xOvyznWRuS12b+QyyDj9an5UTiD+YG1/X4fq7N/wcx7GImX2vRmGqAx8b8w3anuKe42fc2wvHsARczg6kGOJ3ecsxXfkMpjFUizudTxbOLo+MKrGxLEliCKRw1nKC9hIziau3vDZu8aR/NEQSGg8Gui4uL6sKFC1rXzb7bl6P5cSrgD83Rtm3b5Mj+aN67GqxFq+dyPwGksbySrQGw7/mHRaHVAJgjctOZJmeP1WuKMAVWnTfffFOdPXu2hQtj8bl48aJOs337drV37973DdBgZRNYmt+Nt5WCYGHLwvzCKdmuNh7vMLdLhoFhXLFKvfbaayJWLJ3rKgXjNnTdddepa6+9dt34frVrkrs9EjVGeXp2eqfnTV8gvZbBBIjw/OSvCRviC2Bxp5MnTyqsU/2AS5uwcGHDfeaZZxQje72SixEYGnBpU2OK1j/81A9L1cojprEMfT4OFVfCOY+R6xKqzq1btzYc+pDF586dU9hsXUIx8dJLL2n5fOONN2qDiJsmzr/d6TkpGNr8NqZoIkWdmJbv1p4Ru/GsSTQxuUV/T8j8jtOV0We73SYSCXXrrbeqLVu2tGUT+YycNjLZTYSaFiPH9ddfrz0/3ftx+83ed2lRz8R11nw1PzOza7u0o2h4bUzRRHBDTln8d3OTa7HYm3nPzjOKMNOqDS6r5TvuuKMB7srKil5NM8qZjqFrrrlG3XfffVr28jC4hL6cKf/pp5/WV37HmVxs5PXRH9vgwnvTCCZiaenCwXJx5X8IG5qUIx3itmVCfp44ccKwqG3H+/fX34Rl2rbfoAB8wGVkGj9sHgBGM1N3J8KHm2l72Ib5TvX1E8/ely/B2JRKZ+6bmNjyjB3XAjA3c/NnfhvUKh83CfnoBF9BiRM999xzTZ6a9957r/b3evfddzVw7Xhl1O7Zs0f7aAM6JN+F0outbt6Pmzdv1ubL8fHWL6+1q2cUcYWlS3IY+dU1hSyufjczu/2v3LqbpmhzcyyR+KYJc6Ug15hs348iXCqVGtUiOxltEFNsJ2Kl/dZbb+mVM8oQSD4spe655x4tuzv5gCEOnn322a4eoJ3qDCMeLGxwqcPFzNTbFuDxqa1/lM3yn0wirisRfpDR5sOEjVzlN5opRiSgd1pAmXxcWU2//PLL6oUXXmi8PcEUfv/996u9e/eKOGqVz9T36quv6i2ZXVYUYRcLsAKzdry0BZiEibHMN+wMPDFV58tf9v1Rh+19r5lubdDhB3kLaDfffHND9tp8sgA7evSodkSgPMoBYBZiaLuYGVziTQZkd1QEBu7odbGyeesI8MTEpl/Ja6RH7cTLhXn7Z6Rhe4VrgLDjYG5yclIhN9n6ADTy1zwMhnl8xXAKZOVsnPCZqnlRjqm7nV8Ycr7b4syUHcbVxQCMwKpTXR0BJkNqLPVl6bzGXoGVG4bl9UIGePhl2r3hhhv06MTg4BLTO1MwizfjHIiTPiAjp11Clo+a6Hvbygc2YNSNj64AZ7Nbnva9xBN2AXwgOQh61/naeeMQ5q2K2267TQOHI75LrKYB2QCIzpr0XG1Cjo9yFNPn9L1NYANGdpwb7gowiSdnxr/Ki8QmYxDU1PJSfKZqw1e3KyPyyJEjWtaa96MAl9EJeO4bjkz177zzjp66KZcpm9Hv0ih12PQ5fW8ITMDG/O50XRVgz5u5lPBTX7EL4PsE62mqZrSxiDKyFvCQvRDT9YEDBxoaMLudpDNEOnvKJ76dbtukH+aVvna/CQEmYLNaPasCTAHZqa3fl6X4EbswPghlywP7XlRhF4B2fLDSZvplUYW2C2L6vf3221tGMqPdgEga11EAQ0XYRB+7HwgDCzDppe6eAEaYJ9PpzzZP1fJdQdGmuCvXXioNK00/vLBfRiliFCY8HO5UDZ/2qtuM+rD4d8ulPW4fgwFYgImbvt3vngAmYza7+UQiNfYFu2A0KnH67Csg9UKMxH379ump2eim2ROjtrQJ2Wu0W4xmd59t7tl5hhmmb20NIn0PBmDRaz3NS8NVck1MbP3lwvzZ7wRB+R9MUjbdK34uFnbjTiPYjEKu7In3ijLDrIoZlexrkbdufjw+DLVbMRv1qEkzzOvKcq5FoeF5ye+AQT/19AUwBU/NbPvHfO7Mh8VR/gFTEZ9244SXuPpwzc7OatecXbt2acWH4Rv7MPIYy5JLaLJ4GCAWaLblyqTtZHc29we9FlfyLZ/2E0f2J+n7fsvsG2CZJiqFwoXHSiu1J8VFYLepkIUAB6hF8km3K0x0mqIZrfbLbBwdgbnRKDRMG7iiucJEiAUJYlS/8sorLQ8B8joMgHHBcRdVYtU9kRxLPUbfa6b6+K9vgClbNtcni8ULDxWXi0dq1iFqK6LKpJNTqWjMau4Ua/qBaZjpmRUxL8C1278il5m6GbXmQWGVzLET7R4EbMtm6jf1rPXK9w/pQ5tYVKXH0w+Jn3NnM5mdwQkPBDBl4FhdKFz8VGml+Hs5FyBLHB28vHRZBdkg0pEMLzYBKAYCVs7uShiQmLqRt0Yus6B6++239TFObnrKZfrG+jRM0iNXwG1+SP1Cciz9qXR687FB6xoYYCqU1dxTS0uXHq2Uln8ujOmyGiDLuYlhymSAMZ1vOsUdUSae0Wn2s3ZH4ZjHdGy2R5SHrOXPXTGbfOQxniMmbq1XZK47LTMdJ8cyj2azm55aS/lrApiKsWTk8+c/V6uU/tWATDwMo1oLyysT0Izt14BBnE1mj4uxANnKlMtDgAsOliVbF40ZkFFryrTLIUw+8jCND5NYLbvfSgZcPzn2uW5Wol55WDPAVDQ1tfXfZCTnxJfrp2a6Jh7GZbWtxrNzDblG/DCIUWfAAGBGK1OsPbIBlFFJ3MGDB/VCib0rvw2Z6dt24DP3zBU1JTJ3mC478Ms+17XtyqMk03Lm0WGAC/9DAZiCYEhk8scqpZX/tBde2lFA1G34dA3TcY9RaSsmkJsoLbABG/8qwEVbxTmZLJxsgFg4sZJmRd2J8K/GyIDZcJiE+hENla3EoHytpRKZu9Zp2eZ1aABTKDJZVtcPLi8Vf2NvoWjIUv68TNfTQ3uxnG0MCgpDAMVI488AzD2zuGJaZuQCLP5Y9sNhyjBXHhKADcObEsNBXXy5mkbvRH21PPiCyvBvX3vT7dk5egjLPnlXpVT+ia0MMdlS8m378YlZGVGtfk8mTa9XHOHMFoY9KX7RyF0c4hnR/RLTPlPxsFfI8IE9F5OfaxXiHkoM9rlsP/k9TLoqjIZYKoxOzWz/iJ9M/YtMjU2PKg3M584NxdzICpipF+JQUMBlmsbGa+J7aRaLM8rCFysMcBm1tNkFl76hj+irMMCl7aGMYLtTl5bOf7JaLv3AlsvmPjJ5PDurEsnWQ8FNmtWuKC6w80JMqXfeeacGF8C5182kB7AoNpDRZg+8Wn393MdBDh+qdmZV5C2Gg351y/3UT9rQAaYSWXztrhSLP6oFtQf57RKO9ZnMtHwzcbAlAb5UxmGOfSoOc/hgsVLFSADY7INZdAEqRgL008jxfka6y3en36w5cG1tXSHXc2DPxeTXj1WoU12rxY8EYJiQzvYK+fNfrNbK3243mkkD0ChHBlltY7xnQcWWycjSdl4Y1BMWMVJRWnQEllErnhgY65mew+LDLndkAJtKgyC3aTG3/K1aUH0c0E28fU3KQiydmZRpM21HrxpmYcWIZZVsNFeMUv7YVrVzaF+10B4S8JZfUeSse5SCyaplrTjI4UPVi5uNyTeMa9sOHkbBq5UhK+37y6Xyd+VTMAc6pZXVpR7VWKji9slb3qxHf8xoRZnTicTCdhTXVllEdfV+7JR/rfGRAWwYFw3YJ6qlla+LfP6QiWt3ZdpmCmd0DzKFtyuz3zimYEapUd50y8/rJLxxMCyNVLe6ut2LHGDD3HL+/EdL1erX7LcazT33inNBUlbeyVRaT+NhjW5GaaVS1AfDcQ4VuvXViLf8eBGs07tCq+Uf9v3YAGwaxvvJtXLl8aqqfMY+acDcb3dlJSxToeL7uazE9Z+EdbwcQ8JV/pN/9W2/BkpW2KyyOQafK4dps/rlj1Nb+YoY8T2RvFnPi/N+KvmE+35uT/lDTBQ7gE1bpXPTy4uXHqnUyp+XUf2w9HWzqcgkjOgqz0uZA084E2N8ctMv5CFqHJsQEUttq40twDa3HPFUyK98WuT0oaBaO1RTte32/VGFOUHOkwPjRL4ezk5lfmafZjMqHvqtZ10A7DZKDBq3lkqAXRWwg3vk0Os9MuKHqnaVEVmTbx68KxP8sxzsydmP5nhAl584/16XALsdKuBmSkuX9/HNej5rzpev+Tiy/jayfGK15in5hl8wJem03U/Ay+uPRvHNKM9bFOmcD7zgLN844Bh8Tkofm5h7TdK1ulu6lcf89/8DkbvJfzz6YG0AAAAASUVORK5CYII=" width="100%" alt=""></img>
						</div>
							{
									this.state.isLogin?
											<div>
													<p style={{color:"#ff527d",fontSize:"14px"}}>{this.state.user}</p>
													<p style={{cursor:"pointer"}}>个人中心></p>
											</div>
											:
											<div>
													<button onClick={this.login.bind(this)}>登陆</button>
													<p>登陆可查看会员权益</p>
											</div>
							}

					</div>
					<div className={ccc.body}>
						<div className={ccc.dd1}>
							<span className="iconfont icon-daifukuan"></span>
							<p>待付款</p>
						</div>
						<div>
							<span className="iconfont icon-daishouhuo"></span>
							<p>待收货</p>
						</div>
						<div className={ccc.dd1}>
							<span className="iconfont icon-youhuiquan"></span>
							<p>优惠券</p>
						</div>
						<div>
							<span className="iconfont icon-xingxing"></span>
							<p>我的关注</p>
						</div>
					</div>
					<div className={ccc.foot}>
						<p>花卷头条</p>
						<ul>
							<li><span>·</span>111</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={ccc.mid}>
				<p className={ccc.topp}>人气红人<Link to='/hongrenlist'>查看更多</Link></p>
				<div className="swiper-ccc" key={this.state.bannerList.length}>
					<div className="swiper-wrapper">
						{
							this.state.bannerList.map((item)=>
								<Link to={`/hongren/${item.hongren_info.uid}`} className="swiper-slide" key={item.hongren_info.uid}>
									<img src={item.ad_image} alt=""/>
									<p className={ccc.fan}>粉丝：<span>{item.hongren_info.fcount}</span></p>
								</Link>
							)
						}
					</div>

					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>

				</div>
			</div>
			<div className={ccc.bottom}>
				<p className={ccc.topp}>为您推荐</p>
				<ul className={ccc.dataList}>
					{
						this.state.pList.map(
							(item)=><li key={item.goods[0].goods_id}>
								<Link to={`/gdetail/${item.goods[0].goods_id}`}>
									<div>
										<img src={item.rec_img} alt=""/>
									</div>
									<p className={ccc.p1}>{item.goods[0].goods_desc}</p>
									<p className={ccc.p2}>{item.rec_title}</p>
									<p className={ccc.p3}><span className={ccc.s1}>￥{item.goods[0].goods_price}</span><span className={ccc.s2}>￥{item.goods[0].goods_marketprice}</span></p>
								</Link>
							</li>
						)
					}
				</ul>
			</div>
		</div>
	}

}

export default Home
