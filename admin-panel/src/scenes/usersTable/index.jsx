import { Box, TextField, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import UsersActions from "./UsersActions";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { token } from "../login";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  passwordHash: "",
  passwordSalt: "",
  is_admin: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  surname: yup.string().required("required"),
  email: yup.string().required("required"),
  passwordHash: yup.string().required("required"),
  passwordSalt: yup.string().required("required"),
  is_admin: yup.string().required("required"),
});

let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);

  a = myFunction();
  valid = b + a;

  const isNonMobile = useMediaQuerry("(min-width:600px)");
  const addUsersData = async (value) => {
    await axios
      .post(
        "http://localhost:3000/api/users",
        {
          name: value.name,
          surname: value.surname,
          email: value.email,
          passwordHash: value.passwordHash,
          passwordSalt: value.passwordSalt,
          is_admin: value.is_admin,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getUsersData();
      });
  };
  const handleFormSubmit = (value) => {
    addUsersData(value);
  };

  const getUsersData = async () => {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getUsersData();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
      },

      {
        field: "name",
        headerName: "Name",
        flex: 1,
        editable: true,
      },
      {
        field: "surname",
        headerName: "Surname",
        flex: 1,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        editable: true,
      },
      {
        field: "passwordHash",
        headerName: "Hash Password",
        editable: true,
      },
      {
        field: "passwordSwift",
        headerName: "Swift Password",
        editable: true,
      },
      {
        field: "is_admin",
        headerName: "Is admin",
        type: "singleSelect",
        valueOptions: ["true", "false"],
        editable: true,
      },
      {
        field: "created_at",
        headerName: "Created At",
        flex: 1,
        editable: true,
      },
      {
        field: "updated_at",
        headerName: "Updated At",
        flex: 1,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId, data, setData }} />
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
          <Header title="Users" subtitle="Tables of the Users" />
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

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="surname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.surname}
                    name="surname"
                    error={!!touched.surname && !!errors.surname}
                    helperText={touched.surname && errors.surname}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="passwordHash"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passwordHash}
                    name="passwordHash"
                    error={!!touched.passwordHash && !!errors.passwordHash}
                    helperText={touched.passwordHash && errors.passwordHash}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="passwordSalt"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passwordSalt}
                    name="passwordSalt"
                    error={!!touched.passwordSalt && !!errors.passwordSalt}
                    helperText={touched.passwordSalt && errors.passwordSalt}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="is_admin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.is_admin}
                    name="is_admin"
                    error={!!touched.is_admin && !!errors.is_admin}
                    helperText={touched.is_admin && errors.is_admin}
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
export default Users;
