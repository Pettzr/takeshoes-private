interface PasswordCheckResult {
    isValid: boolean;
    errors: string[];
  };
  
  export default function checkPassword(password: string): PasswordCheckResult {
    const errors: string[] = [];
  
    if (password.length < 5) {
      errors.push("A senha deve ter no mínimo 5 caracteres.");
    }
  
    if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula.");
    }
  
    if (!/\d/.test(password)) {
      errors.push("A senha deve conter pelo menos um número.");
    }
  
    if (!/[\W_]/.test(password)) {
      errors.push("A senha deve conter pelo menos um caractere especial.");
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  