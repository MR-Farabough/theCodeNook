import { useEffect, useState } from 'react';
import '../styles/Nav.css';

const Nav = () => {
	const [dsaMenu, setDsaMenu] = useState<Boolean>(false);
	const [webDevMenu, setWebDevMenu] = useState<Boolean>(false);
	const [languageMenu, setLangugageMenu] = useState<Boolean>(false);
	const [dbMenu, setDbMenu] = useState<Boolean>(false);
	const [devPracticeMenu, setDevPracticeMenu] = useState<Boolean>(false);
	const [showNav, setShowNav] = useState(true);
	const menus = [
		setDsaMenu,
		setWebDevMenu,
		setLangugageMenu,
		setDbMenu,
		setDevPracticeMenu,
	];

	const closeWindows = () => {
		menus.forEach((menu) => {
			menu(false);
		});
	};

	const windowTest = () => {
		const windowSize = window.innerWidth;
		if (windowSize < 750) {
			setShowNav(false);
		} else {
			setShowNav(true);
		}
	};
	window.addEventListener('resize', windowTest);

	useEffect(() => {
		windowTest();
	}, []);

	const handleMenuToggle = (menu: string | null) => {
		closeWindows();
		if (menu) {
			switch (menu) {
				case 'dsa':
					dsaMenu ? setDsaMenu(false) : setDsaMenu(true);
					break;
				case 'webDev':
					webDevMenu ? setWebDevMenu(false) : setWebDevMenu(true);
					break;
				case 'languages':
					languageMenu ? setLangugageMenu(false) : setLangugageMenu(true);
					break;
				case 'database':
					dbMenu ? setDbMenu(false) : setDbMenu(true);
					break;
				case 'devPractices':
					devPracticeMenu
						? setDevPracticeMenu(false)
						: setDevPracticeMenu(true);
					break;
			}
		}
	};

	return (
		<div>
			{showNav && (
				<>
					<nav className="sub-nav">
						<div onClick={() => handleMenuToggle('dsa')} className="sub-menu">
							<p className="subMenu-topic">Data Structures & Algorithms</p>
							{dsaMenu && (
								<div className="subNav-dropdown">
									<ul>
										<li>Arrays & Strings</li>
										<li>Linked Lists</li>
										<li>Stacks & Queues</li>
										<li>Trees & Graphs</li>
										<li>Sorting & Searching Algorithms</li>
										<li>Dynamic Programming</li>
										<li>Big O Notation & Complexity Analysis</li>
									</ul>
								</div>
							)}
						</div>

						<div
							onClick={() => handleMenuToggle('webDev')}
							className="sub-menu"
						>
							<p className="subMenu-topic">Web Development</p>
							{webDevMenu && (
								<div className="subNav-dropdown">
									<ul>
										<li>HTML & CSS</li>
										<li>Front-end Frameworks</li>
										<li>Back-end Frameworks</li>
										<li>Web APIs & Restful Services</li>
										<li>Web Security & Best Practices</li>
										<li>Responsive Design & Cross-Browser Compatibility</li>
									</ul>
								</div>
							)}
						</div>

						<div
							onClick={() => handleMenuToggle('languages')}
							className="sub-menu"
						>
							<p className="subMenu-topic">Languages</p>
							{languageMenu && (
								<div className="subNav-dropdown">
									<ul>
										<li>Python</li>
										<li>Java</li>
										<li>JavaScript / TypeScript</li>
										<li>C / C++</li>
										<li>Ruby</li>
										<li>Swift</li>
									</ul>
								</div>
							)}
						</div>

						<div
							onClick={() => handleMenuToggle('database')}
							className="sub-menu"
						>
							<p className="subMenu-topic">Database Management</p>
							{dbMenu && (
								<div className="subNav-dropdown">
									<p>Database Management</p>
									<br />
									<p>More To Come!</p>
								</div>
							)}
						</div>

						<div
							onClick={() => handleMenuToggle('devPractices')}
							className="sub-menu"
						>
							<p className="subMenu-topic">Development Practices</p>
							{devPracticeMenu && (
								<div className="subNav-dropdown">
									<ul>
										<li>Agile Development & Scrum</li>
										<li>Test-Drive Development (TDD)</li>
										<li>Continuous Integration & Deployment</li>
										<li>Code Review & Best Practices</li>
										<li>Design Patterns & Principles</li>
										<li>Version Control (GIT)</li>
										<li>Performance Optimization Techniques</li>
									</ul>
								</div>
							)}
						</div>
					</nav>
				</>
			)}
		</div>
	);
};

export default Nav;
