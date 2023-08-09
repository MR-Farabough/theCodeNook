import { useState } from 'react';
import '../styles/Header.css';
import Nav from './Nav';
import searchImage from '../assets/search.png';
import { getUserStatus } from '../functions/DBGetUserStatus';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Router';

const Header = () => {
	const { user, setUser } = useContext(UserContext);
	const [activeSearch, setActiveSearch] = useState<boolean>(false);
	const [activeDropDown, setDropDownStatus] = useState<boolean>(false);

	const handleActiveSearch = () => {
		return activeSearch ? setActiveSearch(false) : setActiveSearch(true);
	};

	const handleDropDown = () => {
		activeDropDown ? setDropDownStatus(false) : setDropDownStatus(true);
	};

	const navigate = useNavigate();
	useEffect(() => {
		const fetchUserStatus = async () => {
			try {
				const userStatus = await getUserStatus();
				setUser(userStatus);
			} catch (error) {
				console.error('Error fetching user status:', error);
				setUser(null);
			}
		};
		fetchUserStatus();
	}, []);

	return (
		<>
			<header className="main-nav">
				<div onClick={handleDropDown} className="drop-down">
					{/* TODO TWO LINES THAT ROTATE INTO X WHEN ACTIVE */}
					||
					{activeDropDown && (
						<div className="active-drop-down">
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
							{activeSearch && (
								<>
									<input className="activeSearch" type="text"></input>
									<img
										onClick={handleActiveSearch}
										className="active-search-icon"
										src={searchImage}
										alt="Search-Icon"
									/>
								</>
							)}
							{!activeSearch && (
								<img
									onClick={handleActiveSearch}
									className="search-icon"
									src={searchImage}
									alt="Search-Icon"
								/>
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
							<input className="activeSearch" type="text"></input>
							<img
								onClick={handleActiveSearch}
								className="active-search-icon"
								src={searchImage}
								alt="Search-Icon"
							/>
						</>
					)}
					{!activeSearch && (
						<img
							onClick={handleActiveSearch}
							className="search-icon"
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
