import React, {useState} from 'react';
import  {useThemeMode} from "./useThemeMode"
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
import ThemeToggler from "./ThemeToggler";
require('dotenv').config();

const App = () => {

    const [theme, themeToggler, mountedComponent] = useThemeMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    /* return empty div if useThemeMode component is mounted -  this avoids loading the light theme first on
    page reload if user has selected the dark theme */
    if(!mountedComponent) return <div/>
    return (
        /* ThemeProvider is a helper component of the styled-components and wraps everything
        in the return statement and injects any components below it */
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles/>
                <div className="App">
                    {/* Theme toggle button */}
                    <ThemeToggler  theme={theme} toggleTheme={themeToggler} />
                </div>
            </>
        </ThemeProvider>
    )
}

export default App;
