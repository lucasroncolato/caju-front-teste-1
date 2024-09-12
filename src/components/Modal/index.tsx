import * as S from './styles';

type Props = {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <S.Modal role="dialog" aria-modal="true">
      <S.ModalContent>
        {children}
      </S.ModalContent>
    </S.Modal>
  );
};

export default Modal;