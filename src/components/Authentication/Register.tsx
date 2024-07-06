import React, { useState } from "react";
import { register } from "../../services/authService";
import { RegisterModel, RegisterStatusType } from "../../models/Authentication";
import { Link } from "react-router-dom";

const defaultRegisterModel: RegisterModel = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const options = ["SuperAdmin", "Admin", "User"];

const Register = () => {
  const [formData, setFormData] = useState(defaultRegisterModel);
  const [registerStatus, setRegisterStatus] = useState<RegisterStatusType>(
    RegisterStatusType.None
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>

        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Role:</label>
        <select onChange={handleChange} name="role" value={formData.role}>
          <option>Please choose one option</option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>

        <button>Register</button>
        <div className="social">
          {registerStatusMessage}
          <br />
          <h4>
            <Link to="/login">Login</Link>
          </h4>
        </div>
      </form>
    </>
  );
};

export default Register;
