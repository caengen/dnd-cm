import styled from "styled-components";
import { AoECellState } from "./types";

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
