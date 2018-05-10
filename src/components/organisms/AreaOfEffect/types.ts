export interface AreaOfEffect2Props {
  columns: number;
  rows: number;
}

export interface AreaOfEffect2State {
  cells: AoECellModel[][];
  spellActive: boolean;
  origin?: AoECellModel;
  target?: AoECellModel;
}

export interface AoECellModel {
  id: string;
  col: number;
  row: number;
  num: number;
  state: AoECellState;
}

export type AoECellState = "normal" | "origin" | "target" | "hit";

export interface AreaOfEffect2CellProps { cell: AoECellModel }
