import {createStore} from 'redux'

var reducer = (prev={payLoad:0},act)=>{

let {type, payLoad} = act
switch(type){
    case 'fatherId':
    var newstate = {...prev}
    newstate.fatherId = payLoad;
    console.log(newstate.fatherId,"store")
    return newstate;
    default:
    return prev
}
}
const store = createStore(reducer)
export default store