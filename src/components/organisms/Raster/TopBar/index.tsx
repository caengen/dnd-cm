import * as React from 'react';
import { StyledTopBar } from './styles';

export interface TopBarProps {
  children: JSX.Element[];
}

export default class TopBar extends React.PureComponent<TopBarProps, any> {
  render() {
    return (
      <StyledTopBar>
        {this.props.children}
      </StyledTopBar>
    );
  }
}
