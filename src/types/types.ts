export type Registration = {
    id: string;
    employeeName: string;
    email: string;
    cpf: string;
    admissionDate: string;
    status: 'REVIEW' | 'APPROVED' | 'REJECTED';
  };

export type NewRegistration = {
    employeeName: string;
    cpf: string;
    email: string;
    admissionDate: string;
  };

export type SearchBarProps = {
    onSearch: (searchValue: string) => void;
    refetchData: () => void;
  };

export type RegistrationCardProps = {
    column: string;
    registration: Registration;
    refetchData: () => void;
    onClick: () => void;
  };

export type ColumnProps = {
    registrations?: any[];
    refetchData: () => void;
  };

export type RegistrationModalProps = {
    registration?: Registration;
    onClose: () => void;
  }