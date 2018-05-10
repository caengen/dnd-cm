import * as React from "react";
import { AreaOfEffect2Props, AreaOfEffect2State, AoECellModel } from "./types";
import { Container, Cell, Grid } from "./styles";

export class AreaOfEffect2 extends React.Component<AreaOfEffect2Props, AreaOfEffect2State> {
  constructor(props: AreaOfEffect2Props) {
    super(props);

    this.state = {
      cells: [],
      spellActive: false,
      origin: undefined,
      target: undefined
    }
  }

  columns = (row: number): AoECellModel[] => {
    let columns = [];
    for (let i = 0; i < this.props.columns; i++) {
      columns.push(
        {
          id: `${row}-${i}`,
          col: i,
          row: row,
          state: "normal"
        } as AoECellModel
      );
    }

    return columns;
  }

  componentWillMount() {
    let initialCells: AoECellModel[][] = [];
    for (let i = 0; i < this.props.rows; i++) {
      initialCells.push(this.columns(i));
    }
    this.setState({cells: initialCells})
  }

  onCellMouseDown = (cell: AoECellModel) => {
    const { cells } = this.state;

    const newCell = { ...cell, state: "origin" } as AoECellModel;
    let newCells = cells.slice();
    newCells[cell.row][cell.col] = newCell;

    this.setState({
      spellActive: true,
      origin: newCell,
      cells: newCells,
      target: undefined
    })
  }

  onCellMouseUp = (cell: AoECellModel) => {
    let newCells = this.state.cells.slice();

    if (this.state.origin) {
      const resetOrigin = { ...this.state.origin, state: "normal" } as AoECellModel;
      newCells[resetOrigin.row][resetOrigin.col] = resetOrigin;
    }

    this.setState({
      spellActive: false,
      origin: undefined,
      cells: newCells
    })
  }

  onCellEnter = (cell: AoECellModel) => {
    console.log("onCellEnter");
    const { target, origin, cells } = this.state;
    
    if (origin && cell.id === origin.id) return;

    const newTarget = { ...cell, state: "target" } as AoECellModel;
    let newCells = cells.slice();
    newCells[newTarget.row][newTarget.col] = newTarget;
    
    if (target) {
      newCells[target.row][target.col] = {...target, state: "normal"} as AoECellModel;
    }
    
    console.log("old state");
    console.log(this.state);
    this.setState({
      target: newTarget,
      cells: newCells
    });
    console.log("new state");
    console.log(this.state);
  }

  resetGrid = () => {
    const { cells, target, origin } = this.state;

    let newCells = cells.slice();
    if (target) {
      newCells[target.row][target.col] = {...target, state: "normal" } as AoECellModel;
    }
    if (origin) {
      newCells[origin.row][origin.col] = {...origin, state: "normal"};
    }

    this.setState({
      target: undefined,
      origin: undefined
    })
  }

  renderCell = (cell: AoECellModel) => (
    <Cell 
      key={cell.id} 
      state={cell.state} 
      onMouseDown={() => this.onCellMouseDown(cell)} 
      onMouseUp={() => this.onCellMouseUp(cell)}
      onMouseEnter={() => this.onCellEnter(cell)}
    />
  );

  renderRow = (row: AoECellModel[]) => row.map(this.renderCell);
    
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
