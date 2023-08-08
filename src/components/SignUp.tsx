import '../styles/SignUp.css';
import githubLogo from '../assets/github.png';
import discordLogo from '../assets/discord.png';
import supabase from '../lib/supabaseClient';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Router';
import { getUserStatus } from '../functions/getUserStatus';

const SignIn = () => {
	const { setUser } = useContext(UserContext);
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

	const gitHubLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
		});
	};

	const discordLogin = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'discord',
		});
	};

	return (
		<section className="signUp-form">
			<div className="flex">
				<div onClick={gitHubLogin} className="third-party-signup">
					<img className="thirdPartyLogo" src={githubLogo} alt="github-logo" />
				</div>
				<div onClick={discordLogin} className="third-party-signup">
					<img
						className="thirdPartyLogo"
						src={discordLogo}
						alt="discord-logo"
					/>
				</div>
			</div>
		</section>
	);
};

export default SignIn;
