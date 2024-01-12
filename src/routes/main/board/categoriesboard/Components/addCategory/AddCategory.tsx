import "./AddCategory.css";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PiStudent } from "react-icons/pi";
import {
  ApiErrorResponse,
  CategoryModel,
  endpoint,
  headers,
} from "../../../../../../constants";

import TextField from "../../../../../../Components/TextField";

const AddCategory = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (categoryModel: Omit<CategoryModel, "id">) =>
      axios
        .post(`${endpoint}/api/categories`, categoryModel, { headers: headers })
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
    const category: string = formData.get("category") as string;

    const newCategory = {
      name: category,
    };

    mutation.mutate(newCategory);
    //form.reset();
  };

  return (
    <div className="addCategory">
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
          <h2>Nouvelle categorie</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <span>
                  Catégorie<div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Nom de la catégorie"
                  name="category"
                  required={true}
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

export default AddCategory;
