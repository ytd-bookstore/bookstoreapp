import { Box } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const Dashboard = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />

        <Box m="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Dashboard" subtitle="Welcome to the dashboard!" />
          </Box>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
