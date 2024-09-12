
import { useState } from "react";

import * as S from "./styles";
import RegistrationModal from "./RegistrationModal";

import RegistrationCard from "~/pages/Dashboard/components/RegistrationCard";
import { Registration, ColumnProps } from '~/types/types';

const allColumns = [
  { status: 'REVIEW', title: "Pronto para revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

const Columns = (props: ColumnProps) => {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRegistration(undefined);
  };

  return (
    <S.Container>
      {allColumns.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <S.TitleColumn status={column.status}>
              {column.title}
            </S.TitleColumn>
            <S.ColumnContent>
              {props?.registrations?.map((registration) => {
                if (registration.status === column.status) {
                  return (
                    <RegistrationCard
                      column={column.status}
                      registration={registration}
                      key={registration.id}
                      refetchData={props.refetchData}
                      onClick={() => handleCardClick(registration)}
                    />
                  );
                }
              })}
            </S.ColumnContent>
          </S.Column>
        );
      })}
      {isModalOpen && (
        <RegistrationModal
          registration={selectedRegistration}
          onClose={handleCloseModal}
        />
      )}
    </S.Container>
  );
};
export default Columns;
