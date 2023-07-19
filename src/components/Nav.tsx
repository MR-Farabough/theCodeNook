import '../styles/Nav.css';

const Nav = () => {
	return (
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
				<img className="icon-img" src="src/assets/user.png" alt="user" />
			</div>
		</nav>
	);
};

export default Nav;
