import { useState } from 'react';
import '../styles/Nav.css';
import SubNav from './SubNav';

const Nav = () => {
	const [activeSearch, setActiveSearch] = useState<boolean>(false);
	const handleActiveSearch = () => {
		return activeSearch ? setActiveSearch(false) : setActiveSearch(true);
	};
	return (
		<>
			<nav className="main-nav">
				<h1 className="main-title">The Code Nook</h1>
				<div className="main-side-elements">
					<h4 className="nav-link donation">Donation</h4>
					<h4 className="nav-link newsletter">Newsletter</h4>
					<button>Sign In</button>
					{activeSearch && (
						<>
							<input className="activeSearch" type="text"></input>
							<img
								onClick={handleActiveSearch}
								className="active-search-icon"
								src="src/assets/search.png"
								alt="Search-Icon"
							/>
						</>
					)}
					{!activeSearch && (
						<img
							onClick={handleActiveSearch}
							className="search-icon"
							src="src/assets/search.png"
							alt="Search-Icon"
						/>
					)}
				</div>
			</nav>
			<SubNav />
		</>
	);
};

export default Nav;
