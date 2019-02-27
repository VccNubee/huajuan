import {NavLink} from 'react-router-dom'
import React,{Component} from 'react'
import ccc from './index.module.scss'
import axios from 'axios'
import store from '../../store'


class Nav extends Component{
    constructor(props){
        super(props)
        this.state={
            pList:[],
            fatherId:0,
            childrenList:[]
        }
    }
    componentDidMount(){
        store.subscribe(()=>{
            console.log(store.getState().fatherId)
            if(store.getState().fatherId){
                var data = this.state.pList.filter((item)=>{
                    return item.gc_id===store.getState().fatherId
                })
                if(data.length){
                    
                    this.setState({
                        fatherId:store.getState().fatherId
                    })
                            this.setState({
                                childrenList:data[0].children
                            },()=>console.log(this.state.childrenList))
                        }
                        
                    }
            
        })
        axios('/pc/pcIndex/class').then((res)=>{
            this.setState({
                pList:res.data.goodsClass
            })
        })
    }
    render() {
     return <div id={ccc.nav}>
        <ul className={ccc.eee}>
            {
                this.state.pList.map(
                    (item)=><li key={item.gc_id}>
                        <NavLink to={`/list/${item.gc_id}`} activeClassName={ccc.active}>
                            {item.pc_icon?
                            <img src={item.pc_icon} alt=""/>:
                            <i></i>}
                            <span>{item.gc_name}</span>
                        </NavLink>
                        <ul>
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
        <ul className={ccc.aaa}>
             <li className={ccc.first}>品类</li>
             <li><NavLink to={`/list/${this.state.fatherId}`} activeClassName={ccc.active}>全部</NavLink></li>
                {
                this.state.childrenList.map((item)=>
                    <li key={item.gc_id}><NavLink activeClassName={ccc.active} to={`/list/${item.gc_id}`}>{item.gc_name}</NavLink></li>
                )
                }

        </ul>
     </div>
    }
}

export default Nav
