import createHTMLElement from '../utils/createHTMLElement.js';

const Navigation = () => {
	const saveDraftButton = createHTMLElement('button', 'Save', {
		className: ['navigation__button', 'navigation__button--save'],
	});

	const drawButton = createHTMLElement('button', 'Draw', {
		className: ['navigation__button', 'navigation__button--draw'],
	});

	return createHTMLElement('nav', null, {
		className: 'navigation',
		children: [drawButton, saveDraftButton],
	});
};

export default Navigation;
