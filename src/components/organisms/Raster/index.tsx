import * as React from "react";
import { RasterProps, RasterState, CellModel, SpellModeTexts, CreatureCell } from "./types";
import RandomCreature from "./RandomCreature";
import { Container, Cell, Grid, Icon, ControlGroup, TopBar, ControlGroupHeader, ResultGroup, ResultGroupHeader, Result, SmallRadio } from "./styles";
import { Bresenham } from "@App/components/organisms/Raster/bresenham";
import { Coord } from "@App/types";
import monsterIconChecked from "@App/assets/radio/orc-head-checked.svg";
import monsterIconUnchecked from "@App/assets/radio/orc-head-unchecked.svg";
import heroIconChecked from "@App/assets/radio/black-knight-helm-checked.svg";
import heroIconUnchecked from "@App/assets/radio/black-knight-helm-unchecked.svg";
import rayIconChecked from "@App/assets/radio/fire-ray-checked.svg";
import rayIconUnchecked from "@App/assets/radio/fire-ray-unchecked.svg";
import ringIconChecked from "@App/assets/radio/fire-ring-checked.svg";
import ringIconUnchecked from "@App/assets/radio/fire-ring-unchecked.svg";
import coneIconChecked from "@App/assets/radio/corner-explosion-checked.svg";
import coneIconUnchecked from "@App/assets/radio/corner-explosion-unchecked.svg";

export class Raster extends React.Component<RasterProps, RasterState> {
  readonly ModeStrings: SpellModeTexts = {
    monster: "Place a Monster",
    hero: "Place a Hero",
    ray: "Drag the Beam",
    explosion: "Drag the Explosion",
    cone: "Drag the Cone"
  };

  constructor(props: RasterProps) {
    super(props);

    this.state = {
      cells: [],
      spellActive: false,
      origin: undefined,
      target: undefined,
      previousHitCells: undefined,
      selectedMode: "monster",
      distance: 0,
      creatures: [],
      nextHero: 1,
      nextMonster: 1
    }
  }

  columns = (row: number): CellModel[] => {
    let columns = [];
    for (let i = 0; i < this.props.columns; i++) {
      columns.push(
        {
          id: `${row}-${i}`,
          col: i,
          row: row,
          state: "normal"
        } as CellModel
      );
    }

    return columns;
  }

  componentWillMount() {
    let initialCells: CellModel[][] = [];
    for (let i = 0; i < this.props.rows; i++) {
      initialCells.push(this.columns(i));
    }
    this.setState({cells: initialCells})
  }

  handleCellClick = (cell: CellModel) => {
    const { selectedMode } = this.state;

    if (selectedMode !== "monster" && selectedMode !== "hero") return;

    let tag = 0;
    if (selectedMode === "monster") {
      tag = this.state.nextMonster;
      this.setState({ nextMonster: tag + 1 });
    } else {
      tag = this.state.nextHero;
      this.setState({ nextHero: tag + 1 });
    }
    const creature = {
      position: {x: cell.col, y: cell.row},
      Element: <RandomCreature type={selectedMode} tag={tag} />
    } as CreatureCell;

    this.setState({
      creatures: [
        ...this.state.creatures,
        creature
      ]
    });
  }

  handleCellMouseDown = (cell: CellModel) => {
    const { selectedMode, cells } = this.state;
    if (selectedMode !== "ray" && selectedMode !== "explosion" && selectedMode != "cone") return;

    const newCell = { ...cell, state: "origin" } as CellModel;
    let newCells = cells.slice();
    newCells[cell.row][cell.col] = newCell;

    this.setState({
      spellActive: true,
      origin: newCell,
      cells: newCells,
      target: undefined,
    })
  }

  handleCellMouseUp = (cell: CellModel) => {
    const { selectedMode } = this.state;
    if (selectedMode !== "ray" && selectedMode !== "explosion" && selectedMode != "cone") return;

    let newCells = this.state.cells.slice();

    if (this.state.origin) {
      const resetOrigin = { ...this.state.origin, state: "normal" } as CellModel;
      newCells[resetOrigin.row][resetOrigin.col] = resetOrigin;
    }

    this.resetHitCells(newCells);

    this.setState({
      spellActive: false,
      origin: undefined,
      cells: newCells,
      distance: 0
    })
  }

  handleCellEnter = (cell: CellModel) => {
    const { target, origin, cells, selectedMode } = this.state;

    if (selectedMode !== "ray" && selectedMode !== "explosion" && selectedMode != "cone") return;
    if (origin && cell.id === origin.id) return;

    const newTarget = { ...cell, state: "target" } as CellModel;
    let newCells = cells.slice();
    newCells[newTarget.row][newTarget.col] = newTarget;
    
    if (target) {
      newCells[target.row][target.col] = {...target, state: "normal"} as CellModel;
    }

    this.resetHitCells(newCells);

    let line: Coord[] = [];
    let distance = 0;
    if (origin && newTarget) {
      if (selectedMode === "ray") {
        line = Bresenham.plotLine({x: origin.col, y: origin.row}, {x: newTarget.col, y: newTarget.row});
        distance = this.calcDistance(line);
        line.pop(); // to not overwrite the red marker on target
      } else if (selectedMode === "explosion") {
        const radius = Math.max(Math.abs(origin.col - newTarget.col), Math.abs(origin.row - newTarget.row));
        line = Bresenham.plotCircle({ x: origin.col, y: origin.row}, radius);
        distance = radius * 5;
      } else if (selectedMode === "cone") {
        const triangle = Bresenham.plotTriangle({x: origin.col, y: origin.row}, {x: newTarget.col, y: newTarget.row})
        line = triangle.points;
        distance = triangle.distance;
      }

      this.setCellsAsHit(newCells, line);
    }
    
    this.setState({
      target: newTarget,
      cells: newCells,
      previousHitCells: line,
      distance: distance
    });
  }

  setCellsAsHit = (cells: CellModel[][], coords: Coord[]) => {
    for (let coord of coords) {
      if (this.outOfBounds(coord)) continue;

      cells[coord.y][coord.x] = {
        ...cells[coord.y][coord.x],
        state: "hit"
      }
    }
  }

  outOfBounds = (coord: Coord) => {
    const { columns, rows } = this.props;
    return coord.x < 0 || coord.y < 0 || coord.x >=  columns || coord.y >= rows;
  }

  calcDistance = (line: Coord[]) => line.length * 5;

  handleModeChange = (e: any) => this.setState({ selectedMode: e.target.value });

  resetHitCells = (cells: CellModel[][]) => {
    const { previousHitCells } = this.state;
    
    for (let coord of previousHitCells || []) {
      if (this.outOfBounds(coord)) continue;

      cells[coord.y][coord.x] = {
        ...cells[coord.y][coord.x],
        state: "normal"
      }
    }

    return cells;
  }

  resetGrid = () => {
    const { cells, target, origin } = this.state;

    let newCells = cells.slice();
    if (target) {
      newCells[target.row][target.col] = {...target, state: "normal" } as CellModel;
    }
    if (origin) {
      newCells[origin.row][origin.col] = {...origin, state: "normal"};
    }

    this.resetHitCells(newCells);

    this.setState({
      target: undefined,
      origin: undefined
    })
  }

  getCreatureInCell = (cell: CellModel) => {
    const creature = this.state.creatures.find(c => c.position.x === cell.col && c.position.y === cell.row);
    return creature ? creature.Element : null;
  }

  renderCell = (cell: CellModel) => (
    <Cell 
      key={cell.id} 
      state={cell.state} 
      onMouseDown={() => this.handleCellMouseDown(cell)} 
      onMouseUp={() => this.handleCellMouseUp(cell)}
      onMouseEnter={() => this.handleCellEnter(cell)}
      onClick={() => this.handleCellClick(cell)}
    >
    {this.getCreatureInCell(cell)}
    </Cell>
  );

  renderRow = (row: CellModel[]) => row.map(this.renderCell);
    
  render() {
    const { rows, columns } = this.props;
    const { cells, selectedMode } = this.state;

    return (
      <Container>
        <TopBar>
          <ControlGroup>
            <ControlGroupHeader>
              {this.ModeStrings[selectedMode]}
            </ControlGroupHeader>
            <div>
              <SmallRadio
                checked={this.state.selectedMode === "monster"}
                onChange={this.handleModeChange}
                value="monster"
                name="mode-radio"
                aria-label="Monster"
                icon={<Icon src={monsterIconUnchecked} alt="monster icon" />}
                checkedIcon={<Icon src={monsterIconChecked} alt="monster icon checked" />}
              />
              <SmallRadio
                checked={this.state.selectedMode === "hero"}
                onChange={this.handleModeChange}
                value="hero"
                name="mode-radio"
                aria-label="Hero"
                icon={<Icon src={heroIconUnchecked} alt="hero icon" />}
                checkedIcon={<Icon src={heroIconChecked} alt="hero icon checked" />}
              />
              <SmallRadio
                checked={this.state.selectedMode === "ray"}
                onChange={this.handleModeChange}
                value="ray"
                name="mode-radio"
                aria-label="Ray"
                icon={<Icon src={rayIconUnchecked} alt="spell ray icon" />}
                checkedIcon={<Icon src={rayIconChecked} alt="spell ray icon checked" />}
              />
              <SmallRadio
                checked={this.state.selectedMode === "explosion"}
                onChange={this.handleModeChange}
                value="explosion"
                name="mode-radio"
                aria-label="Explosion"
                icon={<Icon src={ringIconUnchecked} alt="spell explosion icon" />}
                checkedIcon={<Icon src={ringIconChecked} alt="spell explosion icon checked" />}
              />
              <SmallRadio
                checked={this.state.selectedMode === "cone"}
                onChange={this.handleModeChange}
                value="cone"
                name="mode-radio"
                aria-label="Cone"
                icon={<Icon src={coneIconUnchecked} alt="spell cone icon" />}
                checkedIcon={<Icon src={coneIconChecked} alt="spell cone icon checked" />}
              />
            </div>
          </ControlGroup>
          <ResultGroup>
            <ResultGroupHeader>
              Distance
            </ResultGroupHeader>
            <Result>{this.state.distance} feet</Result>
          </ResultGroup>
        </TopBar>
        <Grid columns={columns} rows={rows} onMouseLeave={this.resetGrid}>
          {cells.map(this.renderRow)}
        </Grid>
      </Container>
    );
  }
}
