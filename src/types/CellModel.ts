import { AoECellState } from "@App/types";

export interface CellModel {
  id: string;
  col: number;
  row: number;
  num: number;
  state: AoECellState;
}
