import { FaBook } from "react-icons/fa";

import "./Bookview.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { MdDescription } from "react-icons/md";
import { endpoint, headers } from "../../../../../../../constants";
 

const Bookview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (bookId: string) =>
      axios
        .delete(`${endpoint}/api/books/${bookId}`, {
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
  const { bookId } = useParams();

  const fetchBookById = () => {
    return axios.get(`${endpoint}/api/books/${bookId}`, {
      headers: headers,
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["book-by-id"],
    queryFn: fetchBookById,
  });

  return (
    <div className="bookView">
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
                <FaBook color="white" size="25px" />
              </div>
              <h2>{data?.data.data.title}</h2>
            </div>
            <div className="content">
              <div className="coverBox">
                <div className="cover">
                  <img src={data?.data.data.cover} alt="livre couverture" />
                </div>
              </div>

              <div className="book">
                <div>
                  <h3>Titre:</h3>
                  <span>{data?.data.data.title}</span>
                </div>
                <div>
                  <h3>Auteur:</h3>
                  <span>{data?.data.data.author}</span>
                </div>
                <div>
                  <h3>Nombre de page:</h3>
                  <span>{data?.data.data.nbrPage}</span>
                </div>

                <div>
                  <h3>Catégorie:</h3>
                  <span>{data?.data.data.category}</span>
                </div>
                <div>
                  <h3>Date de publication:</h3>
                  <span>{data?.data.data.publicationDate}</span>
                </div>
              </div>

              <div className="actionsBlock">
                <span className="edit">
                  <Link
                    to={`/mainpage/booksboard/booksview/editBook/${bookId}`}
                  >
                    Modifier
                  </Link>
                </span>
                <span
                  className="delete"
                  onClick={() => {
                    if (confirm("Voulez vous vraiment supprimer ce livre?")) {
                      deleteMutation.mutate(bookId!);
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
                <MdDescription color="white" size="25px" />
              </div>
              <h2>Description</h2>
            </div>

            <div className="content">{data?.data.data.description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookview;
