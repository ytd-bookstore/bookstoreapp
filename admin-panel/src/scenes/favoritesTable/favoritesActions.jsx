import { Box, CircularProgress, Fab } from "@mui/material";
import React, { useState } from "react";
import { Check, Save } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { green, red } from "@mui/material/colors";
import axios from "axios";
import { valid } from ".";
import { useEffect } from "react";

const FavoritesActions = ({ params, rowId, setRowId, data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getFavoritesData = async () => {
    await axios
      .get("http://localhost:3000/api/favorites", {
        headers: {
          Authorization: valid,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const updateFavoritessData = async (itemName) => {
    let a = "http://localhost:3000/api/favorites/";
    let b = itemName;
    let c = a + b;
    await axios
      .put(c, params.row, {
        headers: {
          Authorization: valid,
        },
      })
      .then(() => {
        getFavoritesData();
      });
  };

  const handleSubmit = async (itemName) => {
    setLoading(true);
    updateFavoritessData(itemName);
    setSuccess(true);
    setRowId(null);
    setLoading(false);
    setSuccess(false);
  };
  const handleDelete = async (itemName) => {
    let a = "http://localhost:3000/api/favorites/";
    let b = itemName;
    let c = a + b;
    await axios
      .delete(c, {
        headers: {
          Authorization: valid,
        },
      })
      .then(() => {
        getFavoritesData();
      });
  };

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={() => handleSubmit(params.id)}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Fab
        color="secondary"
        sx={{
          width: 40,
          height: 40,
          bgcolor: red[700],
          "&:hover": { bgcolor: red[800] },
        }}
        onClick={() => handleDelete(params.id)}
      >
        <DeleteIcon />
      </Fab>
    </Box>
  );
};

export default FavoritesActions;
