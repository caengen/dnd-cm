import * as React from 'react';
import styled from 'styled-components';
import logo from "@App/assets/neck-bite.svg";

const StyledHeader = styled.header`
  height: 4rem;
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  align-items: center;
`;

const Logo = styled.img`
  height: 3rem;
  border-radius: 50%;
  padding: 0 1rem;
`;

const ScaryTitle = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Nodesto Caps Condensed";
  text-transform: uppercase;
  font-size: 2.5rem;
  letter-spacing: 1px;
  
  span {
    font-size: 2rem;
    padding: 0 .5rem;
  }
`;

const Header = () => (
  <StyledHeader>
    <Logo src={logo} alt="logo" />
    <ScaryTitle>Curse <span>of</span> Strahd</ScaryTitle>
  </StyledHeader>
);

export default Header;
