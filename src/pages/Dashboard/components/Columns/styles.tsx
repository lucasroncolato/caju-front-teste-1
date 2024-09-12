import styled from "styled-components";
const registrationStatusStyles: {
  [key in string]: { background: string; title: string };
} = {
  REVIEW: {
    background: "#FDF8E9",
    title: "#EFC24D",
  },
  APPROVED: {
    background: "#EEEEFD",
    title: "#4242DF",
  },
  REPROVED: {
    background: "#FBEDF6",
    title: "#CE2893",
  },
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;

  @media only screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div<{ status: any }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;

  @media only screen and (max-width: 992px) {
    height: fit-content;
    min-height: 190px;
  }
`;

export const TitleColumn = styled.h3<{ status: any }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
`;

export const ColumnContent = styled.div`
  overflow: auto;
  max-height: 85%;
`;

export const RegistrationModalContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

export const RegistrationModalTitle = styled.h1`
  margin: 0;
`;

export const RegistrationModalEmployeeData = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
  }
`;

export const CloseIcon = styled.span`
  display: flex;
  position: absolute;
  right: 0;
  padding: 3px;
  transition: 0.2s;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: #d9d9d9;
  }
`

