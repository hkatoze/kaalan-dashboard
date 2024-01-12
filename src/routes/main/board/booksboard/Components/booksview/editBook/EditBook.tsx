import { FormEvent, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import { ClipLoader } from "react-spinners";
import "./EditBook.css";

import {
  ApiErrorResponse,
  AuthorModel,
  BookModel,
  CategoryModel,
  endpoint,
  headers,
} from "../../../../../../../constants";
import FilePicker from "../../../../../../../Components/FilePicker";
import TextField from "../../../../../../../Components/TextField";
import SelectField from "../../../../../../../Components/SelectField";
import { FaBookOpen } from "react-icons/fa";
import TextAreaField from "../../../../../../../Components/TextAreaField";

export const EditBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { bookId } = useParams();
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
  const fetchBookById = () => {
    return axios.get(`${endpoint}/api/books/${bookId}`, {
      headers: headers,
    });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["book-by-id"],
    queryFn: fetchBookById,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [urlCover, setUrlCover] = useState<string>("");
  const [urlDocument, setUrlDocument] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [nbrPage, setNbrPage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [publicationDate, setPublicationDate] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (bookModel: Omit<BookModel, "id">) =>
      axios
        .put(`${endpoint}/api/books/${bookId}`, bookModel, {
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
  const handleOnchangeTextArea = (event: FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    if (name === "description") {
      setDescription(value);
    }
  };
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "nbrPage") {
      setNbrPage(value);
    }

    if (name === "publicationDate") {
      setPublicationDate(value);
    }
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "author") {
      setAuthor(value);
    }
    if (name === "category") {
      setCategory(value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title: string = formData.get("title") as string;
    const author: string = formData.get("author") as string;
    const category: string = formData.get("category") as string;
    const nbrPage: string = formData.get("nbrPage") as string;
    const description: string = formData.get("description") as string;
    const publicationDate: string = formData.get("publicationDate") as string;

    const cover = urlCover ? urlCover : data?.data.data.cover;
    const bookLink = urlDocument ? urlDocument : data?.data.data.bookLink;

    const editBook = {
      title: title,
      publicationDate: publicationDate,
      cover: cover,
      description: description,
      category: category,
      nbrPage: nbrPage,
      author: author,
      bookLink: bookLink,
    };

    mutation.mutate(editBook);
  };

  useEffect(() => {
    if (!isLoading && !isError && data?.data?.data) {
      setTitle(data.data.data.title);
      setAuthor(data.data.data.author);
      setUrlCover(data.data.data.cover);
      setCategory(data.data.data.category);
      setNbrPage(data.data.data.nbrPage);
      setPublicationDate(data.data.data.publicationDate);
      setDescription(data.data.data.description);
    }
  }, [isLoading, isError, data]);

  return (
    <div className="editBook">
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
            <FaBookOpen color="white" size="25px" />
          </div>
          <h2>Modification du livre</h2>
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
                  onChange={handleOnChange}
                  value={title}
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
                          (author: AuthorModel) => author.name
                        )
                  }
                  required={true}
                  onChange={handleSelectChange}
                  value={author}
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
                  onChange={handleSelectChange}
                  value={category}
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
                  onChange={handleOnChange}
                  value={nbrPage}
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
                  onChange={handleOnChange}
                  value={publicationDate}
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
                  onChange={handleOnchangeTextArea}
                  value={description}
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
