const validateRules = {
    email: (value) => {
      if (!value.trim()) return "Email обязателен!";
      if (!/\S+@\S+\.\S+/.test(value)) return "Некорректный формат email!";
      return null;
    },
    password: (value) => {
      if (!value) return "Пароль обязателен!";
      if (value.length < 6) return "Пароль должен быть не менее 6 символов!";
      return null;
    },
    username: (value) => {
      if (!value) return "Login обязателен!";
      if (value.length < 3) return "Login должен быть не менее 3 символов!";
      return null;
    },
  };

export default validateRules