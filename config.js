// ╔╗ ╔═╗╔╗╔╔╦╗╔═╗
// ╠╩╗║╣ ║║║ ║ ║ ║
// ╚═╝╚═╝╝╚╝ ╩ ╚═╝
// ┌─┐┌─┐┌┐┌┌─┐┬┌─┐┬ ┬┬─┐┌─┐┌┬┐┬┌─┐┌┐┌
// │  │ ││││├┤ ││ ┬│ │├┬┘├─┤ │ ││ ││││
// └─┘└─┘┘└┘└  ┴└─┘└─┘┴└─┴ ┴ ┴ ┴└─┘┘└┘

const CONFIG = {
	// ┌┐ ┌─┐┌─┐┬┌─┐┌─┐
	// ├┴┐├─┤└─┐││  └─┐
	// └─┘┴ ┴└─┘┴└─┘└─┘

	// General
	name: 'Alex',
	imageBackground: false,
	openInNewTab: false,
	twelveHourFormat: false,

	// Greetings
	greetingMorning: 'Good morning!',
	greetingAfternoon: 'Good afternoon,',
	greetingEvening: 'Good evening,',
	greetingNight: 'Go to Sleep!',

	// Layout
	bentoLayout: 'buttons', // 'bento', 'lists', 'buttons'

	// Weather
	weatherIcons: 'OneDark', // 'Onedark', 'Nord', 'Dark', 'White'
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

	// ┌┐ ┬ ┬┌┬┐┌┬┐┌─┐┌┐┌┌─┐
	// ├┴┐│ │ │  │ │ ││││└─┐
	// └─┘└─┘ ┴  ┴ └─┘┘└┘└─┘

	firstButtonsContainer: [
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
			icon: 'smartphone',
			link: 'https://wiki.postmarketos.org/wiki/Main_Page'
		},
		{
			id: '4',
			name: 'ChatGPT',
			icon: 'brain',
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
		}
	],

	secondButtonsContainer: [
		{
			id: '1',
			name: 'Google',
			icon: 'search',
			link: 'https://www.google.com'
		},
		{
			id: '2',
			name: 'Google Translate',
			icon: 'languages',
			link: 'https://translate.google.com'
		},
		{
			id: '3',
			name: 'Cobalt.tools',
			icon: 'hard-drive-download',
			link: 'https://cobalt.tools'
		},
		{
			id: '4',
			name: 'Emag',
			icon: 'shopping-bag',
			link: 'https://www.emag.ro'
		},
		{
			id: '5',
			name: 'Beautifier',
			icon: 'flower-2',
			link: 'https://beautifier.io'
		},
		{
			id: '6',
			name: 'bot',
			icon: 'bot',
			link: 'https://discord.com/app'
		}
	]
};
