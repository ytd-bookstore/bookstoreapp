import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { mockDataAddresses } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { ReactQueryDevtools } from "react-query/devtools";

const handleClick = (event, cellValues) => {
  console.log(event);
};

const Addresses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
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
      headerName: "Actions",
      flex: 0.7,
      renderCell: (cellValues) => {
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => {
                handleClick(event, cellValues);
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />

        <Box m="20px">
          <Header title="Addresses" subtitle="Tables of the Addresses" />
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
              rows={mockDataAddresses}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </main>
    </div>
  );
};
export default Addresses;
