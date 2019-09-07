import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.scss';
import Loading from './helpers/Loading.js';

const Home = React.lazy(() => import('./views/Pages/Home'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

const Nursery = React.lazy(() => import('./views/Nursery'));
const LKGUKG = React.lazy(() => import('./views/LKG_UKG.js'));
const Levels = React.lazy(() => import('./views/Levels.js'));


export default class App extends Component {
	render() {
		return (
			<BrowserRouter history={createBrowserHistory()}>
				<React.Suspense fallback={<div>loading</div>}>
					<ToastContainer autoClose={2000} />
					<Switch>
						<Route exact path="/nursery" name="Nursery" render={props => <Nursery {...props} />} />
						<Route exact path="/lkg_ukg" name="LKG/UKG" render={props => <LKGUKG {...props} />} />
						<Route exact path="/levels" name="Levels" render={props => <Levels {...props} />} />
						<Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
						<Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
						<Route path="/" name="Home" render={props => <Home {...props} />} />
					</Switch>
				</React.Suspense>
			</BrowserRouter>
		);
	}
}