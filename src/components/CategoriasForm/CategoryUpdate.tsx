import { useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";

import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CreateIcon from "@mui/icons-material/Create";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  title: yup.string().required("Titulo es Requerido"),
  description: yup.string().required("Descripción es Requerido"),
});

let initialValues = {
  title: "",
  description: "",
};

export const CategoryUpdate = () => {
  const Navigator = useNavigate();
  const [age, setAge] = useState("");

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexWrap: "wrap" }}
      autoComplete="off"
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1 }} className="form-control">
          <TextField
            id="title"
            name="title"
            label="Título"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </FormControl>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1 }} className="form-control">
          <TextField
            id="description"
            name="description"
            multiline
            maxRows={4}
            label="Descripción"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </FormControl>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1 }} className="form-control">
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="status"
            id="status"
            name="status"
            value={age}
            label="Estado"
            onChange={handleChangeStatus}
          >
            <MenuItem value="ACT">Activo</MenuItem>
            <MenuItem value="INA">Inactivo</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        sx={{ "& button": { m: 1 } }}
      >
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<CreateIcon />}
            type="submit"
          >
            Actualizar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HighlightOffIcon />}
            onClick={() => {
              Navigator("/admin/categorias/list", {
                state: { mode: "CAN" },
              });
            }}
          >
            Cancelar
          </Button>
        </div>
      </Box>
    </Box>
  );
};
