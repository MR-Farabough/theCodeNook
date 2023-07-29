import { Routes, Route } from 'react-router-dom';
import App from './App';
import Nav from './components/Nav';
import errorPage from './components/errorPage';
import Donation from './components/Donation';
import Newsletter from './components/Newsletter';

const Router = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" Component={App} />
				<Route path="/donation" Component={Donation} />
				<Route path="/newsletter" Component={Newsletter} />
				<Route path="*" Component={errorPage} />
			</Routes>
		</>
	);
};

export default Router;
