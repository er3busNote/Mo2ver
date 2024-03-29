import { ThemeOptions } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const defaultTheme: ThemeOptions = {
	palette: {
		text: {
			primary: '#fff', // Main Text
			secondary: '#fff', // Validation Text
		},
		action: {
			disabled: '#000', // Button Disabled Text
			disabledBackground: '#34343B', // Button Disabled Background Color
		},
		background: {
			default: '#fff',
			paper: '#000',
		},
		secondary: {
			main: '#86868A', // LockOut Icon Background Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
};

const contentTheme: ThemeOptions = {
	palette: {
		text: {
			primary: '#000', // Main Text
			secondary: '#000', // Validation Text
		},
		action: {
			active: '#505056',
			hover: 'rgba(0, 0, 0, 0.04)',
			selected: purple[700],
			disabled: '#cdcdcd', // Button Disabled Text
			disabledBackground: 'rgba(0, 0, 0, 0.12)', // Button Disabled Background Color
		},
		background: {
			default: '#fff',
			paper: '#fff',
		},
		primary: {
			main: '#6A3DCB', // Border Color
		},
		secondary: {
			main: '#86868A', // ListItemText Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
};

const adminTheme: ThemeOptions = {
	palette: {
		text: {
			primary: '#000', // Main Text
			secondary: '#000', // Validation Text
		},
		action: {
			active: '#363658',
			hover: '#F1F2F3',
			selected: '#F1F2F3',
			disabled: '#BDBDBD', // Button Disabled Text
			disabledBackground: '#34343B', // Button Disabled Background Color
		},
		background: {
			default: '#fff',
			paper: '#fff',
		},
		primary: {
			main: '#505056', // Border Color
		},
		secondary: {
			main: '#86868A', // ListItemText Color
		},
	},
	spacing: 6, // Spacing(간격) - Default : 8px
};

export { defaultTheme, contentTheme, adminTheme };
