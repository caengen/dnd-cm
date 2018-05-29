import { Coord, SpellMode } from "@App/types";
import { CellModel } from "@App/types/CellModel";

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

export interface AreaOfEffect2CellProps { cell: CellModel }
