import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React, { useState } from "react";
import { green, red } from "@mui/material/colors";

const DEFAULT_PLAYERS = 4;

interface InitializeProps {
    initializePlayerCount: (count: number) => void;
}

const Initialize: React.FC<InitializeProps> = ({initializePlayerCount}) => {
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYERS);

  const buttonRed = red[200];
  const buttonGreen = green[200];

  const decreasePlayers = () => {
    setPlayerCount(playerCount - 1);
  };

  const increasePlayers = () => {
    setPlayerCount(playerCount + 1);
  };

  return (
    <Box>
      <Typography variant="h3">Select the amount of players:</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin={8}
      >
        <IconButton
          style={{ backgroundColor: buttonRed }}
          onClick={() => decreasePlayers()}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={playerCount}
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          type="number"
          defaultValue={DEFAULT_PLAYERS}
          style={{ width: 64, marginLeft: 64, marginRight: 64 }}
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          onChange={(event) => setPlayerCount(Number(event.target.value))}
        />
        <IconButton
          style={{ backgroundColor: buttonGreen }}
          onClick={increasePlayers}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box   display="flex"
  justifyContent="center"
  alignItems="center">
        <Button variant="contained" onClick={() => initializePlayerCount(playerCount)}>
            Start
        </Button>
      </Box>
    </Box>
  );
};

export default Initialize;
