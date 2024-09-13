import styled from "styled-components";

const Button = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 8px 32px;
  background-color: #979797;
  cursor: pointer;
  height: 40px;
  color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    filter: brightness(85%);
  }
`;

export const ButtonSmall = styled.button<{
  bgcolor?: string;
  color?: string;
}>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    filter: brightness(85%);
  }
`;


export default Button;
