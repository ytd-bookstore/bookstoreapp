import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Login from "./scenes/login";
import Addresses from "./scenes/addressesTable";
import Books from "./scenes/booksTable";
import Carts from "./scenes/cartsTable";
import Genres from "./scenes/genresTable";
import Orders from "./scenes/ordersTable";
import Users from "./scenes/usersTable";
import Favorites from "./scenes/favoritesTable";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<Login />} />

              {<Route path="/login" element={<Login />} />}

              {<Route path="/addresses" element={<Addresses />} />}
              {<Route path="/books" element={<Books />} />}
              {<Route path="/carts" element={<Carts />} />}
              {<Route path="/genres" element={<Genres />} />}
              {<Route path="/orders" element={<Orders />} />}
              {<Route path="/users" element={<Users />} />}
              {<Route path="/favorites" element={<Favorites />} />}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
