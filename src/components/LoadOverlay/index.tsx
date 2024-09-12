import * as S from "./styles";

type Props = {
  label: string;
};

const LoadOverlay = (props: Props) => {
  return (
    <S.Overlay>
      <S.Spinner />
      <S.Label role="alert" aria-live="assertive">
        {props.label}
      </S.Label>
    </S.Overlay>
  );
};

export default LoadOverlay;
