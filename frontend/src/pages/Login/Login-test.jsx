import { useState } from "react";
import Form from "../../components/Form/Form";
import FormTitle from "../../components/FormTitle/FormTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный формат email!";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Пароль обязателен!";
    } else if (formData.password.length < 10) {
      newErrors.password = "Пароль должен быть не менее 10 символов!";
    }

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(errors);
    // if (errors[name]) {
    //   setErrors((prev) => ({ ...prev, [name]: "" }));
    // }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    console.log(isValid);
    if (!isValid) {
      return;
    }
    console.log(formData);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message);
      }
      const data = await response.json();
      console.log(data);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Смс об ошибке: ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormTitle title="Войти" />
        <Input
          title="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <div className={styles.errorMessage}>{errors.email}</div>
        )}
        <Input
          title="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <div className={styles.errorMessage}>{errors.password}</div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          Войти
        </Button>
      </Form>
    </>
  );
};

export default Login;




// import { useState, useEffect } from "react";
// import Form from "../../components/Form/Form";
// import FormTitle from "../../components/FormTitle/FormTitle";
// import Button from "../../components/Button/Button";
// import Input from "../../components/Input/Input";

// // const Login = () => {
// //   return (
// //     <>
// //       <Form onSubmit={handleSubmit}>
// //         <FormTitle title="Войти" />
// //         <Input title="Email" type="text" name="email" />
// //         <Input title="Пароль" type="text" name="password" />
// //         <Button type="submit">Войти</Button>
// //       </Form>
// //     </>
// //   );
// // };

// // export default Login;

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState();

//   const validateForm = () => {
//     let newErrors = {};

//     // Валидация email
//     if (!formData.email) {
//       newErrors.email = "Email обязателен";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Некорректный формат email";
//     }

//     // Валидация пароля
//     if (!formData.password) {
//       newErrors.password = "Пароль обязателен";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Пароль должен быть не менее 6 символов";
//     }

//     setErrors(newErrors);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // useEffect(() => {
//   //   console.log(formData), [formData]
//   // });

//   // const handleChange = (e) => {
//   //   setFormData({
//   //     ...formData,
//   //     [e.target.name]: e.target.value,
//   //   });
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // const newErrors = {}
//     // if (!FormData.email) {
//     //   newErrors.email = 'Поле email обязательное'
//     // }
//     // else if (!formData.password) {
//     //   newErrors.password = 'Поле password обязательное'
//     // }
//     // if (Object.keys(newErrors).length > 0) {
//     //   setErrors(newErrors);
//     //   console.log(errors)
//     //   return
//     // }
//     validateForm();
//     console.log(errors && Object.keys(errors).length);
//     if (errors && Object.keys(errors).length > 0) {
//       return
//     }
//     console.log(formData)
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit}>
//         <FormTitle title="Войти" />
//         <Input
//           title="Email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         {errors && <div>{errors.email}</div>}
//         <Input
//           title="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         {errors && <div>{errors.password}</div>}
//         <button type="submit">go</button>
//       </Form>
//     </>
//   );
// };

// export default Login;
