import React, { useState } from "react";
import styles from "./login.module.css";
import { LoginModel } from "../../models/Authentication";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const defaultLoginModel: LoginModel = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState<LoginModel>(defaultLoginModel);
  const [loginMessage, setLoginMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      var result = await login(formData);

      navigate("/");
    } catch (error) {
      setLoginMessage("Error in login");
    }
  };

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <div className={styles["form-group"]}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      {loginMessage ?? <p>{loginMessage}</p>}
    </form>
  );
};

export default Login;
