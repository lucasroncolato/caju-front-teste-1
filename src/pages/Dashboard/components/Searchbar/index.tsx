import { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import * as S from "./styles";

import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import { isValidCPF, applyCPFMask, removeCPFMask } from "~/utils/cpf";
import { SearchBarProps } from "~/types/types";

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, refetchData }: SearchBarProps) => {
  const [triggeredSearch, setTriggeredSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

  const goToNewAdmissionPage = () => navigate(routes.newUser);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = event.target.value;
    const maskedValue = applyCPFMask(cpf);

    setSearchValue(maskedValue);

    if (maskedValue.length < 14) {
      if (triggeredSearch && maskedValue.length === 0) {
        refetchData();
        setTriggeredSearch(false);
      }
    }
    else {
      setTriggeredSearch(true);

      if (isValidCPF(maskedValue)) {
        onSearch(removeCPFMask(cpf));
      } else {
        toast.error('CPF inválido.');
      }
    }
  };

  const handleRefetchButton = () => {
    setSearchValue('');
    refetchData();
    setTriggeredSearch(false);
  }

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        value={searchValue}
        onChange={handleInputChange}
        maxLength={14}
        aria-label="Campo de CPF"
        aria-invalid={!isValidCPF(searchValue)}
      />

      <S.Actions>
        <IconButton aria-label="Carregar dados">
          <HiRefresh onClick={() => handleRefetchButton()} />
        </IconButton>

        <Button onClick={() => goToNewAdmissionPage()} aria-label="Nova Admissão">
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
