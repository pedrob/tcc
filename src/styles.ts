import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    //colors
  }
  * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
  }
  body {
      font-family: sans-serif;
      font-size: 14px;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased !important;
      .error {
        box-shadow: 0 -1px 4px var(--error), 0 2px 4px var(--error);
      }
      .errorText {
        color: var(--error);
        margin-top: 4px;
      }
  }
`;