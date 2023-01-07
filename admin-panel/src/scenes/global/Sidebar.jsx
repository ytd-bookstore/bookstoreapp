import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReorderIcon from "@mui/icons-material/Reorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: " transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and Menu Icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="10%"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Users Table"
              to="/users"
              icon={<PersonIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Addresses Table"
              to="/addresses"
              icon={<BusinessIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Books Table"
              to="/books"
              icon={<MenuBookIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Orders Table"
              to="/orders"
              icon={<ReorderIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Carts Table"
              to="/carts"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Genres Table"
              to="/genres"
              icon={<TheaterComedyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Favorites Table"
              to="/favorites"
              icon={<FavoriteIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
