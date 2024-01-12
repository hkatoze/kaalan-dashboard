import "./Booksview.css";
import Header from "../../../../../../Components/Header";
import { BookItem } from "./components/BookItem";
import { BooksviewHeaderActions } from "./components/BooksviewHeaderActions";
import { BookModel, endpoint, headers } from "../../../../../../constants";
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import ERROR_ICON from "../../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../../assets/empty-icon.png";

export const Booksview = () => {
  const fetchAllBooks = () => {
    return axios.get(`${endpoint}/api/books`, { headers: headers });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-books-list"],
    queryFn: fetchAllBooks,
  });
  return (
    <div className="booksview">
      <Header
        title="Les Livres"
        subtitle="Découvrer la liste complète de tous les livres ajoutés"
        custumHeader={<BooksviewHeaderActions />}
      />

      <div className="body">
        <div className="booksList">
          {data?.data.data.map((book: BookModel) => (
            <BookItem
              cover={book.cover}
              title={book.title}
              subtitle={book.author}
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

          {data?.data.data.length == 0 && (
            <div className="emptyIcon">
              <h2 className="empty">Aucun livre ajouté</h2>
              <img src={EMPTY_ICON} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
