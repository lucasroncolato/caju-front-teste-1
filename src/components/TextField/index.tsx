import { InputHTMLAttributes } from "react";

import * as S from "./styles";

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {
  const { id, label, error, ...inputProps } = props;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <S.Container>
      {label && <label htmlFor={id}>{label}</label>}
      <S.Input
        id={id}
        aria-describedby={errorId}
        aria-invalid={!!error}
        {...inputProps}
      />
      {error && (
        <S.ErrorLabel id={errorId} role="alert">
          {error}
        </S.ErrorLabel>
      )}
    </S.Container>
  );
};

export default TextField;
