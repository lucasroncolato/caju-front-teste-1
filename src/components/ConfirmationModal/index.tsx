import { ButtonSmall } from '~/components/Buttons';

import * as S from "./styles";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal = ({ message, onConfirm, onCancel }: Props) => {
  return (
    <S.Modal role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" aria-modal="true">
      <S.ModalContent>
        <S.Title id="modal-title">Confirmação</S.Title>
        <S.Text id="modal-description">{message}</S.Text>

        <S.Actions>
          <ButtonSmall
            bgcolor="#9be59b"
            onClick={() => onConfirm()}
            aria-label="Confirmar ação"
          >
            Confirmar
          </ButtonSmall>
          <ButtonSmall
            bgcolor="#ff919a"
            onClick={() => onCancel()}
            aria-label="Cancelar ação"
          >
            Cancelar
          </ButtonSmall>
        </S.Actions>
      </S.ModalContent>
    </S.Modal>
  );
};

export default ConfirmationModal;