import {NavLink} from 'react-router-dom'
import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'


class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            pList:[]
        }
    }
    componentDidMount(){
        axios('/pc/pcIndex/class').then((res)=>{
            this.setState({
                pList:res.data.goodsClass
            })
            console.log(this.state.pList)
        })
    }
    render() {
     return <div id={ccc.nav}>
        <ul>
            {
                this.state.pList.map(
                    (item)=><li key={item.gc_id}>
                        <NavLink to={`/list/${item.gc_id}`} activeClassName={ccc.active}>
                            {item.pc_icon?
                            <img src={item.pc_icon} alt=""/>:
                            <i></i>}
                            <span>{item.gc_name}</span>
                        </NavLink>
                        <ul ref='myel'>
                        {
                            item.children.map(
                                (item2)=>
                                <li key={item2.gc_id}><NavLink to={`/list/${item2.gc_id}`}>{item2.gc_name}</NavLink></li>
                            )
                        }
                        </ul>
                    </li>
                    
                )
            }
            <li><NavLink to='/chargeTutoria' activeClassName={ccc.active}><i></i>化妆教学</NavLink></li>
            
        </ul>
        <ul>
        <li>品类</li>
        </ul>
     </div>
    }
}

export default Nav