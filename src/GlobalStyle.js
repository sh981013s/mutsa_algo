import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
    *,*::before,*::after,h1,h2,h3,h4,h5,h6 {
      margin: 0;
      padding: 0;
    }
/*    h1,h2,h3,h4,h5,h6 {
      display: inline-block;
    }*/
    body {
      margin: 0;
      padding: 0;
      width: 100%;
        height: 100vh;
        font-family: 'RocknRoll One', sans-serif;
    }

    ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 7px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .5);
        box-shadow: 0 0 1px rgba(255, 255, 255, .5);
    }
`;

export default GlobalStyle;
