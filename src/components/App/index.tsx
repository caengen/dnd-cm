import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './style';
import theme from './theme';
import Header from '@App/components/organisms/Header';
import { Raster } from '@App/components/organisms/Raster';
import { Widget } from '@App/components/organisms/Widget';

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
            <Raster columns={20} rows={20} />
          </Widget>
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;
