import '../styles/ViewMode.css';

const viewMode = () => {
	return (
		<>
			<input type="checkbox" id="check" className="toggle" />
			<label htmlFor="check"></label>
		</>
	);
};

export default viewMode;

// TODO: Change entire application to dark || light mode
