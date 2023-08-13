import '../styles/Profile.css';
import supabase from '../lib/supabaseClient';
import { DBGetUserData } from '../functions/DBGetUserData';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Router';
import Loading from './Loading';
import { errorThrow } from '../functions/errorThrow';
import { DBUserInsert } from '../functions/DBInsertUser';
import { DBUpdate } from '../functions/DBUpdate';
import { getUserStatus } from '../functions/DBGetUserStatus';
import ArticleUpload from './ArticleUpload';

// BUG page reload causes infintie loading because component is already mounted?

const Profile = () => {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();
	const [pfpPicture, setPfpPicture] = useState(null);
	const [userData, setUserData] = useState<any>(null);
	const [name, setName] = useState<string | null>(null);
	const [title, setTitle] = useState<string | null>(null);
	const [uploadModal, setUploadModal] = useState<Boolean>(false);

	const newPfpImage = () => {
		// Upload new picture
	};

	const fetchUserStatus = async () => {
		console.log('resource watch');

		try {
			const userStatus = await getUserStatus();
			setUser(userStatus);
			if (user) {
				setPfpPicture(user.user_metadata.avatar_url);
				const DBCall = await DBGetUserData(user.id);
				if (DBCall) {
					setUserData(DBCall.data);
				}

				if (!DBCall) {
					DBUserInsert({
						user_id: user.id,
						title: 'Update Your Title',
						username: user.user_metadata.full_name,
					});
					setName(user.user_metadata.full_name);
					setTitle('Update Your Title');
				}
			}
		} catch (error) {
			errorThrow(`Error fetching user status: ${error}`);
			setUser(null);
		}
	};

	const saveInfoToDB = async () => {
		const userNameInputEl: any = document.getElementById('db-userName-input');
		const titleInputEl: any = document.getElementById('db-title-input');

		let errorUser = false;
		let errorTitle = false;

		if (userNameInputEl && titleInputEl) {
			userNameInputEl.value.length < 2 ? (errorUser = true) : null;
			titleInputEl.value.length < 2 ? (errorTitle = true) : null;
		}

		if (!errorUser && !errorTitle) {
			DBUpdate(
				{
					title: titleInputEl?.value,
					username: userNameInputEl?.value,
				},
				user.id
			);
			userNameInputEl.style.border = '1px solid green';
			titleInputEl.style.border = '1px solid green';
			userNameInputEl.value = '';
			titleInputEl.value = '';
		} else if (errorUser && errorTitle) {
			userNameInputEl.style.border = '2px solid red';
			titleInputEl.style.border = '2px solid red';
		} else if (errorUser) {
			DBUpdate(
				{
					title: titleInputEl?.value,
					username: userData.username,
				},
				user.id
			);
			userNameInputEl.style.border = '2px solid red';
		} else if (errorTitle) {
			DBUpdate(
				{
					title: userData.title,
					username: userNameInputEl?.value,
				},
				user.id
			);
			titleInputEl.style.border = '2px solid red';
		}
		fetchUserStatus();
	};

	const SignOut = async () => {
		await supabase.auth.signOut();
		setUser(null);
		navigate('/');
		location.reload();
	};

	useEffect(() => {
		fetchUserStatus();
	}, []);

	useEffect(() => {
		if (userData) {
			setName(userData.username);
			setTitle(userData.title);
		}
	}, [userData]);

	return (
		<div className="profile-container">
			{pfpPicture && userData && (
				<>
					<div className="profile-top">
						<img
							className="user-profile-picture"
							onClick={newPfpImage}
							src={pfpPicture}
							alt="profile-img"
						/>
					</div>
					<h2 className="user-name">{name}</h2>
					<h2 className="job-name">{title}</h2>
					<div className="profile-bottom">
						<h3 className="hero-text">Account</h3>
						<hr />
						<div className="user-info">
							<p className="sub-text">Username</p>
							<input
								id="db-userName-input"
								className="db-input"
								type="text"
								placeholder="Enter Username"
							/>
							<p className="sub-text">Title</p>
							<input
								id="db-title-input"
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
						<button
							className="profile-btn upload-article-btn"
							onClick={saveInfoToDB}
						>
							Save Profile Info
						</button>
						<button className="profile-btn" onClick={SignOut}>
							Sign Out
						</button>
						{!uploadModal && (
							<button
								className="profile-btn upload-article-btn"
								onClick={() => setUploadModal(true)}
							>
								Write an Article
							</button>
						)}
						{uploadModal && (
							<button
								className="profile-btn upload-article-btn"
								onClick={() => {
									const userResponse = prompt(
										`
*WARNING*
In result of closing the article you will lose all progress
Are you sure you want to do this?

(y)es or (n)
`
									);
									if (
										userResponse?.toLowerCase() == 'yes' ||
										userResponse?.toLowerCase() == 'y'
									) {
										return setUploadModal(false);
									} else {
										return null;
									}
								}}
							>
								End Writing
							</button>
						)}
						<hr />
						<br />
					</div>
					{uploadModal && (
						<ArticleUpload user={userData} closeModal={setUploadModal} />
					)}
				</>
			)}
			{!pfpPicture && !name && !title && <Loading />}
		</div>
	);
};

export default Profile;
