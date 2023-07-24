import createHTMLElement from '../../utils/createHTMLElement.js';
import { drawnChampion } from '../../state/drawing.js';
import { fetchChampionSplashArt } from '../../utils/api.js';
import Loader from '../loader/Loader.js';
import { setDraft } from '../../state/drafts.js';
import loadImage from '../../utils/loadImage.js';

const DrawnChampions = () => {
	const champions = renderChampions();

	return createHTMLElement('div', null, {
		className: 'champions',
		children: [champions],
	});
};

export const renderChampions = () => {
	const contentContainer = document.querySelector('.champions__content');

	if (contentContainer) contentContainer.remove();

	const content = createHTMLElement('div', null, {
		className: 'champions__content',
	});

	const roles = ['top', 'jungle', 'mid', 'adc', 'support'];

	const getData = async () => {
		try {
			Loader(content, true);
			const drawnChampions = roles.map(role => drawnChampion(role));
			const [top, jungle, mid, adc, support] = drawnChampions;

			setDraft({
				id: Date.now(),
				draft: [top, jungle, mid, adc, support],
			});

			const imagesLinks = await Promise.all([
				fetchChampionSplashArt(top.id),
				fetchChampionSplashArt(jungle.id),
				fetchChampionSplashArt(mid.id),
				fetchChampionSplashArt(adc.id),
				fetchChampionSplashArt(support.id),
			]);

			const componentsCallback = async (role, index) => {
				const { name, id } = drawnChampions[index];
				const link = imagesLinks[index];

				const data = {
					id,
					name,
					link,
					role,
				};

				return await ChampionComponent(data);
			};

			const rawComponents = roles.map(componentsCallback);
			const components = await Promise.all(rawComponents);
			Loader(content, false);

			components.forEach(component => content.appendChild(component));

			return content;
		} catch (error) {
			console.error('Error!', error);
		}
	};

	getData();

	return content;
};

const ChampionComponent = async ({ id, name, role, link }) => {
	const roleName = createHTMLElement('h2', role.toUpperCase(), {
		className: 'champion__role',
	});

	const image = await loadImage(link, `${name} splash art`);

	const championName = createHTMLElement('p', name, {
		className: 'champion__name',
	});

	return createHTMLElement('div', null, {
		className: 'champion',
		children: [roleName, image, championName],
		attrs: {
			['data-id']: id,
		},
	});
};

export default DrawnChampions;
