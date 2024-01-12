import { PiStudent } from "react-icons/pi";
import "./AuthorView.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ERROR_ICON from "../../../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../../../assets/empty-icon.png";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";

import { BookModel, endpoint, headers } from "../../../../../../../constants";
import { PiBooksDuotone } from "react-icons/pi";
import { BookItem } from "../../../../booksboard/Components/booksview/components/BookItem";

const AuthorView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (authorId: string) =>
      axios
        .delete(`${endpoint}/api/authors/${authorId}`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        }),
    onSuccess: () => {
      queryClient.invalidateQueries;
      navigate(-1);
    },
  });
  const { authorId } = useParams();

  const fetchAuthorById = () => {
    return axios.get(`${endpoint}/api/authors/${authorId}`, {
      headers: headers,
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["author-by-id"],
    queryFn: fetchAuthorById,
  });

  return (
    <div className="authorView">
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

      {isLoading ? (
        <ClipLoader
          color="hsl(210, 100%, 59%)"
          loading={isLoading}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
          data-testid="loader"
        />
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="bottomSection">
          <div className="informations">
            <div className="title">
              <div>
                <PiStudent color="white" size="25px" />
              </div>
              <h2>{data?.data.data.author.name}</h2>
            </div>
            <div className="content">
              <div className="coverBox">
                <div className="cover">
                  <img
                    src={data?.data.data.author.profilImg}
                    alt="livre couverture"
                  />
                </div>
              </div>

              <div className="author">
                <div>
                  <h3>Nom:</h3>
                  <span>{data?.data.data.author.name}</span>
                </div>

                <div>
                  <h3>Nombre de livres:</h3>
                  <span>{data?.data.data.books.length}</span>
                </div>
              </div>

              <div className="actionsBlock">
                <span className="edit">
                  <Link
                    to={`/mainpage/authorsboard/authorsview/editAuthor/${authorId}`}
                  >
                    Modifier
                  </Link>
                </span>
                <span
                  className="delete"
                  onClick={() => {
                    if (confirm("Voulez vous vraiment supprimer cet auteur?")) {
                      deleteMutation.mutate(authorId!);
                    }
                  }}
                >
                  Supprimer
                </span>
              </div>
            </div>
          </div>

          <div className="description">
            <div className="title">
              <div>
                <PiBooksDuotone color="white" size="25px" />
              </div>
              <h2>Livres enregistrés</h2>
            </div>
            <div className="content">
              <div className="booksList">
                {data?.data.data.books.map((book: BookModel) => (
                  <BookItem
                    title={book.title}
                    cover={book.cover}
                    link={`/mainpage/booksboard/booksview/${book.id}`}
                  />
                ))}
              </div>
              <div className="loadingSection">
                {isLoading && (
                  <ClipLoader
                    color="hsl(210, 100%, 59%)"
                    loading={isLoading}
                    aria-label="Loading Spinner"
                    speedMultiplier={0.8}
                    data-testid="loader"
                  />
                )}

                {isError && (
                  <div className="errorIcon">
                    <h2 className="error">Something went wrong</h2>
                    <img src={ERROR_ICON} alt="" />
                  </div>
                )}

                {data?.data.data.books.length == 0 && (
                  <div className="emptyIcon">
                    <h2 className="empty">Aucun livre ajouté</h2>
                    <img src={EMPTY_ICON} alt="" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorView;
