import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { Context } from "../../Context/Context";

const LoginPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/user/signin`, {
        userName,
        password,
      });
      if (res.data.message) {
        localStorage.setItem("token", res.data.id);
        alert(res.data.message);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (e) {
      alert(e?.response?.data?.message || "Login failed");
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 min-vw-100 bg-light">
      <p className="d-flex justify-content-center align-item-center h2 pb-4">
        Login form
      </p>
      <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <form
          className="d-flex flex-column align-items-center w-100"
          onSubmit={handleSubmit}
        >
          <div className="mb-3 w-100">
            <label htmlFor="UserName" className="form-label">
              UserName:
            </label>
            <input
              type="text"
              className="form-control"
              id="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3 w-100">
            <label htmlFor="Password" className="form-label" id="UserName">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
          <p className="mt-2">Or</p>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleClick}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
