import { Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import errorPage from './components/errorPage';
import Donation from './components/Donation';
import Newsletter from './components/Newsletter';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const Router = () => {
	return (
		<>
			<Header />
			<main>
				<Routes>
					<Route path="/" Component={App} />
					<Route path="/donation" Component={Donation} />
					<Route path="/newsletter" Component={Newsletter} />
					<Route path="/signup" Component={SignUp} />
					<Route path="/signin" Component={SignIn} />
					<Route path="*" Component={errorPage} />
				</Routes>
			</main>
		</>
	);
};

export default Router;
