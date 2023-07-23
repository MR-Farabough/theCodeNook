interface Props {
	isMobileView: Boolean;
}

import mailPNG from '../assets/mail.png';
import ViewMode from './ViewMode';

const profileDropdown = ({ isMobileView }: Props) => {
	return (
		<div className="dropdown">
			<div className="dropdown-content">
				<a href="#">Link 1</a>
				<a href="#">Link 2</a>
				<a href="#">Link 3</a>
				{isMobileView && (
					<div
						className="mobile-nav-deactive"
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img className="icon-img mail" src={mailPNG} alt="mail" />
						<ViewMode />
					</div>
				)}
			</div>
		</div>
	);
};

export default profileDropdown;
