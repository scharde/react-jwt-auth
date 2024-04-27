import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Authentication/Register";
import { isTokenValid } from "./services/authService";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

const PrivateRoute = ({}: any) => {
  const isValid = isTokenValid();

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default App;
