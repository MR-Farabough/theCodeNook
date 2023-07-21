import '../styles/Nav.css';
import handleWindowResize from '../functions/handleWindowResize';
import ProfileDropDown from './ProfileDropDown';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const [profileDropDownStatus, setDropDownStatus] = useState<boolean>(false);
	const navigate = useNavigate();
	handleWindowResize();
	const handleHomeClick = () => {
		navigate('/');
	};
	return (
		<>
			<nav className="nav">
				<button onClick={handleHomeClick} className="home-btn">
					The Code Nook
				</button>
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
							onClick={() => {
								profileDropDownStatus == false
									? setDropDownStatus(true)
									: setDropDownStatus(false);
							}}
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
