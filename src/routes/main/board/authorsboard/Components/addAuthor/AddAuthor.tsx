import "./AddAuthor.css";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PiStudent } from "react-icons/pi";
import {
  ApiErrorResponse,
  Author,
  endpoint,
  headers,
} from "../../../../../../constants";

import TextField from "../../../../../../Components/TextField";
import FilePicker from "../../../../../../Components/FilePicker";
import TextAreaField from "../../../../../../Components/TextAreaField";

const AddAuthor = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlCover, setUrlCover] = useState<string>("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (authorModel: Omit<Author, "id">) =>
      axios
        .post(`${endpoint}/api/authors`, authorModel, { headers: headers })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries;
      setIsLoading(false);
      navigate(-1);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name: string = formData.get("name") as string;
    const description: string = formData.get("description") as string;

    const cover = urlCover;

    const newAuthor = {
      name: name,
      description:description,
      profilImg: cover,
    };

    mutation.mutate(newAuthor);
    //form.reset();
  };

  return (
    <div className="addAuthor">
      <div className="backButtonSection">
        <button
          className="backButton"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
      <div className="bottomSection">
        {" "}
        <div className="title">
          <div>
            <PiStudent color="white" size="25px" />
          </div>
          <h2>Informations de l'auteur</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <span>
                  Nom de l'auteur<div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Nom et prénom"
                  name="name"
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  Description <div>*</div>
                </span>
                <TextAreaField
                  placeholder="Décrivez l'auteur"
                  name="description"
                />
              </div>
              <div className="field">
                <span>
                  Image de profil de l'auteur<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrlCover}
                  name="cover"
                  file="image"
                  width={20}
                />
              </div>
            </div>

            <div className="btnSection">
              {isLoading ? (
                <ClipLoader
                  color="hsl(210, 100%, 59%)"
                  loading={isLoading}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                  data-testid="loader"
                />
              ) : (
                <button disabled={mutation.isLoading} value="submit">
                  Ajouter
                </button>
              )}

              <span> {errorMessage && errorMessage}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
