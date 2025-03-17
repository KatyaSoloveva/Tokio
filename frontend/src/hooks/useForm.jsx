import { useState } from "react";
import validateRules from "../utils /validateRules";

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
