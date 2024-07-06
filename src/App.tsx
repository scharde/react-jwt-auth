import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Authentication/Register";
import { getDataFromToken, isTokenValid } from "./services/authService";
import Unauthorize from "./components/Unauthorize";
import Admin from "./components/Admin";
import SuperAdmin from "./components/SuperAdmin";
import User from "./components/User";

enum RolesType {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  User = "User",
}

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute
              allowedRoles={[
                RolesType.SuperAdmin,
                RolesType.Admin,
                RolesType.User,
              ]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/"
          element={<PrivateRoute allowedRoles={[RolesType.SuperAdmin]} />}
        >
          <Route path="/superadmin" element={<SuperAdmin />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute
              allowedRoles={[RolesType.SuperAdmin, RolesType.Admin]}
            />
          }
        >
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute
              allowedRoles={[
                RolesType.SuperAdmin,
                RolesType.Admin,
                RolesType.User,
              ]}
            />
          }
        >
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="unauthorize" element={<Unauthorize />} />
      </Route>
    </Routes>
  );
}

const PrivateRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const isValid = isTokenValid();

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  var tokenData = getDataFromToken();
  if (!allowedRoles.includes(tokenData?.role || "")) {
    return <Navigate to="/unauthorize" />;
  }

  return <Outlet />;
};

export default App;
