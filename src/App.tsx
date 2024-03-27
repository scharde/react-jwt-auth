import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Authentication/Login";
import Layout from "./Layout";
import Home from "./Home";
import Register from "./components/Authentication/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
