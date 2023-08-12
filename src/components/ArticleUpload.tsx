import '../styles/ArticleUpload.css';

const ArticleUpload = () => {
	return (
		<section className="upload-article-container">
			<div className="top-hero-article">
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
					className="title-input"
					placeholder="Title of Article"
				/>
			</div>
			<div className="top-hero-article">
				<input
					type="text"
					className="signature-input"
					placeholder="Signature for Article"
				/>
				<button>Write to DB</button>
			</div>
			<textarea
				placeholder="main-article"
				className="newsletter-article-text"
				cols={73}
				rows={30}
			></textarea>
		</section>
	);
};

export default ArticleUpload;
