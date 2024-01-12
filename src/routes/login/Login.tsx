import { FormEvent, useEffect, useState } from "react";

import "./Login.css";
import LOGO from "../../assets/logo.png";
import { Link } from "react-router-dom";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { ClipLoader } from "react-spinners";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { Admin, ApiErrorResponse, endpoint } from "../../constants";
const userSession = localStorage.getItem("user") || "disconnected";
const token = localStorage.getItem("token") || "";
const userIdLocal = localStorage.getItem("userId") || "";
const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSessionMod, setUserSessionMod] = useState<string>(userSession);
  const [tokenMod, setTokenMod] = useState<string>(token);
  const [userId, setUserId] = useState<string>(userIdLocal);
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(() => {
    localStorage.setItem("user", userSessionMod);
    localStorage.setItem("token", tokenMod);
    localStorage.setItem("userId", userId);
  }, [userSessionMod, tokenMod,userId]);

  const mutation = useMutation({
    mutationFn: (admin: Omit<Admin, "token">) =>
      axios
        .post(`${endpoint}/api/loginToApi`, admin)
        .then((response) => response.data),

    onSuccess: (data) => {
      setIsLoading(false);

      if (data.message === "L'utilisateur s'est connecté avec succès.") {
        setUserId(data.data.id);
        setUserSessionMod("connected");
        setTokenMod(data.token);
        window.location.href= "/";
       
      } else {
        setErrorMessage(data.message);
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    const admin: Admin = { emailAddress: email, password: password } as Admin;
    mutation.mutate(admin);
  };
  return (
    <div className="loginpage flex">
      <div className="logo flex">
        <img src={LOGO} alt="" />
        <span>aalan</span>
      </div>
      <h2>Welcome to the family! Let's get started!</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          width={20}
          type="email"
          placeholder="Email"
          name="email"
          required={true}
        />
        <TextField
          width={20}
          type="password"
          placeholder="Password"
          name="password"
          required={true}
        />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        {isLoading ? (
          <ClipLoader
            color="hsl(210, 100%, 59%)"
            loading={isLoading}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
            data-testid="loader"
          />
        ) : (
          <Button width={20} type="submit" bgColor="hsl(203, 95%, 42%)">
            Login
          </Button>
        )}

        <div className="staySigned" style={{ width: "20rem" }}>
          <div>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Keep me signed in</label>
          </div>
          <Link to="#">Forget password?</Link>
           
        </div>

        <span className="newUserSection">
          New user? <Link to="/register">Sign Up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
