import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.250s ease-in;
  }
  .box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  .box::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  .box::-webkit-scrollbar-thumb {
    background-color: #f1950c;
  }
  a {
    color: ${({ theme }) => theme.link};
  }

  p {
    color: ${({ theme }) => theme.text};
  }

  h1, h2, h3, h4,h5 {
    color: ${({ theme }) => theme.heading};
  }
  h3 {
    font-size:1.6rem;
  }
  h4 {
    font-weight:normal;
  }
  .box {
    background:${({ theme }) => theme.box};
    border:1px solid ${({ theme }) => theme.boxBorder};
  
    box-shadow: 0px 3px 15px ${({ theme }) => theme.shadow};
  }
 
  .theme__search {
    &__autosuggest {
      border:1px solid ${({ theme }) => theme.boxBorder};
      display:none;
      &.active {    
        max-height: 17.5em;
        overflow-y: scroll;
        display:block;}

      border-top:none;
      &_item{
        &:nth-of-type(even) {
          background:${({ theme }) => theme.accent}
        
        }
        &:hover {
          background:${({ theme }) => theme.accenthover};
        
      }
    }
    }
    &__input input{
      border:1px solid ${({ theme }) => theme.boxBorder};
    }
  }

  table {
    width: 100%;
    background-color: ${({ theme }) => theme.accenthover};
  
   thead {
    
   
    tr {
      width:100%;
    }
  }
   thead tr:after {
    content: '';
    overflow-y: scroll;
    visibility: hidden;
  }
   

  
  thead tr th {
    position: sticky; top: 0;
    color:${({ theme }) => theme.text};
    line-height:2em;
    text-align:left;
    background: ${({ theme }) => theme.accent};
    span .toggler {
      position:absolute;
      right:10px;
    }
  }
}
`