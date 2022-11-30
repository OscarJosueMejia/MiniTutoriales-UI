import "./categorias.css";
import { CustomizeTable } from "@components/Table/index";
import { HeaderTable, BodyTable } from "@components/Table/Categorias";
import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const Navigator = useNavigate();

  return (
    <>
      <h2>Registro de Categorías</h2>
      <Box style={{ float: "right" }} sx={{ "& button": { m: 2 } }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<AddCircleIcon />}
          onClick={() => {
            Navigator("/admin/categorias/management", {
              state: { mode: "ADD" },
            });
          }}
        >
          Agregar
        </Button>
      </Box>

      <CustomizeTable
        HeaderChildren={HeaderTable()}
        BodyChildren={BodyTable()}
      />
    </>
  );
};

export default CategoryList;
