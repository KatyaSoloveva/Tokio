import { useState } from "react";

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
  login: (value) => {
    if (!value) return "Login обязателен!";
    if (value.length < 3) return "Login должен быть не менее 3 символов!";
    return null;
  },
};

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validateErrors = (values) => {
    let newErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validateRules[key] ? validateRules[key](values[key]) : null;
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    return validateErrors(formData)
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
