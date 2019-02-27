import {createStore} from 'redux'

var reducer = (prev,act)=>{

let {type, payLoad} = act
switch(type){
    case 'isShow':
    var show = {...prev}
    show.isShow = payLoad;
    return show;
    case 'fatherId':
    var newstate = {...prev}
    newstate.fatherId = payLoad;
    return newstate;
    default:
    return prev
}
}
const store = createStore(reducer)
export default store