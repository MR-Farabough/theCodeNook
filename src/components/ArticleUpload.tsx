import { errorThrow } from '../functions/errorThrow';
import supabase from '../lib/supabaseClient';
import '../styles/ArticleUpload.css';

interface Props {
	user: any;
	closeModal: Function;
}

const ArticleUpload = ({ user, closeModal }: Props) => {
	const checkInputFields = (
		titleInput: HTMLInputElement,
		categoryInput: HTMLSelectElement,
		articleInput: HTMLTextAreaElement
	) => {
		if (titleInput && categoryInput && articleInput)
			if (
				titleInput.value.length > 3 &&
				categoryInput.value != 'Please Select a Category' &&
				articleInput.value.length > 50
			) {
				return true;
			} else return false;
	};

	const addArticleToUserAccount = async () => {
		const titleInput: HTMLInputElement | null =
			document.querySelector('.title-input');
		const categoryInput: HTMLSelectElement | null =
			document.querySelector('#category');
		const articleInput: HTMLTextAreaElement | null = document.querySelector(
			'.article-input-area'
		);
		let validInput;
		if (titleInput && categoryInput && articleInput) {
			validInput = checkInputFields(titleInput, categoryInput, articleInput);
		}

		if (!validInput) {
			return errorThrow(
				`
Invalid length for Article submission
`
			);
		}
		const getUserArticles = await supabase.from('User-data').select('articles');

		const DBUser = await supabase
			.from('User-data')
			.update({
				articles: {
					previous_article: getUserArticles.data,
					article_title: titleInput?.value,
					article_message: articleInput?.value,
					article_signature: categoryInput?.value,
					article_category: categoryInput?.value,
				},
			})
			.eq('uuid', user.uuid);
		if (DBUser.error === null) {
			console.log('successfully published article');
			closeModal(false);
		} else {
			errorThrow(DBUser.error.message);
		}
	};

	return (
		<section className="upload-article-container">
			<div className="top-hero-article">
				<input
					type="text"
					className="title-input"
					placeholder="Title of Article"
				/>
				<select name="category" id="category">
					<option>Please Select a Category</option>
					<option disabled={true}>--------------------------</option>
					<option>Data Structures & Algorithms</option>
					<option>Web Development</option>
					<option>Languages</option>
					<option>Database Management</option>
					<option>Development Practices</option>
				</select>
				<input
					type="text"
					className="signature-input"
					placeholder="Signature for Article"
					value={user.username}
					disabled={true}
				/>
				<button
					onClick={() => addArticleToUserAccount()}
					className="write-article"
				>
					Publish Article
				</button>
			</div>
			<textarea
				placeholder="main-article"
				className="article-input-area"
				rows={30}
			></textarea>
		</section>
	);
};

export default ArticleUpload;
