import champions from './champions/champions.js';
import {
	createChampionComponent,
	createChampionsContainer,
	removeChampionComponent,
} from './utils/utils.js';

const DATA_DRAGON_URL = 'http://ddragon.leagueoflegends.com/cdn';
let state = [...champions];

const getChampionSplashArt = id => {
	const imageUrl = `${DATA_DRAGON_URL}/img/champion/loading/${id}_0.jpg`;
	return imageUrl;
};

const updateState = drawnChampion => {
	return state.filter(champion => champion.name !== drawnChampion);
};

const randomizeChampion = role => {
	const champions = state.filter(champion => champion.roles.includes(role));
	const champion = champions[Math.floor(Math.random() * champions.length)];
	state = updateState(champion.name);

	return champion;
};

const run = () => {
	removeChampionComponent();
	createChampionsContainer();
	const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
	roles.forEach(role => {
		const { id, name } = randomizeChampion(role);
		const splashArtUrl = getChampionSplashArt(id);
		createChampionComponent({
			src: splashArtUrl,
			name: name,
		});
	});
	state = [...champions];
};

run();
document.querySelector('.button').addEventListener('click', run);
