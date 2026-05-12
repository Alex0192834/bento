const position = 'beforeend';

let ButtonsContainer = `
<div class="buttonsContainer" id="buttons_1"></div>
`;

const generateButtonsContainer = () => {
	buttons_1.style.setProperty('--button-rows', Math.max(1, Math.ceil(CONFIG.ButtonsContainer.length / 6)));

	for (const button of CONFIG.ButtonsContainer) {
		let item = `
        <a
          href="${button.link}"
          target="${CONFIG.openInNewTab ? '_blank' : ''}"
          class="card button button__${button.id}"
        >
          <i class="buttonIcon" icon-name="${button.icon}"></i>
        </a>
    `;

		buttons_1.insertAdjacentHTML(position, item);
	}
};

const generateButtons = () => {
	linksBlockLeft.insertAdjacentHTML(position, ButtonsContainer);
	generateButtonsContainer();
};

generateButtons();
