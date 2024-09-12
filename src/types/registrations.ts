export type Registration = {
    id: string;
    employeeName: string;
    email: string;
    admissionDate: string;
    status: 'REVIEW' | 'APPROVED' | 'REJECTED';
  };