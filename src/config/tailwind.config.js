module.exports = {
	mode: 'jit',
	purge: {
		enabled: true,
		content: ['./views/*.html', './views/**/*.html'],
	},
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: {
					dark: '#3b3b3b',
					light: '#4c4c4c',
					extralight: '#929292',
				},
			},
			borderWidth: {
				DEFAULT: '1px',
				0: '0',
				2: '2px',
				3: '3px',
				4: '4px',
				5: '5px',
				6: '6px',
				7: '7px',
				8: '8px',
			},
			maxHeight: {
				'vh-10': '10vh',
				'vh-20': '20vh',
				'vh-30': '30vh',
				'vh-40': '40vh',
				'vh-50': '50vh',
				'vh-60': '60vh',
				'vh-70': '70vh',
				'vh-80': '80vh',
				'vh-90': '90vh',
				'vh-100': '100vh',
			},
		},
	},
	variants: {
		extend: {
			border: ['hover'],
			weight: ['hover'],
			shadow: ['hover', 'focus'],
			font: ['hover', 'focus'],
		},
	},
	plugins: [],
};
