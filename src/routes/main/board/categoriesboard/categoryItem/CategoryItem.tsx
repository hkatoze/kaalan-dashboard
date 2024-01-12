import { useMutation, useQueryClient } from "react-query";
import "./CategoryItem.css";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { endpoint, headers } from "../../../../../constants";
interface CategoryItemProps {
  name: string;
  id: string;
}

export const CategoryItem = ({ name, id }: CategoryItemProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (categoryId: string) =>
      axios
        .delete(`${endpoint}/api/categories/${categoryId}`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return (
    <div className="categoryItem">
      <div className="leftSide">
        <div className="square"></div>
        <h2>{name}</h2>
      </div>
      <MdDeleteOutline
        size="20"
        onClick={() => {
          if (confirm("Voulez vous vraiment supprimer cette catégorie?")) {
            deleteMutation.mutate(id);
          }
        }}
      />
    </div>
  );
};
