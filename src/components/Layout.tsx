import { Link, Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../services/authService";

const Layout = () => {
  const navigate = useNavigate();

  const onLogOutClickHnd = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">My App</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/superadmin">Superadmin</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/user">User</Link>
        </div>
      </nav>
      <main className="main">
        <Outlet />
      </main>
      <footer>
        <button onClick={onLogOutClickHnd}>Logout</button>
      </footer>
    </>
  );
};

export default Layout;
