import * as S from "./styles";
import { HiOutlineX } from "react-icons/hi";

import Modal from "~/components/Modal";

import { RegistrationModalProps } from "~/types/types";
import { applyCPFMask } from "~/utils/cpf";

const RegistrationModal = ({ registration, onClose}: RegistrationModalProps) => {
  return (
    <Modal>
      <S.RegistrationModalContent>
        <S.CloseIcon>
          <HiOutlineX onClick={() => onClose()} aria-label="Deletar colaborador"/>
        </S.CloseIcon>

        <S.RegistrationModalTitle>Dados do Colaborador</S.RegistrationModalTitle>
        <S.RegistrationModalEmployeeData>
          <label htmlFor="employeeName">Nome</label>
          <span id="employeeName">{registration?.employeeName}</span>
        </S.RegistrationModalEmployeeData>

        <S.RegistrationModalEmployeeData>
          <label htmlFor="email">Email</label>
          <span id="email">{registration?.email}</span>
        </S.RegistrationModalEmployeeData>

        <S.RegistrationModalEmployeeData>
          <label htmlFor="cpf">CPF</label>
          <span id="cpf">{applyCPFMask(registration?.cpf)}</span>
        </S.RegistrationModalEmployeeData>

        <S.RegistrationModalEmployeeData>
          <label htmlFor="admissionDate">Data de admissão</label>
          <span id="admissionDate">{registration?.admissionDate}</span>
        </S.RegistrationModalEmployeeData>
      </S.RegistrationModalContent>
    </Modal>
  );
};
export default RegistrationModal;
