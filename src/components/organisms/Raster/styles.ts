import styled from "styled-components";
import { AoECellState } from "./types";
import Radio from 'material-ui/Radio';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface GridProps {
  columns: number;
  rows: number;
}
export const Grid = styled<GridProps, "div">("div")`
  display: grid;
  padding: .5em;
  height: 100%;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-gap: 2px;
  background-color: #676500;
`;

interface CellProps {
  state: AoECellState;
}
export const Cell = styled<CellProps, 'div'>('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nodesto Caps Condensed";
  font-size: 2em;
  height: 100%;
  cursor: pointer;
  user-select: none;
  background-color: ${p => {
      switch (p.state) {
        case "normal":
          return "#929000";
        case "origin":
          return "blue";
        case "target":
          return "red";
        case "hit":
          return "grey";
      }
    }
  };

  img {
    cursor: pointer;
    user-select: none;
    pointer-events: none;
    height: .7em;
  }
`;


export const Icon = styled.img`
  height: 2em;
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid #dfdb10;
  background-color: yellow;
  padding: .5rem;
  font-family: "Nodesto Caps Condensed";
`;

export const SmallRadio = styled(Radio)`
  font-size: 1em !important;
`;

export const ResultGroupHeader = styled.h2`
  font-size: 1em;
  color: #B5B202;
  margin: 0;
  text-align: right;
  letter-spacing: 0px;
`;

export const ResultGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Result = styled.span`
  font-size: 2em;
  color: #676500;
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
