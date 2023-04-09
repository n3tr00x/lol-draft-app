import champions from './champions/champions.js';
import {
	appendChampionsComponents,
	createChampionComponent,
	createChampionsContainer,
	handleLoading,
	loadChampions,
	removeChampionComponent,
	resolvePromisesForComponents,
} from './utils/utils.js';

const DATA_DRAGON_URL = 'http://ddragon.leagueoflegends.com/cdn';
let state = [...champions];

const getChampionSplashArt = async id => {
	const skinsNumbers = await getSkinsIds(id);
	const skinNumber = randomizeSkinNumber(skinsNumbers);

	const imageUrl = `${DATA_DRAGON_URL}/img/champion/loading/${id}_${skinNumber}.jpg`;
	return imageUrl;
};

const getSkinsIds = async id => {
	try {
		const response = await fetch(
			`${DATA_DRAGON_URL}/13.4.1/data/en_US/champion/${id}.json`
		);
		const data = await response.json();
		const skins = data.data[id].skins;

		return skins.map(skin => skin.num);
	} catch (error) {
		console.error('Błąd!');
	}
};

const randomizeSkinNumber = skins => {
	return skins[Math.floor(Math.random() * skins.length)];
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

const run = async () => {
	const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
	const components = [];

	removeChampionComponent();
	createChampionsContainer();
	handleLoading(false);

	for (const role of roles) {
		const { id, name } = randomizeChampion(role);
		const splashArtUrl = await getChampionSplashArt(id);
		const champion = createChampionComponent({
			src: splashArtUrl,
			name,
			role,
		});
		components.push(champion);
	}
	const loadedComponents = await resolvePromisesForComponents(components);

	loadedComponents.forEach(component => {
		appendChampionsComponents(component);
	});

	loadChampions();
	handleLoading(true);
	state = [...champions];
};

run();
document.querySelector('.button--draw').addEventListener('click', run);
