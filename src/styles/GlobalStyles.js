import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: all 0.250s ease-in;
  }

  a {
    color: ${({theme}) => theme.link};
  }

  p {
    color: ${({theme}) => theme.text};
  }

  h1, h2, h3, h4,h5 {
    color: ${({theme}) => theme.heading};
  }
  h3 {
    font-size:1.6rem;
  }
  h4 {
    font-weight:normal;
  }
  .box {
    background:${({theme}) => theme.box};
    border:1px solid ${({theme}) => theme.boxBorder};
    border-radius:10px;
    box-shadow: 0px 3px 15px ${({theme}) => theme.shadow};
  }
  
  
`