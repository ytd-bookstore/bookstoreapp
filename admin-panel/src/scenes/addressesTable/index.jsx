import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import AddressActions from "./addressActions";
import { Formik } from "formik";
import useMediaQuerry from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { token } from "../login";
import CustomizedDialogs from "../../components/dialog";

const initialValues = {
  user_id: 0,
  address_line: "",
  city: "",
  district: "",
  mobile: 0,
};
const userSchema = yup.object().shape({
  user_id: yup.number().required("required"),
  address_line: yup.string().required("required"),
  city: yup.string().required("required"),
  district: yup.string().required("required"),
  mobile: yup.number().required("required"),
});
let a = token.data;
let b = "Bearer ";
let valid = b + a;
export { valid };

let myFunction = function () {
  return token.data;
};
const Addresses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  a = myFunction();
  valid = b + a;

  const isNonMobile = useMediaQuerry("(min-width:600px)");
  const addBooksData = async (value) => {
    await axios
      .post(
        "http://ytd-bookstore.eba-96se7p2k.eu-central-1.elasticbeanstalk.com/api/addresses/",
        {
          user_id: value.user_id,
          address_line: value.address_line,
          city: value.city,
          district: value.district,
          mobile: value.mobile,
        },
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then(() => {
        getAddressData();
      });
  };
  const handleFormSubmit = (value) => {
    addBooksData(value);
  };

  const getAddressData = async () => {
    await axios
      .get(
        "http://ytd-bookstore.eba-96se7p2k.eu-central-1.elasticbeanstalk.com/api/addresses",
        {
          headers: {
            Authorization: valid,
          },
        }
      )
      .then((res) => {
        setData(res.data);
      });
  };
  useEffect(() => {
    getAddressData();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "user_id",
        headerName: "UserID",
        flex: 0.5,
      },
      {
        field: "address_line",
        headerName: "Address Line",
      },
      {
        field: "city",
        headerName: "City",
        editable: true,
      },
      {
        field: "district",
        headerName: "District",
      },
      {
        field: "mobile",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <AddressActions {...{ params, rowId, setRowId, data, setData }} />
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
          <Header title="Addresses" subtitle="Tables of the Addresses" />
          <CustomizedDialogs>
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
                      type="text"
                      label="address_line"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address_line}
                      name="address_line"
                      error={!!touched.address_line && !!errors.address_line}
                      helperText={touched.address_line && errors.address_line}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="city"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.city}
                      name="city"
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="district"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.district}
                      name="district"
                      error={!!touched.district && !!errors.district}
                      helperText={touched.district && errors.district}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      name="mobile"
                      error={!!touched.mobile && !!errors.mobile}
                      helperText={touched.mobile && errors.mobile}
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
          </CustomizedDialogs>
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
        </Box>
      </main>
    </div>
  );
};
export default Addresses;
