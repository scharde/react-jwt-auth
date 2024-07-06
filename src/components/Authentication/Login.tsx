import React, { useState } from "react";
import { LoginModel } from "../../models/Authentication";
import { login, saveToken } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Common/Input";

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
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button>Log In</button>
        <div className="social">
          {loginMessage ?? <p>{loginMessage}</p>}
          <h4>
            <Link to="/register">Register</Link>
          </h4>
        </div>
      </form>
    </>
  );
};

export default Login;
