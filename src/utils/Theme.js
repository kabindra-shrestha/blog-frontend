import {red} from '@mui/material/colors';
import {createMuiTheme} from '@mui/material/styles';

// A custom theme for this app
const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A700,
        },
        background: {
            default: '#fafafa',
        },
        card: {
            background: '#fff',
        },
        text: {
            default: '#212529',
        }
    },
});

export default Theme;