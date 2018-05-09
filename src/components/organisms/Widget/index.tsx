import * as React from "react";
import styled from "styled-components";

interface WidgetProps {
  width: number;
  height: number;
  children?: JSX.Element;
}

const Container = styled<WidgetProps, "div">("div")`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  border-bottom: 0 none;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
  margin: 0 auto;
`;

export class Widget extends React.PureComponent<WidgetProps> {
  render() {
    const {width, height, children} = this.props;
    return (
      <Container width={width} height={height}>
        {children}
      </Container>
    );
  }
}
