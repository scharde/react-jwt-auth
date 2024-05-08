import React, { useState } from "react";
import { register } from "../../services/authService";
import { RegisterModel, RegisterStatusType } from "../../models/Authentication";
import { Link } from "react-router-dom";

const defaultRegisterModel: RegisterModel = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(defaultRegisterModel);
  const [registerStatus, setRegisterStatus] = useState<RegisterStatusType>(
    RegisterStatusType.None
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setRegisterStatus(RegisterStatusType.None);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    try {
      var result = await register(formData);
      if (result.status == 201) {
        setFormData(defaultRegisterModel);
        setRegisterStatus(RegisterStatusType.Success);
      }
    } catch (error: unknown) {
      setRegisterStatus(RegisterStatusType.Error);
    }
  };

  const registerStatusMessage =
    registerStatus == RegisterStatusType.None ? (
      ""
    ) : registerStatus == RegisterStatusType.Success ? (
      <p>
        User registered. Goto <Link to={"/login"}>Login</Link> page.
      </p>
    ) : (
      <p>Errored in user registration</p>
    );

  return (
    <div className="main-card">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h2>Registration Form</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username=">Email:</label>
            <input
              type="email"
              name="email"
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
          {registerStatusMessage}
        </form>
      </div>
    </div>
  );
};

export default Register;
