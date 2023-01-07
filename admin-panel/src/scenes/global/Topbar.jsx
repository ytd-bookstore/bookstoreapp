import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useNavigate } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const handleLog = () => {
    navigate("/");
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* <IconButton onClick={handleLog}>
          <PersonOutlinedIcon />
        </IconButton> */}
        <Button onClick={handleLog}>Log Out</Button>
      </Box>
    </Box>
  );
};

export default Topbar;
