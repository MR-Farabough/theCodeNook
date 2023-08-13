import '../styles/Newsletter.css';
import { UserContext } from '../Router';
import { useContext, useEffect, useState } from 'react';
import { writeToNewsletterDB } from '../functions/DBWriteNewsletter';
import { DBGetNewsletter } from '../functions/DBGetNewsletter';
import Loading from './Loading';
import { NewsletterInputValidation } from '../functions/NewsletterInputValidation';
import { errorThrow } from '../functions/errorThrow';

const Newsletter = () => {
	const [totalNewsletters, setNewsletters] = useState<number | null>(null);
	const [newLetterData, setNewLetterData] = useState<any>(null);
	const secretModal = document.querySelector('.newsletter-modal-decative');
	const user = useContext(UserContext);
	let authStatus;
	if (user.user && user.user.aud === 'authenticated') {
		authStatus = true;
	} else {
		authStatus = false;
	}

	const hanldeDBSubmit = async () => {
		const titleInput: HTMLInputElement | null = document.querySelector(
			'.newsletter-title-text'
		);
		const signatureInput: HTMLInputElement | null = document.querySelector(
			'.newsletter-signature-text'
		);
		const articleInput: HTMLInputElement | null = document.querySelector(
			'.newsletter-article-text'
		);

		if (titleInput && signatureInput && articleInput) {
			const passInput = NewsletterInputValidation(
				titleInput?.value,
				articleInput?.value,
				signatureInput?.value
			);
			if (passInput) {
				const userObj = {
					title: titleInput.value,
					article: articleInput.value,
					signature: signatureInput.value,
				};
				await writeToNewsletterDB(userObj);
				titleInput.value = '';
				articleInput.value = '';
				signatureInput.value = '';
			} else {
				errorThrow(`
				Unable to send article to database.
				Length is unacceptable.
				Please try again.
				`);
			}
		}
	};

	const getNewsletterData = async () => {
		const NewsletterData = await DBGetNewsletter();
		if (NewsletterData) {
			setNewsletters(NewsletterData.length);
			setNewLetterData(NewsletterData[NewsletterData.length - 1]);
		}
	};

	useEffect(() => {
		getNewsletterData();
	}, []);

	const openModal = () => {
		secretModal?.classList.remove('newsletter-modal-deactive');
		secretModal?.classList.add('newsletter-modal-active');
	};

	const closeModal = () => {
		secretModal?.classList.remove('newsletter-modal-active');
		secretModal?.classList.add('newsletter-modal-deactive');
	};

	return (
		<>
			<div className="newsletter-body">
				{authStatus && totalNewsletters !== null && newLetterData && (
					<section className="newsletter-container">
						{user.user.id == import.meta.env.VITE_ADMIN_UUID_KEY && (
							<>
								<div className="flex">
									<h2 className="newsletter-text welcome-admin">
										Welcome Admin:{' '}
									</h2>
									<button onClick={() => openModal()}>Write Newsletter</button>
								</div>
								<div className="newsletter-modal-decative">
									<button className="modal-closer" onClick={() => closeModal()}>
										<em>CLOSE MODAL</em> &#10005; <em>CLOSE MODAL</em>
									</button>
									<div className="flex">
										<input
											placeholder="Enter title of article"
											className="newsletter-title-text"
											type="text"
										/>
										<input
											placeholder="Enter signature for article"
											className="newsletter-signature-text"
											type="text"
										/>
										<button
											className="newsletter-submit-btn"
											onClick={() => hanldeDBSubmit()}
										>
											Write To DB
										</button>
									</div>
									<textarea
										placeholder="main-article"
										className="newsletter-article-text"
										cols={80}
										rows={50}
									></textarea>
								</div>
							</>
						)}
						<div className="hero">
							<h2 className="newsletter-text company">The Code Nook</h2>
							<h3 className="newsletter-text title">
								Newsletter: Edition {totalNewsletters}
							</h3>
						</div>
						<div className="article">
							<h2 className="newsletter-text letter-title">
								{newLetterData.title}
							</h2>
							<h4 className="newsletter-text letter-signature">
								Written By: {newLetterData.signature}
							</h4>
							<section className="newsletter-text letter-article-text">
								{newLetterData.article}
							</section>
						</div>
					</section>
				)}
				{authStatus && totalNewsletters === null && <Loading />}
				{!authStatus && (
					<em className="newsletter-text error">
						You must log in before viewing this page
					</em>
				)}
			</div>
		</>
	);
};

export default Newsletter;
