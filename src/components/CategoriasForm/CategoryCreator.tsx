import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAddMutation } from "@store/Services/Category";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@store/Slices/categorySlice";
import { AlertDialog } from "@components/Misc";

import { Box, Button, TextField, FormControl } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";

const validationSchema = yup.object().shape({
  title: yup.string().required("Titulo es Requerido"),
  description: yup.string().required("Descripción es Requerido"),
});

let initialValues = {
  title: "",
  description: "",
  status: "ACT",
};

export const CategoryCreator = () => {
  const Navigator = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [add, { status, isError, error }] = useAddMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data;
      try {
        data = await add(values).unwrap();
      } catch (error) {
        setLoading(false);
        return error;
      }
      dispatch(setCategoryData(data));
      Navigator("/admin/categorias/list");
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
          <TextField
            id="status"
            name="status"
            label="Estado"
            defaultValue="Activo"
            InputProps={{ readOnly: true }}
          />
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
            startIcon={<ControlPointIcon />}
            type="submit"
          >
            Agregar &nbsp;
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
      {isError ? (
        <AlertDialog
          isOpen={isError}
          type="ERROR"
          title="Ups!"
          description={(error as { data: { error: string } }).data.error}
        />
      ) : null}
    </Box>
  );
};
