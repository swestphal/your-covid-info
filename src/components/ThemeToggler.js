import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

const ThemeButton = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }`;

const Toggle = ({theme,  toggleTheme }) => {
    return (
        <ThemeButton onClick={toggleTheme} >
          Switch Theme
        </ThemeButton>
    );
};
/* using propTypes to define the types of the prop:
    theme is the current selected theme
    toggleTheme is the function that is used to switch between the themes
 */
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;