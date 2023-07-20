import '../styles/Nav.css';
import handleWindowResize from '../functions/handleWindowResize';
import ProfileDropDown from './ProfileDropDown';
import { useState } from 'react';

const Nav = () => {
	const [profileDropDownStatus, setDropDownStatus] = useState<boolean>(false);
	handleWindowResize();
	const handleProfileDropDown = () => {
		profileDropDownStatus == false
			? setDropDownStatus(true)
			: setDropDownStatus(false);
	};
	return (
		<>
			<nav className="nav">
				<button className="home-btn">The Code Nook</button>
				<input className="nav-search" type="text" placeholder="🔍 Search" />
				<div className="nav-assets">
					<img className="icon-img" src="src/assets/plus.png" alt="plus" />
					<div className="mobile-nav-deactive">
						<img className="icon-img" src="src/assets/mail.png" alt="mail" />
						<div className="theme-slider">
							<img
								className="slider-img"
								src="src/assets/sun.png"
								alt="light mode"
							/>
						</div>
					</div>
					<div className="profile-div">
						<img
							onClick={handleProfileDropDown}
							className="user-img"
							src="src/assets/user.png"
							alt="user"
						/>
						{profileDropDownStatus && <ProfileDropDown />}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
