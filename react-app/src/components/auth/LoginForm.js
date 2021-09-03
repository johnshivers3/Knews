import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../store/session";
import "./Auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const pagetheme = useSelector(state => state.preferences.preferences);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {

    return pagetheme.theme ? <Redirect to={`/feed/${pagetheme.theme}`} /> : <Redirect to='/feed/light' />;
  }

  return (
    <form onSubmit={onLogin}>
      <h2>Login</h2>
      <div className="auth-errors-div">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <label htmlFor="email">Email</label>
      <div>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          autoComplete='off'
        />
      </div>
      <label htmlFor="password">Password</label>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          autoComplete='off'
        />
      </div>
      <div>
        <Link to="/sign-up">
          Don't have an account yet? Click here to sign up.{" "}
        </Link>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
