import styled from "styled-components";
import Radio from "material-ui/Radio";

export const SmallRadio = styled(Radio)`
  font-size: 1em !important;
`;

export const Icon = styled.img`
  height: 2em;
`;

export const ControlGroupHeader = styled.h2`
  font-size: 1em;
  color: #B5B202;
  margin: 0;
  text-align: left;
  font-family: "Nodesto Caps Condensed";
  letter-spacing: 0px;
`;

export const ControlGroup = styled.div`
  &>span {
    font-size: 1em;
  }
`;

export const Control = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
