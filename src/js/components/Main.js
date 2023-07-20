import createHTMLElement from '../utils/createHTMLElement.js';
import DrawnChampions from './champions/DrawnChampions.js';
import Wrapper from './Wrapper.js';

const Main = () => {
	const drawnChampions = DrawnChampions();

	return createHTMLElement('main', null, {
		className: 'main',
		children: [Wrapper([drawnChampions])],
	});
};

export default Main;
