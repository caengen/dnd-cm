import styled from 'styled-components';

export const StyledApp = styled.div`
  text-align: center;
  & > p {
    font-size: large;
  }
  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`;
