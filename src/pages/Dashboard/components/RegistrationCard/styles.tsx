import styled from "styled-components";

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  transition: 0.2s;
  h3,
  p {
    margin: 0;
  }
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0,0,0,0.32), 0 1px 2px rgba(0,0,0,0.44);
  }
`;

export const IconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 4px;

  svg {
    cursor: pointer;
  }
`;

export const TrashIcon = styled.span`
  margin-left: auto;
  display: flex;
  padding: 3px;
  transition: 0.2s;
  border-radius: 50%;

  &:hover {
    background: #d9d9d9;
  }
`
