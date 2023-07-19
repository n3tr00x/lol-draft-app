import createHTMLElement from '../utils/createHTMLElement.js';
import DrawnChampions from './champions/DrawnChampions.js';

const Main = () => {
	const drawnChampions = DrawnChampions();

	return createHTMLElement('main', null, {
		className: 'main',
		children: [drawnChampions],
	});
};

export default Main;
