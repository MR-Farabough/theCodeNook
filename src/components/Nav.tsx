import '../styles/Nav.css';
import ProfileDropDown from './ProfileDropDown';
import ViewMode from './ViewMode';
import plusPNG from '../assets/plus.png';
import mailPNG from '../assets/mail.png';
import userPNG from '../assets/user.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
	const [profileDropDownStatus, setDropDownStatus] = useState<boolean>(false);
	const navigate = useNavigate();
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
					<img className="icon-img" src={plusPNG} alt="plus" />
					<div className="mobile-nav-deactive">
						<img className="icon-img mail" src={mailPNG} alt="mail" />
						<ViewMode />
					</div>
					<div
						onMouseOver={() => {
							profileDropDownStatus == false ? setDropDownStatus(true) : null;
						}}
						onMouseLeave={() => {
							profileDropDownStatus == true ? setDropDownStatus(false) : null;
						}}
						className="profile-div"
					>
						<img className="user-img" src={userPNG} alt="user" />
						{profileDropDownStatus && <ProfileDropDown />}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
