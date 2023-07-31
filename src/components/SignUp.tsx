import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import githubLogo from '../assets/github.png';
import discordLogo from '../assets/discord.png';
import googleLogo from '../assets/google.png';

const SignIn = () => {
	const navigate = useNavigate();
	return (
		<section className="signUp-form">
			<div className="input-option">
				<label htmlFor="first-name">First Name</label>
				<input id="first-name" type="text" placeholder="Enter First Name..." />
			</div>
			<div className="input-option">
				<label htmlFor="last-name">Last Name</label>
				<input id="last-name" type="text" placeholder="Enter Last Name..." />
			</div>
			<div className="input-option">
				<label htmlFor="username">Username</label>
				<input id="username" type="text" placeholder="Enter Username..." />
			</div>
			<div className="input-option">
				<label htmlFor="email">Email</label>
				<input id="email" type="text" placeholder="Enter Email..." />
			</div>
			{/* TODO Style sign up add already a user */}
			{/* TODO 3rd party auths */}
			<button className="signUp-button">Sign Up</button>
			<div className="signUp-seperator">
				<hr />
				<div className="or">or</div>
				<hr />
			</div>
			<div className="third-party-signup">
				<img className="thirdPartyLogo" src={githubLogo} alt="github-logo" />
				<img className="thirdPartyLogo" src={discordLogo} alt="discord-logo" />
				<img className="thirdPartyLogo" src={googleLogo} alt="google-logo" />
			</div>
			<div className="lower-signup">
				<p>Already Have an Account?</p>
				<a className="signIn-tag" onClick={() => navigate('/signin')}>
					Sign In
				</a>
			</div>
		</section>
	);
};

export default SignIn;
