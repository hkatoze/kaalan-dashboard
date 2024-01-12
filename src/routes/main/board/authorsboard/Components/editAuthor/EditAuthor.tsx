import "./EditAuthor.css";
import { FormEvent, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { ClipLoader } from "react-spinners";
import FilePicker from "../../../../../../Components/FilePicker";
import TextField from "../../../../../../Components/TextField";
import { PiStudent } from "react-icons/pi";
import { ApiErrorResponse, AuthorModel, endpoint, headers } from "../../../../../../constants";

export const EditAuthor = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authorId } = useParams();

  const fetchAuthorById = () => {
    return axios.get(`${endpoint}/api/authors/${authorId}`, {
      headers: headers,
    });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["author-by-id"],
    queryFn: fetchAuthorById,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [profilImg, setUrrlProfilImg] = useState<string>("");
  const [name, setName] = useState<string>("");
  

  const mutation = useMutation({
    mutationFn: (authorModel: Omit<AuthorModel, "id">) =>
      axios
        .put(`${endpoint}/api/authors/${authorId}`, authorModel, {
          headers: headers,
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries;

      navigate(-1);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });
   
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "name") {
      setName(value);
    }
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name: string = formData.get("name") as string;

    const cover = profilImg ? profilImg : data?.data.data.author.profilImg;

    const editAuthor = {
      name: name,
      profilImg: cover,
    };

    mutation.mutate(editAuthor);
  };

  useEffect(() => {
    if (!isLoading && !isError && data?.data?.data) {
      setName(data.data.data.author.name);
    }
  }, [isLoading, isError, data]);

  return (
    <div className="editAuthor">
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
        <div className="title">
          <div>
            <PiStudent color="white" size="25px" />
          </div>
          <h2>Modification du l'auteur</h2>
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
                  onChange={handleOnChange}
                  value={name}
                />
              </div>

              <div className="field">
                <span>
                  Image de profil de l'auteur<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrrlProfilImg}
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
                  Enregistrer
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
