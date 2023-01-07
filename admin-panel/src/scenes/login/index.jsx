import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuerry from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};

const userSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});
let token = "abc";
export { token };
const Login = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuerry("(min-width:600px)");
  const handleFormSubmit = async (value) => {
    token = await axios.post("http://localhost:3000/api/auth/adminlogin", {
      email: value.email,
      password: value.password,
    });
    if (token === "") {
    } else {
      navigate("/users");
    }
  };
  return (
    <div className="app">
      <img
        alt="profile-user"
        width="50%"
        height="100%"
        src={`../../assets/logo.png`}
        style={{ cursor: "pointer, borderRadius: 50%" }}
      />
      <main className="content">
        <Box m="20px">
          <Header title="Admin Login" subtitle="Please sign in to continue" />
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
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Login
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
export default Login;
