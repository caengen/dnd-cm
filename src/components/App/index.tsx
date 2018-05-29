import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './style';
import theme from './theme';
import Header from '@App/components/organisms/Header';
import { Raster, Widget } from '@App/components';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


@DragDropContext(HTML5Backend)
class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledApp>
          <Header />
          <p>
            Spell area of effect
          </p>
          <Widget width={"480px"} height={"480px"}>
            <Raster columns={16} rows={16} />
          </Widget>
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;
