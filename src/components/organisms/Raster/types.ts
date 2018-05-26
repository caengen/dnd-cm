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
