export const isValidName = (name: string): boolean | string => {
  const hasSpace = /\s/.test(name);
  if (!hasSpace)
    return "Nome deve conter ao menos um espaço";

  const hasTwoLetters = /[a-zA-Z].*[a-zA-Z]/.test(name);
  if (!hasTwoLetters)
    return "Nome deve conter ao menos duas letras";

  const startsWithNonNumber = /^[^\d]/.test(name);
  if (!startsWithNonNumber)
    return "Nome não pode começar com número";

  return true;
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}