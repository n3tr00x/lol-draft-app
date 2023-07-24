let state = {
	isSaved: false,
	draft: {},
};

export const getDraft = () => state.draft;
export const getIsSaved = () => state.isSaved;

const setState = newStateCallback => {
	const previousState = { ...state };
	const newState = newStateCallback(previousState);

	state = { ...previousState, ...newState };
};

export const setDraft = draft => {
	setState(prevState => ({
		...prevState,
		draft,
	}));
};

export const setIsSaved = isSaved => {
	setState(prevState => ({
		...prevState,
		isSaved,
	}));
};
