import "./CategoriesView.css";
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import ERROR_ICON from "../../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../../assets/empty-icon.png";
import { CategoryModel, endpoint, headers } from "../../../../../../constants";
import Header from "../../../../../../Components/Header";
import { CategoriesviewHeaderActions } from "./CategoriesviewHeaderActions";
import { CategoryItem } from "../../categoryItem/CategoryItem";

export const CategoriesView = () => {
  const fetchAllCategories = () => {
    return axios.get(`${endpoint}/api/categories`, { headers: headers });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-categories-list"],
    queryFn: fetchAllCategories,
  });
  return (
    <div className="categoriesview">
      <Header
        title="Les Catégories de livres"
        subtitle="Découvrer la liste complète de toutes les catégories enregistrés"
        custumHeader={<CategoriesviewHeaderActions />}
      />

      <div className="body">
        <div className="categoriesList">
          {data?.data.data.map((category: CategoryModel) => (
            <CategoryItem name={category.name} id={category.id?.toString()!} />
          ))}

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
                <h2 className="empty">Aucune catégorie enregistré</h2>
                <img src={EMPTY_ICON} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
