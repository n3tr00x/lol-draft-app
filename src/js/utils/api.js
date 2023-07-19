const DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com';

export const fetchChampionsSplashArt = async championId => {
	const skinId = await fetchSkinId(championId);

	return `${DATA_DRAGON_URL}/cdn/img/champion/loading/${championId}_${skinId}.jpg`;
};

const fetchSkinId = async id => {
	try {
		const latestVersion = await fetchLatestVersion();
		const response = await fetch(
			`${DATA_DRAGON_URL}/cdn/${latestVersion}/data/en_US/champion/${id}.json`
		);
		const championData = await response.json();
		if (!championData) throw new Error('Something went wrong!');

		const skins = championData.data[id].skins;
		const drawnSkin = skins[Math.floor(Math.random() * skins.length)].num;

		return drawnSkin;
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};

const fetchLatestVersion = async () => {
	try {
		const response = await fetch(`${DATA_DRAGON_URL}/api/versions.json`);
		const versions = await response.json();

		if (versions?.length === 0) throw new Error('Something went wrong!');

		const latestVersion = versions[0];

		return latestVersion;
	} catch (error) {
		return {
			error: true,
			message: error.message,
		};
	}
};
