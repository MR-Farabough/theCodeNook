import '../styles/Nav.css';
import ProfileDropDown from './ProfileDropDown';
import ViewMode from './ViewMode';
import plusPNG from '../assets/plus.png';
import mailPNG from '../assets/mail.png';
import userPNG from '../assets/user.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const [isMobileView, setMobileView] = useState<Boolean>(
		window.innerWidth < 720
	);
	const [isSmallScreen, setSmallScreen] = useState<Boolean>(
		window.innerWidth < 500
	);
	const navigate = useNavigate();
	const handleHomeClick = () => {
		navigate('/');
	};

	useEffect(() => {
		function handleResize() {
			const newViewWidth = window.innerWidth < 720;
			setMobileView(newViewWidth);
			setSmallScreen(newViewWidth);
		}
		window.addEventListener('resize', handleResize);
	}, []);

	function handleOpen() {
		const dropDown = document.querySelector('.deactive');
		dropDown?.classList.remove('deactive');
		dropDown?.classList.add('active');
	}

	function handleClose() {
		const dropDown = document.querySelector('.active');
		dropDown?.classList.remove('active');
		dropDown?.classList.add('deactive');
	}

	return (
		<>
			<nav
				className="nav"
				style={{ justifyContent: isMobileView ? 'center' : 'space-evenly' }}
			>
				{!isSmallScreen && (
					<button onClick={handleHomeClick} className="home-btn">
						The Code Nook
					</button>
				)}
				<input className="nav-search" type="text" placeholder="🔍 Search" />
				<div className="nav-assets">
					<img className="icon-img plus" src={plusPNG} alt="plus" />
					{!isMobileView && (
						<div className="mobile-nav-deactive">
							<img className="icon-img mail" src={mailPNG} alt="mail" />
							<ViewMode />
						</div>
					)}
				</div>
				<div
					onMouseOver={handleOpen}
					onMouseLeave={handleClose}
					className="profile-div"
				>
					<img className="user-img" src={userPNG} alt="user" />
					<div className="profile-dropdown deactive">
						<ProfileDropDown isMobileView={isMobileView} />
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
