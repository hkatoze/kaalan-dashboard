import "./AuthorsView.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import ERROR_ICON from "../../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../../assets/empty-icon.png";
import { AuthorModel, endpoint, headers } from "../../../../../../constants";
import Header from "../../../../../../Components/Header";

import { AuthorsviewHeaderActions } from "./AuthorsviewHeaderActions";
import { AuthorItem } from "./AuthorItem";

export const Authorsview = () => {
  const fetchAllAuthors = () => {
    return axios.get(`${endpoint}/api/authors`, { headers: headers });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-authors-list"],
    queryFn: fetchAllAuthors,
  });

  if(!isLoading){
    console.log(data);
  }
  return (
    <div className="authorsview">
      <Header
        title="Les auteurs"
        subtitle="Découvrer la liste complète de tous les auteurs enregistrés"
        custumHeader={<AuthorsviewHeaderActions />}
      />

      <div className="body">
        <div className="authorsList">
          {data?.data.data.map((authorModel: AuthorModel) => (
            <AuthorItem
              cover={authorModel.author.profilImg}
              title={authorModel.author.name}
              link={`/mainpage/authorsboard/authorsview/${authorModel.author.id}`}
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
              <h2 className="empty">Aucun auteur enregistré</h2>
              <img src={EMPTY_ICON} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
