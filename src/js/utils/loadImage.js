const loadImage = (url, alt) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.className = 'champion__image';
		img.src = url;
		img.alt = alt;

		img.onload = () => resolve(img);
		img.onerror = error => reject(error);
	});
};

export default loadImage;
