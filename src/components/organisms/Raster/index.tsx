import * as React from "react";
import { RasterProps, RasterState, CellModel } from "./types";
import { Container, Cell, Grid } from "./styles";

export class Raster extends React.Component<RasterProps, RasterState> {
  constructor(props: RasterProps) {
    super(props);

    this.state = {
      cells: [],
      spellActive: false,
      origin: undefined,
      target: undefined
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

  onCellMouseDown = (cell: CellModel) => {
    const { cells } = this.state;

    const newCell = { ...cell, state: "origin" } as CellModel;
    let newCells = cells.slice();
    newCells[cell.row][cell.col] = newCell;

    this.setState({
      spellActive: true,
      origin: newCell,
      cells: newCells,
      target: undefined
    })
  }

  onCellMouseUp = (cell: CellModel) => {
    let newCells = this.state.cells.slice();

    if (this.state.origin) {
      const resetOrigin = { ...this.state.origin, state: "normal" } as CellModel;
      newCells[resetOrigin.row][resetOrigin.col] = resetOrigin;
    }

    this.setState({
      spellActive: false,
      origin: undefined,
      cells: newCells
    })
  }

  onCellEnter = (cell: CellModel) => {
    console.log("onCellEnter");
    const { target, origin, cells } = this.state;
    
    if (origin && cell.id === origin.id) return;

    const newTarget = { ...cell, state: "target" } as CellModel;
    let newCells = cells.slice();
    newCells[newTarget.row][newTarget.col] = newTarget;
    
    if (target) {
      newCells[target.row][target.col] = {...target, state: "normal"} as CellModel;
    }
    
    this.setState({
      target: newTarget,
      cells: newCells
    });
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

    this.setState({
      target: undefined,
      origin: undefined
    })
  }

  renderCell = (cell: CellModel) => (
    <Cell 
      key={cell.id} 
      state={cell.state} 
      onMouseDown={() => this.onCellMouseDown(cell)} 
      onMouseUp={() => this.onCellMouseUp(cell)}
      onMouseEnter={() => this.onCellEnter(cell)}
    />
  );

  renderRow = (row: CellModel[]) => row.map(this.renderCell);
    
  render() {
    const {cells} = this.state;

    return (
      <Container>
        <Grid columns={8} rows={8} onMouseLeave={this.resetGrid}>
          {cells.map(this.renderRow)}
        </Grid>
      </Container>
    );
  }
}
