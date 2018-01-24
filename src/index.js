import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
    body{
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }
`;
const theme = {
    base: "palevioletred",
    light: "white",
}

ReactDOM.render(<ThemeProvider theme={theme}><App /></ThemeProvider>, document.getElementById('root'));
registerServiceWorker();
