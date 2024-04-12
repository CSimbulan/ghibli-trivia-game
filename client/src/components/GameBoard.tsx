import { Box, Grid, Icon, IconButton, Typography, styled } from "@mui/material";
import { amber, indigo, red } from "@mui/material/colors";
import React from "react";
import { GameType } from "../App";
import QuestionSelect from "./QuestionSelect";
import {
  Add,
  PersonAddAlt1,
  PersonRemove,
  Remove,
  RestartAlt,
} from "@mui/icons-material";

const bgColor = indigo[900];
const borderColor = amber["A400"];

interface GameBoardProps {
  game: GameType;
  updateGameBoard: (
    category: string,
    genre: string,
    difficulty: string
  ) => void;
  setCurrentQuestion: (category: string, difficulty: string) => void;
  updateScore: (player: number, amount: number) => void;
  restartScore: () => void;
  addPlayer: () => void;
  removePlayer: () => void;
}

export const genresMap = [
  {
    header: "Multiple Choice",
    value: "multipleChoice",
  },

  {
    header: "Guess the Picture",
    value: "whichMovie",
  },
  {
    header: "Name The Song",
    value: "nameTheSong",
  },
  {
    header: "Guess The Character",
    value: "characterVoice",
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
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  position: "relative",
  overflow: "hidden",
  zIndex: 9999,
});

const GameBoard: React.FC<GameBoardProps> = ({ game, setCurrentQuestion }) => {
  return (
    <Box display="flex" width={"100%"} height="100vh">
      <Box
        width="100%"
        border="5px solid black"
        borderRadius={"20px"}
        margin={3}
        padding={3}
      >
        <Box style={{ height: "100%" }}>
          {/*Headers*/}
          <Box
            height="10%"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container height="100%">
              {genresMap.map((genre) => (
                <Grid item xs={3} height={"100%"}>
                  <Box
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="stretch"
                  >
                    <GridBox width="100%">
                      <GenreHeader variant="h5" textAlign={"center"}>
                        {genre.header}
                      </GenreHeader>
                    </GridBox>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/*Questions Grid*/}
          <Box
            width="100%"
            height="90%"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid container height="100%">
              {/*Guess the Next Line Row*/}
              <Grid item xs={3}>
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <GridBox>
                    <QuestionSelect
                      category="multipleChoice"
                      game={game.game_board}
                      setCurrentQuestion={setCurrentQuestion}
                    />
                    <Box
                      zIndex={3}
                      position={"absolute"}
                      bottom={-50}
                      right={-100}
                      overflow={"hidden"}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/characters/spirited1.png`}
                        height="300px"
                      />
                    </Box>
                  </GridBox>
                </Box>
              </Grid>
              {/*What Anime is this row*/}
              <Grid item xs={3}>
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <GridBox>
                    <QuestionSelect
                      category="whichMovie"
                      game={game.game_board}
                      setCurrentQuestion={setCurrentQuestion}
                    />
                    <Box
                      zIndex={3}
                      position={"absolute"}
                      bottom={-250}
                      right={-150}
                      overflow={"hidden"}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/characters/totoro1.png`}
                        height="600px"
                      />
                    </Box>
                  </GridBox>
                </Box>
              </Grid>
              {/*Name the song questions*/}
              <Grid item xs={3}>
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <GridBox>
                    <QuestionSelect
                      category="nameTheSong"
                      game={game.game_board}
                      setCurrentQuestion={setCurrentQuestion}
                    />
                    <Box
                      zIndex={3}
                      position={"absolute"}
                      bottom={-50}
                      right={-200}
                      overflow={"hidden"}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/characters/mononoke1.png`}
                        height="300px"
                      />
                    </Box>
                  </GridBox>
                </Box>
              </Grid>
              {/*Guess the character questions*/}
              <Grid item xs={3}>
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                >
                  <GridBox>
                    <QuestionSelect
                      category="characterVoice"
                      game={game.game_board}
                      setCurrentQuestion={setCurrentQuestion}
                    />
                    <Box
                      zIndex={3}
                      position={"absolute"}
                      bottom={-200}
                      right={-200}
                      overflow={"hidden"}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/characters/kiki1.png`}
                        height="600px"
                      />
                    </Box>
                  </GridBox>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GameBoard;
