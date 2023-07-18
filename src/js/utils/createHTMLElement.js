const createHTMLElement = (name, text = '', attributes) => {
	const element = document.createElement(name);
	element.innerText = text;

	if (!attributes) return element;

	const { className, attrs, children } = attributes;

	if (className) {
		Array.isArray(className)
			? element.classList.add(...className)
			: element.classList.add(className);
	}

	if (attrs) {
		for (const attribute in attrs) {
			element.setAttribute(attribute, attrs[attribute]);
		}
	}

	if (children) {
		for (const child of children) {
			element.appendChild(child);
		}
	}

	return element;
};

export default createHTMLElement;
