import createHTMLElement from './utils/createHTMLElement.js';
import Header from './components/Header.js';

const App = () => {
	const header = Header();

	return createHTMLElement('div', null, {
		className: 'app',
		children: [header],
	});
};

export default App;
