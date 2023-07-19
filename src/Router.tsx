import { Routes, Route } from 'react-router-dom';
import App from './App';
import Nav from './components/Nav';
import errorPage from './components/errorPage';

const Router = () => {
	return (
		<>
			<Nav />
			<Routes>
				<Route path="/" Component={App} />
				<Route path="*" Component={errorPage} />
			</Routes>
		</>
	);
};

export default Router;
