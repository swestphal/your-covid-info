import React, {useState} from 'react';

/* Theme Provider */
import {ThemeProvider} from "styled-components";
/* ThemeProvider is a helper component in the styled-components library that provides theming support.
This helper component injects a theme into all React component below itself via the Context API.
In the rendering tree, all styled-components will have access to the provided theme,
even when they are multiple levels deep.
https://styled-components.com/docs/advanced#theming
 */


import { GlobalStyles } from "../styles/GlobalStyles";
import { lightTheme, darkTheme } from "./Themes"
require('dotenv').config();

const App = () => {
    /* In order to use a toggling method for the theme, we need a state that holds our selected themes  value.
    We set a theme state, and set the initial state to light, using the useState hook.
    */
    const [theme, setTheme] = useState('light');

    /* Check the state of the theme by ternary operator and set the current value */
    const themeToggler = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
    }
    return (
        /* ThemeProvider is a helper component of the styled-components and wraps everything
        in the return statement and injects any components below it */
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles/>
                <div className="App">
                    {/* Theme toggle button */}
                    <button onClick={themeToggler}>Switch Theme</button>
                </div>
            </>
        </ThemeProvider>
    )
}

export default App;
