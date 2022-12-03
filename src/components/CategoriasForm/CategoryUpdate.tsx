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
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUpdateMutation } from "@store/Services/Category";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@store/Slices/categorySlice";

export const CategoryUpdate = () => {
  const Navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [update, { isLoading, status, error }] = useUpdateMutation();

  const validationSchema = yup.object().shape({
    title: yup.string().required("Titulo es Requerido"),
    description: yup.string().required("Descripción es Requerido"),
    status: yup.string().required("Descripción es Requerido"),
  });

  let initialValues = {
    title: location.state.title as string,
    description: location.state.description as string,
    status: location.state.status as string,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await update({
          ...values,
          categoryId: location.state._id as string,
        }).unwrap();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      dispatch(setCategoryData(data));
      window.location.replace("/admin/categorias/list");
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
            label="Estado"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
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
            Actualizar &nbsp;
            {loading === true ? <CircularProgress color="inherit" /> : null}
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
