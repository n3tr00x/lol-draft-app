const app = document.querySelector('.app');

export const createChampionComponent = async ({ src, name, role }) => {
	try {
		const div = document.createElement('div');
		div.classList.add('champion');
		div.setAttribute('id', `champion__${name}`);

		const championName = createChampionName(name);
		const splashArt = await createImage(src);
		const roleName = createRoleName(role);

		div.appendChild(roleName);
		div.appendChild(splashArt);
		div.appendChild(championName);

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

const createChampionName = name => {
	const p = document.createElement('p');
	p.classList.add('champion__name');
	p.textContent = name;

	return p;
};

const createRoleName = role => {
	const h2 = document.createElement('h2');
	h2.classList.add('champion__name');
	h2.textContent = role.toUpperCase();

	return h2;
};
