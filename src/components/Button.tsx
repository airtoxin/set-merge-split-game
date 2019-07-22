import styled from "@emotion/styled";

export const Button = styled.button<{
  color?: "primary" | "secondary";
}>`
  font-size: 2rem;
  width: 10em;
  outline: none;
  padding: 0.5em 1em;
  position: relative;
  background-color: ${({ color }) =>
    color === "primary"
      ? "#52bcde"
      : color === "secondary"
      ? "#de5271"
      : "none"};
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 3px 0
    ${({ color }) =>
      color === "primary"
        ? "#3a869e"
        : color === "secondary"
        ? "#99394e"
        : "none"};

  &:active {
    top: 3px;
    box-shadow: none;
  }
  &:disabled {
    background-color: #52bcde2e;
    color: #fff;
    box-shadow: none;
  }
`;
