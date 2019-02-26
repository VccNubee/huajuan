import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import React,{Component} from 'react'
import axios from 'axios'
import './index.scss'



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
			console.log(this.state.videoSwipe)
            var myswiper = new Swiper('.swiper-container', {
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
                        <div key={item.notify.content.video_id} className="swiper-slide"><img src={item.ad_image} alt=""/></div>
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