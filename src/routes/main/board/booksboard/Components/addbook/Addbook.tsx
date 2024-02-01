import { useMutation, useQuery, useQueryClient } from "react-query";
import "./Addbook.css";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { FaBookOpen } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  ApiErrorResponse,
  AuthorModel,
  BookModel,
  CategoryModel,
  endpoint,
  headers,
} from "../../../../../../constants";
import SelectField from "../../../../../../Components/SelectField";
import TextField from "../../../../../../Components/TextField";
import FilePicker from "../../../../../../Components/FilePicker";
import TextAreaField from "../../../../../../Components/TextAreaField";

const Addbook = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [urlCover, setUrlCover] = useState<string>("");
  const [urlDocument, setUrlDocument] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const fetchAllCategories = () => {
    return axios.get(`${endpoint}/api/categories`, { headers: headers });
  };

  const fetchAllAuthors = () => {
    return axios.get(`${endpoint}/api/authors`, { headers: headers });
  };

  const {
    data: authors,
    isLoading: authorsIsLoading,
   
  } = useQuery({
    queryKey: ["all-authors-list"],
    queryFn: fetchAllAuthors,
  });

  const {
    data: categories,
    isLoading: categoriesIsLoading,
   
  } = useQuery({
    queryKey: ["all-categories-list"],
    queryFn: fetchAllCategories,
  });

  const mutation = useMutation({
    mutationFn: (bookModel: Omit<BookModel, "id">) =>
      axios
        .post(`${endpoint}/api/books`, bookModel, { headers: headers })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries;
      setLoading(false);
      navigate(-1);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title: string = formData.get("title") as string;
    const author: string = formData.get("author") as string;
    const category: string = formData.get("category") as string;
    const nbrPage: string = formData.get("nbrPage") as string;
    const description: string = formData.get("description") as string;
    const publicationDate: string = formData.get("publicationDate") as string;
    const cover = urlCover;
    const bookLink = urlDocument;
    const newBook = {
      title: title,
      publicationDate: publicationDate,
      cover: cover,
      description: description,
      category: category,
      nbrPage: nbrPage,
      author: author,
      bookLink: bookLink,
    };

    console.log(newBook);
    mutation.mutate(newBook);
    //form.reset();
  };

  return (
    <div className="addBook">
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
            <FaBookOpen color="white" size="25px" />
          </div>
          <h2>Détails du livre</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <span>
                  Titre du livre<div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="titre"
                  name="title"
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  Auteur <div>*</div>
                </span>
                <SelectField
                  name="author"
                  width={20}
                  options={
                    authorsIsLoading
                      ? []
                      : authors?.data.data.map(
                          (authorModel: AuthorModel) => authorModel.author.name
                        )
                  }
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  Categorie<div>*</div>
                </span>
                <SelectField
                  name="category"
                  width={20}
                  options={
                    categoriesIsLoading
                      ? []
                      : categories?.data.data.map(
                          (category: CategoryModel) => category.name
                        )
                  }
                  required={true}
                />
              </div>
              <div className="field">
                <span>Nombre de page</span>
                <TextField
                  width={20}
                  type="number"
                  placeholder="nombre de page"
                  name="nbrPage"
                  required={true}
                />
              </div>

              <div className="field">
                <span>Date de publication</span>
                <TextField
                  width={20}
                  type="date"
                  placeholder=""
                  name="publicationDate"
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  Cover du livre<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrlCover}
                  name="cover"
                  file="image"
                  width={20}
                />
              </div>

              <div className="field">
                <span>
                  Document<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrlDocument}
                  name="documentFile"
                  file="pdf"
                  width={20}
                />
              </div>

              <div className="field">
                <span>
                  Description <div>*</div>
                </span>
                <TextAreaField
                  placeholder="Résumé du livre"
                  name="description"
                />
              </div>
            </div>

            <div className="btnSection">
              {loading ? (
                <ClipLoader
                  color="hsl(210, 100%, 59%)"
                  loading={loading}
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

export default Addbook;
