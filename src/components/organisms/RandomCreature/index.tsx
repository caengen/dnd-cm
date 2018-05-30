import * as React from 'react';
import { Icon } from './styles';

import beholder from "@App/assets/monsters/behold.svg";
import femaleVampire from "@App/assets/monsters/female-vampire.svg";
import gargoyle from "@App/assets/monsters/gargoyle.svg";
import goblin from "@App/assets/monsters/goblin-head.svg";
import orc from "@App/assets/monsters/orc-head.svg";
import werewolf from "@App/assets/monsters/werewolf.svg";
const monsters = [beholder, femaleVampire, gargoyle, goblin, orc, werewolf];

import knight from "@App/assets/heroes/black-knight-helm.svg";
import barbarian from "@App/assets/heroes/barbarian.svg";
import monk from "@App/assets/heroes/monk-face.svg";
import robe from "@App/assets/heroes/robe.svg";
import swordman from "@App/assets/heroes/swordman.svg";
import swordwoman from "@App/assets/heroes/swordwoman.svg";
import { Container, Tag } from './styles';
import { DragSource } from 'react-dnd';
import { DropType } from '@App/types';
const heroes = [ knight, barbarian, monk, robe, swordman, swordwoman ];

export interface RandomCreatureOwnProps {
  type: "hero" | "monster";
  tag?: number;
}

interface RandomCreatureSourceProps {
  isDragging?: boolean;
  connectDragSource?: any;
}

interface RandomCreatureState {
  icon?: string;
}

type RandomCreatureProps = RandomCreatureOwnProps & RandomCreatureSourceProps;

const randomCreatureSource = {
  beginDrag: (props: RandomCreatureSourceProps) => ({})
}

const randomCreatureSourceCollector = (connect: any, monitor: any): any => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(DropType.Creature, randomCreatureSource, randomCreatureSourceCollector)
export class RandomCreature extends React.Component<RandomCreatureProps, RandomCreatureState> {
  constructor(props: RandomCreatureProps) {
    super(props);

    this.state = {
      icon: this.createIcon()
    }
  }
  createIcon = () => {
    const { type } = this.props;

    if (type === "monster") {
      return monsters[Math.floor(Math.random() * monsters.length)];
    } else {
      return heroes[Math.floor(Math.random() * heroes.length)];
    }
  }

  render() {
    const { type, tag, connectDragSource } = this.props;
    const { icon } = this.state;
    
    const color = type === "monster" ? "red" : "aliceblue";

    return connectDragSource(
      <div>
        <Container>
          <Tag color={color}>{tag}</Tag>
          <Icon src={icon} alt={`creature icon`} />
        </Container>
      </div>
    );
  }
}
