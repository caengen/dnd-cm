import * as React from "react";
import styled from "styled-components";
import {omit} from "lodash";

interface AreaOfEffectProps {
  columns: number;
  rows: number;
}
interface AreaOfEffectState {
  selectedCells: IDictionary<AoECell>;
  lastGivenNumber: number;
}

interface IDictionary<T> {
  [index: string]: T;
}
type AoECell = {
  column: number;
  row: number;
  num: number;
}

const Container = styled.div`
  height: 100%;
`;

interface GridProps {
  columns: number;
  rows: number;
}
const Grid = styled<GridProps, "div">("div")`
  display: grid;
  height: inherit;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-gap: 3px;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Nodesto Caps Condensed";
  font-size: 2rem;
  height: 100%;
  cursor: pointer;
  background-color: lightgrey;
  &:hover {
    background-color: grey;
  }
`;

export class AreaOfEffect extends React.PureComponent<AreaOfEffectProps, AreaOfEffectState> {
  constructor(props: AreaOfEffectProps) {
    super(props);

    this.state = {
      selectedCells: {},
      lastGivenNumber: 0
    };
  }

  cellKey = (col: number, row: number) => `${col}-${row}`;

  isSelected = (col: number, row: number) => {
    return this.state.selectedCells[this.cellKey(col, row)] !== undefined;
  }

  toggleSelectedCell = (col: number, row: number) => {
    if (this.isSelected(col, row)) {
      this.setState({
        selectedCells: omit(this.state.selectedCells, this.cellKey(col, row))
      });
      //this.setState({selectedCells: filter(this.state.selectedCells, (cell: AoECell) => cell.column === col && cell.row === row )});
    } else {
      const newNumber = this.state.lastGivenNumber + 1;
      let newSelectedCell = {} as IDictionary<AoECell>;
      newSelectedCell[this.cellKey(col, row)] = {
        column: col,
        row: row,
        num: newNumber
      } as AoECell;
      this.setState({
        lastGivenNumber: newNumber,
        selectedCells: {
          ...this.state.selectedCells,
          ...newSelectedCell
        }
      });
    }
  }

  cells = (columns: number, rows: number) => {
    let cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        cells.push(
          // tslint:disable-next-line:jsx-no-lambda
          <Cell key={`${i}-${j}`} onClick={() => this.toggleSelectedCell(i, j)}>
            {this.isSelected(i, j) && (
              this.state.selectedCells[this.cellKey(i, j)].num
              )
            }
          </Cell>
        );
      }
    }

    return cells;
  }

  render() {
    const {columns, rows} = this.props;

    return (
      <Container>
        <Grid columns={columns} rows={rows}>
          {this.cells(columns, rows)}
        </Grid>
      </Container>
    );
  }
}
