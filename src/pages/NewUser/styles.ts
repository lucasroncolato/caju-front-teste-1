import styled from "styled-components";
import { _IconButtonStyled } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
`;

export const Card = styled.div`
  border: 2px solid #f0f0f0;
  width: 500px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 17px;

  @media only screen and (max-width: 992px) {
    width: 90%;
    border: 0;
    padding: 0;
  }
 
  ${_IconButtonStyled} {
    align-items: flex-start;
  }

  ${Button}{
    align-self: flex-end;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 28px;
  margin: 0;
  margin-left: 16px;

  @media only screen and (max-width: 992px) {
    font-size: 20px;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
