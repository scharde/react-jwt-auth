import React, { useState } from "react";
import styles from "./login.module.css";
import { LoginModel } from "../../models/Authentication";
import { login, saveToken } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const defaultLoginModel: LoginModel = {
  email: "",
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

      if (result.status == 200) {
        saveToken(result.data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setLoginMessage("Error in login");
    }
  };

  return (
    <div className="main-card">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
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
          <div className={styles["loginBtnContainer"]}>
            <button type="submit">Log In</button>
            <Link to={"/register"}>Register</Link>
          </div>
          {loginMessage ?? <p>{loginMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
