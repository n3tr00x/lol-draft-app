import createHTMLElement from '../utils/createHTMLElement.js';
import Navigation from './Navigation.js';
import Wrapper from './Wrapper.js';

const Header = () => {
	const navigation = Navigation();

	const title = createHTMLElement('h1', 'Draw Your League Of Legends Draft', {
		className: 'header__title',
	});

	const container = createHTMLElement('div', null, {
		className: 'header__container',
		children: [title, navigation],
	});

	return createHTMLElement('header', null, {
		className: 'header',
		children: [Wrapper([container])],
	});
};

export default Header;
