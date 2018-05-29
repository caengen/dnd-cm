import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface GridProps {
  columns: number;
  rows: number;
}
export const Grid = styled<GridProps, "div">("div")`
  display: grid;
  padding: .5em;
  height: 100%;
  grid-template-columns: repeat(${p => p.columns}, 1fr);
  grid-template-rows: repeat(${p => p.rows}, 1fr);
  grid-gap: 2px;
  background-color: #676500;
`;
