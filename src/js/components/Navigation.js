import { resetChampions } from '../state/handleDraw.js';
import createHTMLElement from '../utils/createHTMLElement.js';
import { renderChampions } from './champions/DrawnChampions.js';

const Navigation = () => {
	const saveDraftButton = createHTMLElement('button', 'Save', {
		className: ['navigation__button', 'navigation__button--save'],
	});

	const drawButton = createHTMLElement('button', 'Draw', {
		className: ['navigation__button', 'navigation__button--draw'],
	});

	drawButton.addEventListener('click', () => {
		resetChampions();

		const champions = document.querySelector('.champions');
		const newDraft = renderChampions();

		champions.appendChild(newDraft);
	});

	return createHTMLElement('nav', null, {
		className: 'navigation',
		children: [drawButton, saveDraftButton],
	});
};

export default Navigation;
