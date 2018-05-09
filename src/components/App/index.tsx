import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './style';
import theme from './theme';
import Header from '@App/components/organisms/Header';
import { AreaOfEffect } from '@App/components';
import { Widget } from '@App/components/organisms/Widget';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledApp>
          <Header />
          <p>
            Spell area of effects
          </p>
          <Widget width={480} height={480}>
            <AreaOfEffect columns={10} rows={10} />
          </Widget>
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;
