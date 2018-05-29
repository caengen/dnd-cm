import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { StyledCell } from './styles';
import { AoECellState } from '@App/types';
import { CellModel } from '@App/types/CellModel';
import { DropType } from "@App/types";

export interface CellProps {
  cellState: AoECellState;
  model: CellModel;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: () => void;
  onClick: () => void;
}

const cellTarget = {
  canDrop(props: any, monitor: any) {
    // You can disallow drop based on props or item
    //const item = monitor.getItem();
    //return canMakeChessMove(item.fromPosition, props.position);
  },
  drop(props: any, monitor: any, component: any) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    //const item = monitor.getItem();

    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position);
  }
}

const dropTargetConnect = (connect: any, monitor: any) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

@DropTarget(DropType.Creature, cellTarget, dropTargetConnect)
export default class Cell extends React.PureComponent<CellProps, any> {
  render() {
    return (
      <div>
        <StyledCell {...this.props} />
      </div>
    );
  }
}
