import * as React from 'react';
import { SpellMode, SpellModeTexts } from '@App/types';
import { Icon, ControlGroup, ControlGroupHeader, SmallRadio } from "./styles";
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

export interface RasterControlsProps {
  mode: SpellMode;
  onModeChange: (e: any) => void;
}

export default class RasterControls extends React.PureComponent<RasterControlsProps, any> {
  readonly ModeStrings: SpellModeTexts = {
    monster: "Place a Monster",
    hero: "Place a Hero",
    ray: "Drag the Beam",
    explosion: "Drag the Explosion",
    cone: "Drag the Cone"
  };
  
  render() {
    const { mode, onModeChange } = this.props;
    return (
        <ControlGroup>
          <ControlGroupHeader>
            {this.ModeStrings[mode]}
          </ControlGroupHeader>
          <div>
            <SmallRadio
              checked={mode === "monster"}
              onChange={onModeChange}
              value="monster"
              name="mode-radio"
              aria-label="Monster"
              icon={<Icon src={monsterIconUnchecked} alt="monster icon" />}
              checkedIcon={<Icon src={monsterIconChecked} alt="monster icon checked" />}
            />
            <SmallRadio
              checked={mode === "hero"}
              onChange={onModeChange}
              value="hero"
              name="mode-radio"
              aria-label="Hero"
              icon={<Icon src={heroIconUnchecked} alt="hero icon" />}
              checkedIcon={<Icon src={heroIconChecked} alt="hero icon checked" />}
            />
            <SmallRadio
              checked={mode === "ray"}
              onChange={onModeChange}
              value="ray"
              name="mode-radio"
              aria-label="Ray"
              icon={<Icon src={rayIconUnchecked} alt="spell ray icon" />}
              checkedIcon={<Icon src={rayIconChecked} alt="spell ray icon checked" />}
            />
            <SmallRadio
              checked={mode === "explosion"}
              onChange={onModeChange}
              value="explosion"
              name="mode-radio"
              aria-label="Explosion"
              icon={<Icon src={ringIconUnchecked} alt="spell explosion icon" />}
              checkedIcon={<Icon src={ringIconChecked} alt="spell explosion icon checked" />}
            />
            <SmallRadio
              checked={mode === "cone"}
              onChange={onModeChange}
              value="cone"
              name="mode-radio"
              aria-label="Cone"
              icon={<Icon src={coneIconUnchecked} alt="spell cone icon" />}
              checkedIcon={<Icon src={coneIconChecked} alt="spell cone icon checked" />}
            />
          </div>
        </ControlGroup>
    );
  }
}
