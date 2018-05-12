import styled from "styled-components";
import { AoECellState } from "./types";

export const Container = styled.div`
  height: 100%;
`;

interface GridProps {
  columns: number;
  rows: number;
}
export const Grid = styled<GridProps, "div">("div")`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-gap: 3px;
`;

interface CellProps {
  state: AoECellState;
}
export const Cell = styled<CellProps, 'div'>('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nodesto Caps Condensed";
  font-size: 2rem;
  height: 100%;
  cursor: pointer;
  user-select: none;
  background-color: ${p => {
      switch (p.state) {
        case "normal":
          return "lightgrey";
        case "origin":
          return "blue";
        case "target":
          return "red";
        case "hit":
          return "grey";
      }
    }
  };
`;


export const Icon = styled.img`
  height: 2em;
`;

export const Label = styled.span`

`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  border-bottom: 1px solid black;
`;

export const Control = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
