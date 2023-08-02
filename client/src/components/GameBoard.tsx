import { Box, Grid, Typography, styled } from "@mui/material";
import { amber, indigo } from "@mui/material/colors";
import React from "react";
import { GameType } from "../App";
import DifficultySelect from "./DifficultySelect";

const bgColor = indigo[900];
const borderColor = amber["A400"];

interface GameBoardProps {
  game: GameType;
  updateGameBoard: (
    category: string,
    genre: string,
    difficulty: string
  ) => void;
  setCurrentQuestion: (
    category: string,
    genre: string,
    difficulty: string
  ) => void;
}

export const genresMap = [
  {
    header: "Action",
    value: "action",
  },
  {
    header: "Comedy",
    value: "comedy",
  },
  {
    header: "Fantasy",
    value: "fantasy",
  },
  {
    header: "Slice of Life",
    value: "sliceoflife",
  },
  {
    header: "Romance",
    value: "romance",
  },
];

const GenreHeader = styled(Typography)({
  color: "black",
});

const GridBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid black",
  borderRadius: "20px",
  margin: 8,
  padding: 8,
});

const GameBoard: React.FC<GameBoardProps> = ({
  game,
  updateGameBoard,
  setCurrentQuestion,
}) => {
  return (
    <Box display="flex" width={"100%"} height="100vh">
      <Box
        width="80%"
        border="5px solid black"
        borderRadius={"20px"}
        margin={3}
        padding={3}
      >
        <Grid container style={{ height: "100%" }}>
          {/*Headers*/}
          <Grid item xs={2}></Grid>
          {genresMap.map((genre) => (
            <Grid item xs={2}>
              <GridBox>
                <GenreHeader variant="h4" textAlign={"center"}>
                  {genre.header}
                </GenreHeader>
              </GridBox>
            </Grid>
          ))}
          {/*General Knowledge Row*/}
          <Grid item xs={2}>
            <GridBox height="40%">
              <GenreHeader variant="h4" textAlign={"center"}>
                General Knowledge
              </GenreHeader>
            </GridBox>
          </Grid>
          {genresMap.map((genre) => (
            <Grid item xs={2}>
              <GridBox height="40%">
                <DifficultySelect
                  genre={genre.value ?? ""}
                  category="general"
                  game={game.game_board}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </GridBox>
            </Grid>
          ))}
          {/*Guess the Character Row*/}
          <Grid item xs={2}>
            <GridBox height="40%">
              <GenreHeader variant="h4" textAlign={"center"}>
                Guess the Character
              </GenreHeader>
            </GridBox>
          </Grid>
          {genresMap.map((genre) => (
            <Grid item xs={2}>
              <GridBox height="40%">
                <DifficultySelect
                  genre={genre.value ?? ""}
                  category="character"
                  game={game.game_board}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </GridBox>
            </Grid>
          ))}
                    {/*Name the Song Row*/}
                    <Grid item xs={2}>
            <GridBox height="40%">
              <GenreHeader variant="h4" textAlign={"center"}>
                Name the Song
              </GenreHeader>
            </GridBox>
          </Grid>
          {genresMap.map((genre) => (
            <Grid item xs={2}>
              <GridBox height="40%">
                <DifficultySelect
                  genre={genre.value ?? ""}
                  category="song"
                  game={game.game_board}
                  setCurrentQuestion={setCurrentQuestion}
                />
              </GridBox>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        width="20%"
        border={`5px solid black`}
        borderRadius={"20px"}
        margin={3}
        padding={3}
      >
        {/* Scores Section */}
        <Box width="100%" display="flex" justifyContent="center">
          <Typography variant="h3">Scores</Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {game.scores.map((player) => (
            <>
              <Box display="flex" justifyContent="space-around" margin={3}>
                <Typography variant="h5">
                  {`Player ${player.player}`}
                </Typography>{" "}
                <Typography variant="h5">{player.score}</Typography>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GameBoard;
