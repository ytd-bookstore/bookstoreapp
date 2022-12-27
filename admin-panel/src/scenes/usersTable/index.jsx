import { Box } from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUsers } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

import UsersActions from "./UsersActions";
import React, { useMemo, useState, useEffect } from "react";

const Users = () => {
  const [data, setData] = useState(mockDataUsers);
  const [rowId, setRowId] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(5);

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
        valueOptions: ["yes", "no"],
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
              rows={mockDataUsers}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.id}
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
export default Users;
