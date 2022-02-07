import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    *,*::before,*::after,h1,h2,h3,h4,h5,h6 {
      margin: 0;
      padding: 0;
    }
    h1,h2,h3,h4,h5,h6 {
      display: inline-block;
    }
    body {
      margin: 0;
      padding: 0;
      width: 100%;
        height: 100vh;
        font-family: 'RocknRoll One', sans-serif;
    }
`;

export default GlobalStyle;
