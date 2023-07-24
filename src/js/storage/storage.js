import { getDraft } from '../state/drafts.js';

const storage = window.localStorage;

export const savedDraftsList = () => {
	try {
		const drafts = JSON.parse(storage.getItem('drafts'));

		if (!drafts || drafts.length === 0) throw new Error('No drafts saved!');

		return drafts;
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

export const saveDraft = () => {
	const draftsStorage = JSON.parse(storage.getItem('drafts')) || [];
	const currentDraft = getDraft();

	storage.setItem('drafts', JSON.stringify([currentDraft, ...draftsStorage]));
};

export const removeDraft = id => {
	const draftsStorage = JSON.parse(storage.getItem('drafts'));
	const removedItem = draftsStorage.filter(draft => draft.id !== id);

	storage.setItem('drafts', JSON.stringify(removedItem));
};
