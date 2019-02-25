import {NavLink, Link} from 'react-router-dom'
import React,{Component} from 'react'
import ccc from './index.module.scss'


class Header extends Component{
    render() {
     return <div id='Header'>
        <div className={ccc.top}>
            <div>
                <Link to='/home' className={ccc.a1}><span class="iconfont icon-1"></span>首页</Link>
            </div>
        </div>
     </div>
    }
}
export default Header