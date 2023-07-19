import champions from '../data/champions.js';

let state = [...champions];

export const drawnChampion = role => {
	const matchedChampions = state.filter(champion =>
		champion.roles.includes(role)
	);
	const randomNumber = Math.floor(Math.random() * matchedChampions.length);
	const champion = matchedChampions[randomNumber];
	state = updateChampions(champion.id);

	return champion;
};

export const resetChampions = () => {
	state = [...champions];
};

const updateChampions = drawnChampion => {
	return state.filter(champion => champion.id !== drawnChampion);
};
