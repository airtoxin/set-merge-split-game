import styled from "@emotion/styled";

export const Button = styled.button`
  font-size: 2rem;
  width: 10em;
  outline: none;
  padding: 0.5em 1em;
  position: relative;
  background-color: #52bcde;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 3px 0 #3a869e;

  &:active {
    top: 3px;
    box-shadow: none;
  }
`;
