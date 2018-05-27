import * as React from 'react';
import { ResultGroup, ResultGroupHeader, Result } from './styles';

export interface DistanceDisplayProps {
  distance: number;
}

export default class DistanceDisplay extends React.PureComponent<DistanceDisplayProps, any> {
  render() {
    return (
      <ResultGroup>
        <ResultGroupHeader>
          Distance
        </ResultGroupHeader>
        <Result>{this.props.distance} feet</Result>
      </ResultGroup>
    );
  }
}
