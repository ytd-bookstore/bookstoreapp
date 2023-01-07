import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import FavoritesActions from "./favoritesActions";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { token } from "../login";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";

const initialValues = {
  user_id: "",
  book_id: "",
};
const userSchema = yup.object().shape({
  user_id: yup.number().required("required"),
  book_id: yup.number().required("required"),
});
let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};

const Favorites = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuerry("(min-width:600px)");
  a = myFunction();
  valid = b + a;
  const addFavoritesData = async (value) => {
    await axios
      .post(
        "http://localhost:3000/api/favorites",
        {
          user_id: value.user_id,
          book_id: value.book_id,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getFavoritesData();
      });
  };
  const handleFormSubmit = (value) => {
    addFavoritesData(value);
  };

  const getFavoritesData = async () => {
    await axios
      .get("http://localhost:3000/api/favorites", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getFavoritesData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      {
        field: "user_id",
        headerName: "User ID",
        flex: 0.5,
        editable: true,
      },
      {
        field: "book_id",
        headerName: "Book ID",
        flex: 0.5,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <FavoritesActions {...{ params, rowId, setRowId, data, setData }} />
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
          <Header title="Favorites" subtitle="Tables of the Favorites" />
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
              getRowId={(row) => row.user_id}
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
                    type="number"
                    label="user_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="user_id"
                    error={!!touched.user_id && !!errors.user_id}
                    helperText={touched.user_id && errors.user_id}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="book_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="book_id"
                    error={!!touched.book_id && !!errors.book_id}
                    helperText={touched.book_id && errors.book_id}
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
export default Favorites;
