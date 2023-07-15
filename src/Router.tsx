import { Routes, Route } from 'react-router-dom';
import App from './App';
import errorPage from './components/errorPage';

const Router = () => {
	return (
		<Routes>
			<Route path="/" Component={App} />
			<Route path="*" Component={errorPage} />
		</Routes>
	);
};

export default Router;
