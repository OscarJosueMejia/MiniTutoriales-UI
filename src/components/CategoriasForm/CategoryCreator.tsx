import { useState } from "react";
import { CategoryUpdate } from "./CategoryUpdate";
import * as yup from "yup";
import { useFormik } from "formik";

import { Box, Button, TextField, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const validationSchema = yup.object().shape({
  title: yup.string().required("Titulo es Requerido"),
  description: yup.string().required("Descripción es Requerido"),
});

let initialValues = {
  title: "",
  description: "",
};

export const CategoryCreator = () => {
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
            id="outlined-basic"
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
            id="filled-textarea"
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
            id="outlined-basic"
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
            Agregar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<HighlightOffIcon />}
          >
            Cancelar
          </Button>
        </div>
      </Box>
    </Box>
  );
};
