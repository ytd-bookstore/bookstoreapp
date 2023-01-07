import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import BooksActions from "./booksActions";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { token } from "../login";

const initialValues = {
  title: "",
  author: "",
  price: 0,
  description: "",
  edition: "",
  format: "",
  page: 0,
  rating: 0,
  rating_count: 0,
  image_url: "",
  stock: 0,
};

const userSchema = yup.object().shape({
  title: yup.string().required("required"),
  author: yup.string().required("required"),
  price: yup.number().required("required"),
  description: yup.string().nullable(true),
  edition: yup.string().nullable(true),
  format: yup.string().nullable(true),
  page: yup.number().required("required"),
  rating: yup.number().required("required"),
  rating_count: yup.number().required("required"),
  image_url: yup.string().nullable(true),
  stock: yup.number().required("required"),
});
let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};
const Books = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);

  const isNonMobile = useMediaQuerry("(min-width:600px)");
  a = myFunction();
  valid = b + a;
  const addBooksData = async (value) => {
    await axios
      .post(
        "http://localhost:3000/api/books",
        {
          title: value.title,
          author: value.author,
          price: value.price,
          description: value.description,
          edition: value.edition,
          format: value.format,
          page: value.page,
          rating: value.rating,
          rating_count: value.rating_count,
          image_url: value.image_url,
          stock: value.stock,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getBooksData();
      });
  };
  const handleFormSubmit = (value) => {
    addBooksData(value);
  };

  const getBooksData = async () => {
    await axios
      .get("http://localhost:3000/api/books", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getBooksData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      {
        field: "title",
        headerName: "Title",
        flex: 1,
      },
      {
        field: "author",
        headerName: "Author",
        flex: 1,
      },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "edition",
        headerName: "Edition",
      },
      {
        field: "format",
        headerName: "Format",
      },
      {
        field: "page_count",
        headerName: "Page Count",
      },
      {
        field: "rating",
        headerName: "Rating",
      },
      {
        field: "rating_count",
        headerName: "Rating Count",
      },
      {
        field: "image_url",
        headerName: "Image URL",
        flex: 1,
      },
      {
        field: "stock",
        headerName: "Stock",
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <BooksActions {...{ params, rowId, setRowId, data, setData }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box m="20px">
          <Header title="Books" subtitle="Tables of the Books" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .Mui.DataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.id}
              rowsPerPageOptions={[5, 10, 20]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onCellEditCommit={(params) => setRowId(params.id)}
            />
          </Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="author"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.author}
                    name="author"
                    error={!!touched.author && !!errors.author}
                    helperText={touched.author && errors.author}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="edition"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.edition}
                    name="edition"
                    error={!!touched.edition && !!errors.edition}
                    helperText={touched.edition && errors.edition}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="format"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.format}
                    name="format"
                    error={!!touched.format && !!errors.format}
                    helperText={touched.format && errors.format}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="page"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.page}
                    name="page"
                    error={!!touched.page && !!errors.page}
                    helperText={touched.page && errors.page}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="rating"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rating}
                    name="rating"
                    error={!!touched.rating && !!errors.rating}
                    helperText={touched.rating && errors.rating}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="rating_count"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rating_count}
                    name="rating_count"
                    error={!!touched.rating_count && !!errors.rating_count}
                    helperText={touched.rating_count && errors.rating_count}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.image_url}
                    name="image_url"
                    error={!!touched.image_url && !!errors.image_url}
                    helperText={touched.image_url && errors.image_url}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="stock"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stock}
                    name="stock"
                    error={!!touched.stock && !!errors.stock}
                    helperText={touched.stock && errors.stock}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Add
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </main>
    </div>
  );
};
export default Books;
