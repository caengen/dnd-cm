import styled from "styled-components";

export const Icon = styled.img`
  height: 2em;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
`;

interface TagProps {
  color: "red" | "aliceblue";
}
export const Tag = styled<TagProps, "span">("span")`
  font-size: .5em;
  line-height: 0;
  position: absolute;
  right: -1px;
  bottom: 7px;
  color: ${p => p.color};
`;
