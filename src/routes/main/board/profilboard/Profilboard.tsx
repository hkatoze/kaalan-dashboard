import "./Profilboard.css";
import IMG from "../../../../assets/admin-user-icon.jpg";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import { Admin, endpoint, headers } from "../../../../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import Header from "../../../../Components/Header";

const userId = localStorage.getItem("userId") || "";

const Profilboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [job, setJob] = useState("");
  const queryClient = useQueryClient();
  const fetchAdminInfos = () => {
    return axios.get(`${endpoint}/api/users/${userId}`, {
      headers: headers,
    });
  };
  const handleLogout = () => {
    localStorage.setItem("userId", "");
    localStorage.setItem("token", "");
    localStorage.setItem("user", "disconnected");
    window.location.pathname = "/";
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["admin-by-id"],
    queryFn: fetchAdminInfos,
  });
  const mutation = useMutation({
    mutationFn: (adminModel: Omit<Admin, "userId">) =>
      axios
        .put(`${endpoint}/api/users/${userId}`, adminModel, {
          headers: headers,
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries;
      setLoading(false);
      setIsEdit(false);
    },
    onError: () => {
      setLoading(false);
      setIsEdit(false);
    },
  });
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "username") {
      setUsername(value);
    }
    if (name === "lastname") {
      setLastname(value);
    }
    if (name === "firstname") {
      setFirstname(value);
    }
    if (name === "emailAddress") {
      setEmailAddress(value);
    }
    if (name === "job") {
      setJob(value);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username: string = formData.get("username") as string;
    const firstname: string = formData.get("firstname") as string;
    const lastname: string = formData.get("lastname") as string;
    const job: string = formData.get("job") as string;
    const emailAddress: string = formData.get("emailAddress") as string;

    const newUser = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      emailAddress: emailAddress,
      role: job,
    };

    mutation.mutate(newUser);
  };
  useEffect(() => {
    if (!isLoading && !isError && data?.data?.data) {
      setUsername(data.data.data.username);
      setLastname(data.data.data.lastname);
      setFirstname(data.data.data.firstname);
      setJob(data.data.data.role);
      setEmailAddress(data.data.data.emailAddress);
    }
  }, [isLoading, isError, data]);
  return (
    <div className="profilBoard">
      <div className="head">
        <Header />
      </div>
      <div className="body">
        <div className="profilImg">
          <img src={IMG} alt="" />
          <h3>Administrator</h3>

          <div
            className="disconnect"
            onClick={() => {
              if (
                confirm(
                  "Voulez vous vraiment vous déconnectez de la plateforme ?"
                )
              ) {
                handleLogout();
              }
            }}
          >
            <CiLogout /> <span>Log out</span>
          </div>
        </div>

        <form
          method="post"
          action=""
          className="rightSide"
          onSubmit={handleSubmit}
        >
          <div className="infos">
            <div>
              <h3>Firstname:</h3>
              {isEdit ? (
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={handleOnChange}
                  autoFocus
                />
              ) : (
                <span>{firstname}</span>
              )}
            </div>
            <div>
              <h3>Lastname:</h3>

              {isEdit ? (
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={handleOnChange}
                />
              ) : (
                <span>{lastname}</span>
              )}
            </div>
            <div>
              <h3>Username:</h3>

              {isEdit ? (
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleOnChange}
                />
              ) : (
                <span>{username}</span>
              )}
            </div>
            <div>
              <h3>Email address:</h3>

              {isEdit ? (
                <input
                  type="email"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={handleOnChange}
                />
              ) : (
                <span>{emailAddress}</span>
              )}
            </div>
            <div>
              <h3>Job:</h3>

              {isEdit ? (
                <input
                  type="text"
                  name="job"
                  value={job}
                  onChange={handleOnChange}
                />
              ) : (
                <span>{job}</span>
              )}
            </div>
          </div>
          <div className="actions">
            {isEdit && (
              <button
                type="submit"
                style={{
                  backgroundColor: isEdit ? "#f0f0f0" : "hsl(210, 100%, 59%)",
                  color: isEdit ? "hsl(210, 100%, 59%)" : "white",
                }}
                className="edit"
              >
                {loading ? (
                  <ClipLoader
                    color="hsl(210, 100%, 59%)"
                    loading={isLoading}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                    data-testid="loader"
                    style={{ padding: "0.5rem 0.5rem" }}
                  />
                ) : (
                  "Save"
                )}
              </button>
            )}
            {!isEdit && (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                style={{
                  backgroundColor: isEdit ? "#f0f0f0" : "hsl(210, 100%, 59%)",
                  color: isEdit ? "hsl(210, 100%, 59%)" : "white",
                }}
                className="edit"
              >
                Edit
              </button>
            )}

            <button type="button" className="resetPassword">
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profilboard;
