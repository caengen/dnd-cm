import { Coord, SpellMode } from "@App/types";

export interface RasterProps {
  columns: number;
  rows: number;
}

export interface RasterState {
  cells: CellModel[][];
  spellActive: boolean;
  origin?: CellModel;
  target?: CellModel;
  previousHitCells?: Coord[];
  selectedMode: SpellMode;
  distance: number;
  creatures: CreatureCell[];
  nextHero: number;
  nextMonster: number;
}

export interface CreatureCell {
  Element: JSX.Element;
  position: Coord;
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
