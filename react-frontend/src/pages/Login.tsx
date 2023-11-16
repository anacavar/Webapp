import { useRef, useState, useEffect, useContext } from "react";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import axios from "../app/api/axios";

function LoginForm() {
  const LOGIN_URL = "http://localhost:3000/auth/signin";

  const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const errRef = useRef() as React.MutableRefObject<HTMLParagraphElement>;

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const userData = await login({ username: user, password: pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      navigate("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrMsg("Invalid Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Log In</button>
          <div className="loginlinks">
            <p>
              Don't have an account?
              <br />
              <span>
                <a href="/register">Sign Up</a>
              </span>
            </p>
            <p>
              <a href="/forgot-password" id="forgotpasswordlink">
                Forgot password
              </a>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
