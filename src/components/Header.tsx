import { useEffect, useState } from 'react';
import '../styles/Header.css';
import Nav from './Nav';
import searchImage from '../assets/search.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Router';

const Header = () => {
	const { user } = useContext(UserContext);
	const [activeSearch, setActiveSearch] = useState<boolean>(false);
	const [activeDropDown, setDropDownStatus] = useState<boolean>(false);
	const [activeNav, setActiveNav] = useState(true);
	const navTest = () => {
		const windowSize = window.innerWidth;
		if (windowSize < 750) {
			setActiveNav(true);
		} else {
			setActiveNav(false);
		}
	};

	window.addEventListener('resize', navTest);

	useEffect(() => {
		navTest();
	}, []);

	const handleDockedSearch = () => {
		// Handle Search
	};

	const handleActiveSearch = () => {
		return activeSearch ? setActiveSearch(false) : setActiveSearch(true);
	};

	const handleDropDown = () => {
		activeDropDown ? setDropDownStatus(false) : setDropDownStatus(true);
	};

	const handleAnimation = () => {
		const lineOne = document.querySelector('.lineOne');
		const lineTwo = document.querySelector('.lineTwo');
		if (lineOne?.classList.contains('active') && lineTwo) {
			lineOne.classList.remove('active');
			lineTwo.classList.remove('active');
			lineOne.classList.add('disabled');
			lineTwo.classList.add('disabled');
		} else {
			lineOne?.classList.remove('disabled');
			lineTwo?.classList.remove('disabled');
			lineOne?.classList.add('active');
			lineTwo?.classList.add('active');
		}
	};

	const navigate = useNavigate();

	return (
		<>
			<header className="main-nav">
				<div className="drop-down">
					<div
						onClick={() => {
							handleAnimation();
							handleDropDown();
						}}
						className="drop-down-icons"
					>
						<div className="lineOne">|</div>
						<div className="lineTwo">|</div>
					</div>
					{activeDropDown && (
						<div className="active-drop-down">
							<h4
								onClick={() => {
									navigate('/donation');
									handleAnimation();
									handleDropDown();
								}}
								className="donation side-donation"
							>
								Donation
							</h4>
							<h4
								onClick={() => {
									navigate('/newsletter');
									handleAnimation();
									handleDropDown();
								}}
								className="newsletter side-newsletter"
							>
								Newsletter
							</h4>
							<img
								onClick={() => {
									handleDockedSearch();
									handleAnimation();
									handleDropDown();
								}}
								className="search-icon side-search"
								src={searchImage}
								alt="Search-Icon"
							/>
							{activeNav && (
								<>
									<p
										onClick={() => {
											navigate('/data-structures-&-algorithms');
											handleAnimation();
											handleDropDown();
										}}
										className="subMenu-topic"
									>
										Data Structures & Algorithms
									</p>
									<p
										onClick={() => {
											navigate('/web-development');
											handleAnimation();
											handleDropDown();
										}}
										className="subMenu-topic"
									>
										Web Development
									</p>
									<p
										onClick={() => {
											navigate('/languages');
											handleAnimation();
											handleDropDown();
										}}
										className="subMenu-topic"
									>
										Languages
									</p>
									<p
										onClick={() => {
											navigate('/database-management');
											handleAnimation();
											handleDropDown();
										}}
										className="subMenu-topic"
									>
										Database Management
									</p>
									<p
										onClick={() => {
											navigate('/development-practices');
											handleAnimation();
											handleDropDown();
										}}
										className="subMenu-topic"
									>
										Development Practices
									</p>
								</>
							)}
						</div>
					)}
				</div>
				<h1 onClick={() => navigate('/')} className="main-title">
					The Code Nook
				</h1>
				<div className="main-side-elements">
					<h4
						onClick={() => navigate('/donation')}
						className="nav-link donation"
					>
						Donation
					</h4>
					<h4
						onClick={() => navigate('/newsletter')}
						className="nav-link newsletter"
					>
						Newsletter
					</h4>
					{user && (
						<button
							className="profile-btn"
							onClick={() => navigate('/profile')}
						>
							Profile
						</button>
					)}
					{!user && (
						<button className="sign-in-btn" onClick={() => navigate('/signup')}>
							Sign In
						</button>
					)}

					{activeSearch && (
						<>
							<input className="activeSearch nav-link" type="text"></input>
							<img
								onClick={handleActiveSearch}
								className="active-search-icon nav-link"
								src={searchImage}
								alt="Search-Icon"
							/>
						</>
					)}
					{!activeSearch && (
						<img
							onClick={handleActiveSearch}
							className="search-icon nav-link"
							src={searchImage}
							alt="Search-Icon"
						/>
					)}
				</div>
			</header>
			<Nav />
		</>
	);
};

export default Header;
