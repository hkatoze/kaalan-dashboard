import { FormEvent, useEffect, useState } from "react";
import LOGO from "../../assets/logo.png";
import "./Register.css";
import TextField from "../../Components/TextField";
import SelectField from "../../Components/SelectField";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { Admin, ApiErrorResponse, endpoint } from "../../constants";
import axios, { AxiosError } from "axios";
import { ClipLoader } from "react-spinners";
const userIdFromLocal = localStorage.getItem("userId") || "";
const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState(userIdFromLocal);
  const [successMessage, setSuccessMessage] = useState("");
  const mutation = useMutation({
    mutationFn: (admin: Omit<Admin, "id">) =>
      axios
        .post(`${endpoint}/api/signupToApi`, admin)
        .then((response) => response.data),
    onSuccess: (data) => {
      setIsLoading(false);
      if (data.message === "Compte crée avec succès!") {
        setUserId(data.data.id);
        setSuccessMessage("Account created successfully! you can log in now.");
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email: string = formData.get("email") as string;
    const username: string = formData.get("username") as string;
    const role: string = formData.get("role") as string;
    const password: string = formData.get("password") as string;
    const firstname: string = formData.get("firstname") as string;
    const lastname: string = formData.get("lastname") as string;

    setIsLoading(true);
    const admin: Admin = {
      emailAddress: email,
      username: username,
      role: role,
      password: password,
      firstname: firstname,
      lastname: lastname,
    } as Admin;

    mutation.mutate(admin);
  };
  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);
  return (
    <div className="registerpage flex">
      <div className="logo flex">
        <img src={LOGO} alt="" />
        <span>aalan</span>
      </div>
      <h2>Create an account to join the family</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          width={20}
          type="text"
          placeholder="Enter your firstname"
          name="firstname"
          required={true}
        />
        <TextField
          width={20}
          type="text"
          placeholder="Enter your lastname"
          name="lastname"
          required={true}
        />
        <TextField
          width={20}
          type="email"
          placeholder="Email"
          name="email"
          required={true}
        />

        <TextField
          width={20}
          type="text"
          placeholder="Username"
          name="username"
          required={true}
        />
        <SelectField
          name="role"
          width={20}
          options={["Developper", "IT consultant", "Project Manager"]}
          required={true}
        />
        <TextField
          width={20}
          type="password"
          placeholder="Password"
          name="password"
          required={true}
        />
        {(!successMessage && errorMessage )&& <p className="errorMessage">{errorMessage}</p>}
        {isLoading && (
          <ClipLoader
            color="hsl(210, 100%, 59%)"
            loading={isLoading}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
            data-testid="loader"
          />
        )}

        {successMessage && <p className="successMessage">{successMessage}</p>}

        {!isLoading && !successMessage && (
          <Button width={20} type="submit" bgColor="hsl(203, 95%, 42%)">
            Register
          </Button>
        )}

        <span className="alreadyAccountSection">
          already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
