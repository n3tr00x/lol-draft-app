import createHTMLElement from '../utils/createHTMLElement.js';
import { removeDraft, savedDraftsList } from '../storage/storage.js';
import { fetchDefaultChampionSplashArt } from '../utils/api.js';

const SavedDrafts = () => {
	const savedDrafts = renderSavedDrafts();

	const header = createHTMLElement('h2', 'Your saved drafts');

	const closeButton = createHTMLElement('button', 'X', {
		className: 'drafts__close-button',
	});

	closeButton.addEventListener('click', () => {
		const drafts = document.querySelector('.drafts');
		drafts.classList.remove('drafts--active');

		document.body.classList.remove('hidden');
	});

	return createHTMLElement('div', null, {
		className: 'drafts__container',
		children: [closeButton, header, savedDrafts],
	});
};

export const renderSavedDrafts = () => {
	const contentContainer = document.querySelector('.drafts__content');

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: 'drafts__content',
	});

	const getData = () => {
		try {
			const drafts = savedDraftsList();

			if (drafts?.error) throw drafts.message;

			const components = drafts.map(draft => Draft(draft));

			components.forEach(component => content.appendChild(component));

			return content;
		} catch (error) {
			const errorText = createHTMLElement('p', error, {
				className: 'error',
			});
			content.appendChild(errorText);
		}
	};

	getData();

	return content;
};

const Draft = ({ id, draft }) => {
	const draftId = id;
	const [top, jungle, mid, adc, support] = draft;

	const imagesLinks = [
		fetchDefaultChampionSplashArt(top.id),
		fetchDefaultChampionSplashArt(jungle.id),
		fetchDefaultChampionSplashArt(mid.id),
		fetchDefaultChampionSplashArt(adc.id),
		fetchDefaultChampionSplashArt(support.id),
	];

	const champions = draft.map((champion, index) => {
		const image = imagesLinks[index];
		const name = champion.name;

		const data = {
			name,
			image,
		};

		return Champion(data);
	});

	const championsContainer = createHTMLElement('div', null, {
		className: 'draft__container',
		children: champions,
	});

	const removeButton = createHTMLElement('button', 'Remove', {
		className: 'draft__remove-button',
	});

	removeButton.addEventListener('click', event => {
		const draft = event.target.parentElement;
		const savedDraftId = +draft.dataset.id;

		const confirmRemovedDraft = confirm(
			'Are you sure you want to delete draft?'
		);

		if (confirmRemovedDraft) {
			removeDraft(savedDraftId);

			const drafts = document.querySelector('.drafts__container');
			const updatedSavedDrafts = renderSavedDrafts();

			drafts.appendChild(updatedSavedDrafts);
		}
	});

	return createHTMLElement('div', null, {
		className: 'draft',
		children: [championsContainer, removeButton],
		attrs: {
			['data-id']: draftId,
		},
	});
};

const Champion = ({ name, image }) => {
	const championName = createHTMLElement('h3', name);
	const championImage = createHTMLElement('img', null, {
		attrs: {
			src: image,
			alt: name + ' splash art',
		},
	});

	return createHTMLElement('div', null, {
		className: 'draft__champion',
		children: [championName, championImage],
	});
};

export default SavedDrafts;
