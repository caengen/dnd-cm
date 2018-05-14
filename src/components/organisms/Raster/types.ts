import { Coord } from "@App/types";

export interface RasterProps {
  columns: number;
  rows: number;
}

export interface RasterState {
  cells: CellModel[][];
  spellActive: boolean;
  origin?: CellModel;
  target?: CellModel;
  plotLine?: Coord[];
  selectedMode: SpellMode;
  distance: number;
}

export type SpellMode = "monster" | "hero" | "ray" | "explosion" | "cone";
export type SpellModeTexts = {
  [key in SpellMode]: string;
}

export interface CellModel {
  id: string;
  col: number;
  row: number;
  num: number;
  state: AoECellState;
}

export type AoECellState = "normal" | "origin" | "target" | "hit";

export interface AreaOfEffect2CellProps { cell: CellModel }
