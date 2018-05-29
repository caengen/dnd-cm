import styled from "styled-components";
import { AoECellState } from "@App/types";

interface CellProps {
  cellState: AoECellState;
}
export const StyledCell = styled<CellProps, 'div'>('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nodesto Caps Condensed";
  font-size: 2em;
  height: 100%;
  cursor: pointer;
  user-select: none;
  background-color: ${p => {
      switch (p.cellState) {
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
