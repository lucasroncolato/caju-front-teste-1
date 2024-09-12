import { useState } from "react";
import { toast } from 'react-toastify';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import * as S from "./styles";

import { ButtonSmall } from "~/components/Buttons";
import ConfirmationModal from '~/components/ConfirmationModal';
import { updateRegistration, deleteRegistration } from '~/services/registrations';
import { Registration, RegistrationCardProps } from '~/types/types';

const RegistrationCard = ({ column, registration, refetchData, onClick }: RegistrationCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  
  const handleCardStatus = async (data: Registration, status: string) => {
    await updateRegistration(data, status);
    refetchData();

    try {
      await updateRegistration(data, status);
      refetchData();
      toast.success('Status atualizado com sucesso');
    } catch (error) {
      toast.error('Não foi possível atualizar o status');
    }
  };

  const handleCardDelete = async (id: string) => {
    await deleteRegistration(id);
    refetchData();
  };

  const showConfirmationModal = (event: React.MouseEvent, action: () => void) => {
    event.stopPropagation();

    setModalAction(() => action);
    setShowModal(true);
  };

  const handleConfirm = () => {
    modalAction();
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <ConfirmationModal
          message="Tem certeza que quer atualizar este card?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <S.Card role="region" aria-label="Card de colaborador" onClick={onClick}>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{registration.employeeName}</h3>
        </S.IconAndText>
        
        <S.IconAndText>
          <HiOutlineMail />
          <p>{registration.email}</p>
        </S.IconAndText>

        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{registration.admissionDate}</span>
        </S.IconAndText>

        <S.Actions>
          {column === "REVIEW" ? (
            <>
              <ButtonSmall 
                bgcolor="#9be59b" 
                onClick={(event) => showConfirmationModal(event, () => handleCardStatus(registration, "APPROVED"))}
                aria-label="Aprovar colaborador"
              >
                Aprovar
              </ButtonSmall>
              <ButtonSmall 
                bgcolor="#ff919a" 
                onClick={(event) => showConfirmationModal(event, () => handleCardStatus(registration, "REPROVED"))}
                aria-label="Reprovar colaborador"
              >
                Reprovar
              </ButtonSmall>
            </>
          ) : (
            <ButtonSmall 
              bgcolor="#ff8858" 
              onClick={(event) => showConfirmationModal(event, () => handleCardStatus(registration, "REVIEW"))}
              aria-label="Revisar novamente"
            >
              Revisar novamente
            </ButtonSmall>
          )}

          <S.TrashIcon>
          <HiOutlineTrash 
              onClick={(event) => showConfirmationModal(event, () => handleCardDelete(registration.id))}
              aria-label="Deletar colaborador"
            />
          </S.TrashIcon>
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
