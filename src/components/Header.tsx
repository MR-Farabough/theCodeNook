import { useState } from 'react';
import '../styles/Header.css';
import Nav from './Nav';
import searchImage from '../assets/search.png';
import { getUserStatus } from '../functions/getUserStatus';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../Router';

const Header = () => {
	const { user, setUser, setLoadStatus } = useContext(UserContext);
	const [activeSearch, setActiveSearch] = useState<boolean>(false);
	const handleActiveSearch = () => {
		return activeSearch ? setActiveSearch(false) : setActiveSearch(true);
	};
	const navigate = useNavigate();
	useEffect(() => {
		const fetchUserStatus = async () => {
			try {
				const userStatus = await getUserStatus();
				setUser(userStatus);
				setLoadStatus(false);
			} catch (error) {
				console.error('Error fetching user status:', error);
				setUser(null);
				setLoadStatus(true);
			}
		};
		fetchUserStatus();
	}, []);

	return (
		<>
			<header className="main-nav">
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
						<button onClick={() => navigate('/profile')}>
							{user.user_metadata.full_name}
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
