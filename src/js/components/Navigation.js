import createHTMLElement from '../utils/createHTMLElement.js';
import { getIsSaved, setIsSaved } from '../state/drafts.js';
import { resetChampions } from '../state/drawing.js';
import { saveDraft } from '../storage/storage.js';
import { renderSavedDrafts } from './SavedDrafts.js';
import { renderChampions } from './champions/DrawnChampions.js';

const Navigation = () => {
	const saveDraftButton = createHTMLElement('button', 'Save', {
		className: ['navigation__button', 'navigation__button--save'],
	});

	const drawButton = createHTMLElement('button', 'Draw', {
		className: ['navigation__button', 'navigation__button--draw'],
	});

	const draftsButton = createHTMLElement('button', 'Drafts', {
		className: ['navigation__button', 'navigation__button--drafts'],
	});

	drawButton.addEventListener('click', () => {
		resetChampions();
		setIsSaved(false);

		const champions = document.querySelector('.champions');
		const newDraft = renderChampions();

		champions.appendChild(newDraft);
	});

	saveDraftButton.addEventListener('click', () => {
		const isSaved = getIsSaved();

		if (isSaved) {
			alert('The draft has already been saved!');
			return;
		}

		saveDraft();
		alert('The draft was saved correctly!');

		const drafts = document.querySelector('.drafts__container');
		const savedDrafts = renderSavedDrafts();

		drafts.appendChild(savedDrafts);

		setIsSaved(true);
	});

	draftsButton.addEventListener('click', () => {
		const drafts = document.querySelector('.drafts');
		drafts.classList.add('drafts--active');

		document.body.classList.add('hidden');
	});

	return createHTMLElement('nav', null, {
		className: 'navigation',
		children: [drawButton, draftsButton, saveDraftButton],
	});
};

export default Navigation;
