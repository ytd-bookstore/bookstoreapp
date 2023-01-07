import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import GenresActions from "./genresActions";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { token } from "../login";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";

let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};

const initialValues = {
  name: "",
};
const userSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const Genres = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuerry("(min-width:600px)");
  a = myFunction();
  valid = b + a;
  const addGenresData = async (value) => {
    await axios
      .post(
        "http://localhost:3000/api/genres",
        {
          name: value.name,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getGenresData();
      });
  };
  const handleFormSubmit = (value) => {
    addGenresData(value);
  };

  const getGenresData = async () => {
    await axios
      .get("http://localhost:3000/api/genres", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getGenresData();
  }, []);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <GenresActions {...{ params, rowId, setRowId, data, setData }} />
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
          <Header title="Genres" subtitle="Tables of the Genres" />
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
                    label="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
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
export default Genres;
