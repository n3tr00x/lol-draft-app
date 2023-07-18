import createHTMLElement from '../utils/createHTMLElement.js';

const Wrapper = children =>
	createHTMLElement('div', null, {
		className: 'wrapper',
		children: children,
	});

export default Wrapper;
