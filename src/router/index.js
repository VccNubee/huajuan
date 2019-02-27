import React from 'react';
import App from '../App';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from '../views/home'
import List from '../views/list'
import Gdetail from '../views/gdetail'
import Vdetail from '../views/vdetail'
import Hot from '../views/hot'
import HotList from '../views/hotList'
import Search from '../views/search'
import ChargeTutoria from '../views/chargeTutoria'
import Login from '../views/login'

var router = (
		<Router>
				<App>
						<Switch>
								<Route path='/home' component={Home}></Route>
								<Route path='/list/:id' component={List}></Route>
								<Route path='/gdetail/:id' component={Gdetail}></Route>
								<Route path='/vdetail/:id' component={Vdetail}></Route>
								<Route path='/hongrenlist' component={HotList}></Route>
								<Route path='/hongren/:id' component={Hot}></Route>
								<Route path='/search' component={Search}></Route>
								<Route path='/chargeTutoria' component={ChargeTutoria}></Route>
								<Route path='/login' component={Login}/>
								<Redirect from='/' to='/home'></Redirect>
						</Switch>
				</App>
		</Router>
)
export default router
