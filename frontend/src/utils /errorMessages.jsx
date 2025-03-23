const errorMessages = {
  general: {500: "Ошибка на сервере. Пожалуйста, подождите."},
  login: {
    400: "Неверный email или пароль!",
    undefined: "Неизвестная ошибка. Пожалуйста, подождите.",
  },
  registration: {
    username: "Пользователь с таким логином уже существует!",
    email: "Пользователь с таким email уже существует!",
    password: "Пароль слишком похож на username!",
  },
};

export default errorMessages;
