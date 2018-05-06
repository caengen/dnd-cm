import { injectGlobal } from 'styled-components';
/*import nodestoCapsCondensed from './assets/fonts/NodestoCapsCondensed.otf';
import nodestoCapsCondensedBold from './assets/fonts/NodestoCapsCondensedBold.otf';
import nodestoCapsCondensedItalic from './assets/fonts/NodestoCapsCondensedItalic.otf';
import nodestoCapsCondensedBoldItalic from './assets/fonts/NodestoCapsCondensedBoldItalic.otf';
*/
// tslint:disable-next-line:no-unused-expression
injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  @font-face {
    font-family: "Nodesto Caps Condensed";
    src: url(${require("./assets/fonts/NodestoCapsCondensed.otf")}) format("opentype");
  }
  @font-face {
    font-family: "Nodesto Caps Condensed Bold";
    src: url(${require("./assets/fonts/NodestoCapsCondensed.otf")}) format("opentype");
  }
  @font-face {
    font-family: "Nodesto Caps Condensed Italic";
    src: url(${require("./assets/fonts/NodestoCapsCondensed.otf")}) format("opentype");
  }
  @font-face {
    font-family: "Nodesto Caps Condensed Bold Italic";
    src: url(${require("./assets/fonts/NodestoCapsCondensed.otf")}) format("opentype");
  }
`;
