import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledApp } from './style';
import theme from './theme';
import Header from '@App/components/organisms/Header';

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledApp>
          <Header />
          <p>
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
        </StyledApp>
      </ThemeProvider>
    );
  }
}

export default App;
