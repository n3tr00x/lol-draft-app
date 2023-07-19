import createHTMLElement from './utils/createHTMLElement.js';
import Header from './components/Header.js';
import Main from './components/Main.js';

const App = () => {
	const header = Header();
	const main = Main();

	return createHTMLElement('div', null, {
		className: 'app',
		children: [header, main],
	});
};

export default App;
