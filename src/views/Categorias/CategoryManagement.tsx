import { CategoryCreator, CategoryUpdate } from "@components/CategoriasForm";
import CategoryList  from "./CategoryList"
import { useNavigate, useLocation } from "react-router-dom";

import "./categorias.css";

const CategoryManagement = () => {
  const location = useLocation();

  return (
    <>
            {
                location.state.mode === "ADD" ? <><h2>Manejo de Categorías</h2><CategoryCreator/></>
                : location.state.mode === "UPD" ? <><h2>Actualizar Categoría</h2><CategoryUpdate/> </> 
                : <><CategoryList/></>
            }             
    </>
  );
};

export default CategoryManagement;
