import { Box, IconButton, styled } from "@mui/material";
import { green, red, yellow } from "@mui/material/colors";
import React from "react";
import { GameType } from "../App";

interface DifficultySelectProps {
  genre: string;
  category: string;
  game: any;
  setCurrentQuestion: (
    category: string,
    genre: string,
    difficulty: string
  ) => void;
}

const DifficultyButton = styled(IconButton)({
  aspectRatio: "1 / 1",
  height: "100%",
  color: "black",
  "&:disabled": {
    backgroundColor: "lightgray !important",
    color: "gray",
  },
});

const bgGreen = green[500];
const bgYellow = yellow[500];
const bgRed = red[500];

const DifficultySelect: React.FC<DifficultySelectProps> = ({
  genre,
  category,
  game,
  setCurrentQuestion,
}) => {
  return (
    <>
      {game[category][genre] && (
        <Box
          display={"flex"}
          alignContent={"center"}
          justifyContent={"space-around"}
          width={"100%"}
          height="60%"
        >
          <DifficultyButton
            style={{ backgroundColor: bgGreen }}
            onClick={() => setCurrentQuestion(category, genre, "easy")}
            disabled={game[category][genre]["easy"] === 0}
          >
            1
          </DifficultyButton>
          <DifficultyButton
            style={{ backgroundColor: bgYellow }}
            onClick={() => setCurrentQuestion(category, genre, "medium")}
            disabled={game[category][genre]["medium"] === 0}
          >
            2
          </DifficultyButton>
          <DifficultyButton
            style={{ backgroundColor: bgRed }}
            onClick={() => setCurrentQuestion(category, genre, "hard")}
            disabled={game[category][genre]["hard"] === 0}
          >
            3
          </DifficultyButton>
        </Box>
      )}
    </>
  );
};

export default DifficultySelect;
