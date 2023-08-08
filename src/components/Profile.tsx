import '../styles/Profile.css';
import supabase from '../lib/supabaseClient';
import { getUserStatus } from '../functions/getUserStatus';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Router';
import Loading from './Loading';

const Profile = () => {
	const { user, setUser, setLoadStatus } = useContext(UserContext);
	const navigate = useNavigate();
	const [pfpPicture, setPfpPicture] = useState(null);
	const [fullName, setFullName] = useState(null);

	const newPfpImage = () => {
		// Upload new picture
	};

	const saveInfoToDB = async () => {
		// save new info to DB
		// Update info for user
	};

	const SignOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		navigate('/');
		location.reload();
	};
	useEffect(() => {
		const fetchUserStatus = async () => {
			try {
				const userStatus = await getUserStatus();
				setUser(userStatus);
				if (user) {
					setPfpPicture(user.user_metadata.avatar_url);
					setFullName(user.user_metadata.full_name);
				}
				setLoadStatus(false);
			} catch (error) {
				console.error('Error fetching user status:', error);
				setUser(null);
			}
		};
		fetchUserStatus();
	}, [user]);
	return (
		<div className="profile-container">
			{pfpPicture && fullName && (
				<>
					<div className="profile-top">
						<img
							className="user-profile-picture"
							onClick={newPfpImage}
							src={pfpPicture}
							alt="profile-img"
						/>
					</div>
					{/* TODO Will need to change to supabase name */}
					<h2 className="user-name">{fullName}</h2>
					<h2 className="job-name">Software Engineer</h2>
					<div className="profile-bottom">
						<h3 className="hero-text">Account</h3>
						<hr />
						<div className="user-info">
							<p className="sub-text">Username</p>
							<input
								className="db-input"
								type="text"
								placeholder="Enter Username"
							/>
							<p className="sub-text">Title</p>
							{/* TODO Need to enter supabase table */}
							<input
								className="db-input"
								type="text"
								placeholder="Enter Job Title"
							/>
						</div>
					</div>
					<div className="profile-btns">
						<button onClick={newPfpImage} className="upload-new-image">
							Upload New Profile Picture
						</button>
						<button className="profile-btn" onClick={saveInfoToDB}>
							Save
						</button>
						<button className="profile-btn" onClick={SignOut}>
							Sign Out
						</button>
					</div>
				</>
			)}
			{!pfpPicture && !fullName && <Loading />}
		</div>
	);
};

export default Profile;
