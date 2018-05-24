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
import styled from 'styled-components';
const heroes = [ knight, barbarian, monk, robe, swordman, swordwoman ];

export interface RandomCreatureProps {
  type: "hero" | "monster";
  tag?: number;
}

const Container = styled.div`
  display: flex;
  position: relative;
`;

interface TagProps {
  color: "red" | "aliceblue";
}
const Tag = styled<TagProps, "span">("span")`
  font-size: .5em;
  line-height: 0;
  position: absolute;
  right: -1px;
  bottom: 7px;
  color: ${p => p.color};
`;

export default class RandomCreature extends React.Component<RandomCreatureProps, any> {
  render() {
    const { type, tag } = this.props;

    let icon = "";
    if (type === "monster") {
      icon = monsters[Math.floor(Math.random() * monsters.length)];
    } else {
      icon = heroes[Math.floor(Math.random() * heroes.length)];
    }
    const color = type === "monster" ? "red" : "aliceblue";
    return (
      <Container>
        <Tag color={color}>{tag}</Tag>
        <Icon src={icon} alt={`creature icon`} />
      </Container>
    );
  }
}
