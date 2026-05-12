const CONFIG = {
	// General
	openInNewTab: true,
	twelveHourFormat: false,

	// Greetings
	greetingMorning: 'Good morning!',
	greetingAfternoon: 'Good afternoon!',
	greetingEvening: 'Good evening!',
	greetingNight: 'Go to Sleep!',

	// Weather
	weatherUnit: 'C', // 'F', 'C'
	language: 'en',

	trackLocation: true, // If false or an error occurs, the app will use the lat/lon below
	defaultLatitude: '37.775',
	defaultLongitude: '-122.419',

	// Autochange
	autoChangeTheme: true,

	// Autochange by OS
	changeThemeByOS: true,

	// Autochange by hour options (24hrs format, string must be in: hh:mm)
	changeThemeByHour: false,

	ButtonsContainer: [
		{
			id: '1',
			name: 'Github',
			icon: 'code',
			link: 'https://github.com'
		},
		{
			id: '2',
			name: 'Gmail',
			icon: 'mail',
			link: 'https://mail.google.com'
		},
		{
			id: '3',
			name: 'PostmarketOS',
			icon: 'tablet-smartphone',
			link: 'https://wiki.postmarketos.org/wiki/Main_Page'
		},
		{
			id: '4',
			name: 'ChatGPT',
			icon: 'brain-cog',
			link: 'https://chatgpt.com'
		},
		{
			id: '5',
			name: 'Reddit',
			icon: 'glasses',
			link: 'https://www.reddit.com'
		},
		{
			id: '6',
			name: 'Youtube',
			icon: 'monitor-play',
			link: 'https://www.youtube.com'
		},
		{
			id: '7',
			name: 'Google',
			icon: 'search',
			link: 'https://www.google.com'
		},
		{
			id: '8',
			name: 'Google Translate',
			icon: 'languages',
			link: 'https://translate.google.com'
		},
		{
			id: '9',
			name: 'Cobalt.tools',
			icon: 'hard-drive-download',
			link: 'https://cobalt.tools'
		},
		{
			id: '10',
			name: 'Emag',
			icon: 'shopping-cart',
			link: 'https://www.emag.ro'
		},
		{
			id: '11',
			name: 'Beautifier',
			icon: 'flower-2',
			link: 'https://beautifier.io'
		},
		{
			id: '12',
			name: 'Discord',
			icon: 'bot-message-square',
			link: 'https://discord.com/app'
		}
	]
};
