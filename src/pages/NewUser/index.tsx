import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { HiOutlineArrowLeft } from "react-icons/hi";

import * as S from "./styles";

import routes from "~/router/routes";
import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { isValidName, isValidEmail } from "~/utils/validations";
import { isValidCPF, applyCPFMask } from "~/utils/cpf";
import { convertDateFormat } from "~/utils/date";
import { MIN_LOADING_TIME } from '~/utils/constants';
import { postRegistration } from '~/services/registrations';

const NewUserPage = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate(routes.dashboard);

  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const [employeeNameError, setEmployeeNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [admissionDateError, setAdmissionDateError] = useState<string | null>(null);

  const handleCPFChange = (cpf: string) => setCpf(applyCPFMask(cpf));

  const handleAdmissionDateChange = (date: string) => {
    if (date.length <= 10)
      setAdmissionDate(date);
  };

  const validateUser = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    const nameValidation = isValidName(employeeName);
    if (nameValidation !== true) {
      setEmployeeNameError(nameValidation as string);
      isValid = false;
    } else {
      setEmployeeNameError(null);
    }

    const emailValidation = isValidEmail(email);
    if (emailValidation !== true) {
      setEmailError('Email inválido');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!isValidCPF(cpf)) {
      setCpfError('CPF inválido');
      isValid = false;
    } else {
      setCpfError(null);
    }

    if (!admissionDate) {
      setAdmissionDateError('Data de admissão inválida');
      isValid = false;
    } else {
      setAdmissionDateError(null);
    }

    if (isValid)
      registerUser();
  }

  const registerUser = async () => {
    setLoading(true);

    const registration = {
      employeeName,
      email,
      cpf,
      admissionDate: convertDateFormat(admissionDate)
    };

    const fetchPromise = postRegistration(registration);
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));

    try {
      const [ result ] = await Promise.all([fetchPromise, timeoutPromise]);

      if (result) {
        toast.success('Cadastro realizado com sucesso!');
        goToHome();
      }
    } catch (error: any) {
      toast.error("Erro ao realizar cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Container style={{}}>
      <S.Card>
        <S.Header>
          <IconButton onClick={() => goToHome()} aria-label="Voltar para o dashboard">
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <S.Title>Cadastro de Novo Colaborador</S.Title>
        </S.Header>

        <S.Form onSubmit={validateUser} aria-live="polite">
          <TextField
            id="employeeName"
            placeholder="Nome" 
            label="Nome" 
            value={employeeName} 
            onChange={(e) => setEmployeeName(e.target.value)} 
            error={employeeNameError ?? undefined}
            aria-invalid={!!employeeNameError}
            aria-describedby={employeeNameError ? 'employeeName-error' : undefined}
          />
          <TextField 
            id="email"
            placeholder="Email" 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            error={emailError ?? undefined}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          <TextField 
            id="cpf"
            placeholder="CPF" 
            label="CPF" 
            value={cpf} 
            onChange={(e) => handleCPFChange(e.target.value)} 
            error={cpfError ?? undefined}
            maxLength={14}
            aria-invalid={!!cpfError}
            aria-describedby={cpfError ? 'cpf-error' : undefined}
          />
          <TextField 
            id="admissionDate"
            label="Data de admissão" 
            type="date" 
            value={admissionDate} 
            onChange={(e) => handleAdmissionDateChange(e.target.value)}
            error={admissionDateError ?? undefined}
            maxLength={10}
            aria-invalid={!!admissionDateError}
            aria-describedby={admissionDateError ? 'admissionDate-error' : undefined}
          />
          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Salvando' : 'Cadastrar'}
          </Button>
        </S.Form>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
