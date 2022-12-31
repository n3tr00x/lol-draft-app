const app = document.querySelector('.app');

export const createChampionComponent = async ({ src, name }) => {
	try {
		const div = document.createElement('div');
		div.classList.add('champion');
		div.setAttribute('id', `champion__${name}`);

		const championName = createNameParagraph(name);
		const splashArt = await createImage(src);

		div.appendChild(championName);
		div.appendChild(splashArt);

		document.querySelector('.champions').appendChild(div);
	} catch (error) {
		console.error(error);
	}
};

export const createChampionsContainer = () => {
	const div = document.createElement('div');
	div.classList.add('champions');

	app.appendChild(div);
	return div;
};

export const removeChampionComponent = () => {
	if (document.querySelector('.champions'))
		document.querySelector('.champions').remove();
};

const createImage = async src => {
	const img = document.createElement('img');
	img.classList.add('champion__image');
	img.src = src;

	return new Promise((resolve, reject) => {
		img.onload = () => resolve(img);
		img.onerror = () => reject('loading error!');
	});
};

const createNameParagraph = name => {
	const p = document.createElement('h2');
	p.classList.add('champion__name');
	p.textContent = name;

	return p;
};
