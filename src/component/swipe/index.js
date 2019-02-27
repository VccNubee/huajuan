import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import React,{Component} from 'react'
import axios from 'axios'
import './index.scss'
import {Link} from 'react-router-dom'



class Swipe extends Component{
    constructor(props){
        super(props)
        this.state={
            videoSwipe:[]
        }
    }
    componentDidMount(){
        axios('/pc/pcIndex/recHot').then((res)=>{
            this.setState({
                videoSwipe:res.data.ad.pc_index_carousel
            })
            new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                    },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
		})
    }
    render(){
        return <div>
            <div className="swiper-container" key={this.state.videoSwipe.length}>
                <div className="swiper-wrapper">
                    {
                        this.state.videoSwipe.map((item)=>
                        <Link to={`/vdetail/${item.notify.content.video_id}`} key={item.notify.content.video_id} className="swiper-slide">
                            <div className='topdiv'></div>
                            <img src={item.ad_image} alt=""/>
                            <p className='v1'>{`${Math.floor(item.video_length/60)}:${item.video_length%60}`} | {item.hongren_info.user_name}</p>
                            <p className='v2'>{item.title}</p>
                        </Link>
                        )
                    }
                </div>
                <div className="swiper-pagination"></div>
                
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
</div>
    }
}
export default Swipe