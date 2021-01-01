import {useEffect, useState} from "react";

/* custom hook */

export const useThemeMode = () => {
    /* In order to use a toggling method for the theme, we need a state that holds our selected themes  value.
        We set a theme state, and set the initial state to light, using the useState hook. */
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false)

    /* Pass selected theme in the browser session storage and
     set state  */
    const setMode = mode => {
        window.localStorage.setItem('theme',mode)
        setTheme(mode)
    }

    /* Check the state of the theme by ternary operator and call set mode with the value */
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    }

    /* check on mounting the component for local storage and set state */
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme)
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler,mountedComponent]
}
