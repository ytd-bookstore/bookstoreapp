import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import OrdersActions from "./ordersActions";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { token } from "../login";

const initialValues = {
  user_id: 0,
  total: 0,
  status: "",
};

const userSchema = yup.object().shape({
  user_id: yup.number().required("required"),
  total: yup.number().required("required"),
  status: yup.string().required("required"),
});
let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  a = myFunction();
  valid = b + a;

  const isNonMobile = useMediaQuerry("(min-width:600px)");
  const addOrdersData = async (value) => {
    await axios
      .post(
        "http://localhost:3000/api/orders",
        {
          user_id: value.user_id,
          total: value.total,
          status: value.status,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getOrdersData();
      });
  };
  const handleFormSubmit = (value) => {
    addOrdersData(value);
  };

  const getOrdersData = async () => {
    await axios
      .get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getOrdersData();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5,
      },
      {
        field: "user_id",
        headerName: "User ID",
        flex: 0.5,
      },
      {
        field: "total",
        headerName: "Total",
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        flex: 0.4,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        flex: 0.4,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <OrdersActions {...{ params, rowId, setRowId, data, setData }} />
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
          <Header title="Orders" subtitle="Tables of the Orders" />
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
                    type="number"
                    label="user_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.user_id}
                    name="user_id"
                    error={!!touched.user_id && !!errors.user_id}
                    helperText={touched.user_id && errors.user_id}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="total"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.total}
                    name="total"
                    error={!!touched.total && !!errors.total}
                    helperText={touched.total && errors.total}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="status"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.status}
                    name="status"
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
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
export default Orders;
