import {
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
  TableFooter,
  IconButton,
  Button,
} from "@mui/material";
import { TablePaginationActions } from "@components/Table/index";
import { ICategoriesData } from "@store/Slices/categorySlice";
import { Route, useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

import { useGetAllQuery, useDeleteMutation } from "@store/Services/Category";
import { setCategoryData } from "@store/Slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ContentLoadingIndicator } from "@components/Misc/index";

const HeaderTable = () => {
  return (
    <>
      <TableCell align="center">Id</TableCell>
      <TableCell align="center">Título</TableCell>
      <TableCell align="center">Descripción</TableCell>
      <TableCell align="center">Estado</TableCell>
      <TableCell align="center">Opciones</TableCell>
    </>
  );
};

const BodyTable = () => {
  const dispatch = useDispatch();
  const Navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoading, data, error } = useGetAllQuery({});
  const [deleteCategory, { status }] = useDeleteMutation();

  const rows: ICategoriesData = {
    items: isLoading === true ? [] : data,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.items.length) : 0;

  return (
    <>
      {isLoading === true ? (
        <>
          <TableBody>
            <ContentLoadingIndicator />
          </TableBody>
          <TableFooter></TableFooter>
        </>
      ) : (
        <>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.items.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : rows.items
            ).map((row) => (
              <TableRow key={row._id as string}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: 160 }}
                  align="center"
                >
                  {row._id as string}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.title}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.description}
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  {row.status}
                </TableCell>
                <TableCell align="center" style={{ width: 160 }}>
                  <IconButton
                    onClick={() => {
                      Navigator("/admin/categorias/management", {
                        state: {
                          mode: "UPD",
                          _id: row._id as string,
                          title: row.title,
                          description: row.description,
                          status: row.status,
                        },
                      });
                    }}
                    aria-label="delete"
                    color="info"
                    size="large"
                  >
                    <CreateIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="large"
                    onClick={async () => {
                      const response = await deleteCategory({
                        categoryId: row._id as string,
                      });
                      Navigator(0);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </>
      )}
    </>
  );
};

export { HeaderTable, BodyTable };
