import React, { useState } from "react";
import CountDown from "./CountDown";
import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { genresMap } from "./GameBoard";
import GeneralKnowledge from "./QuestionCategories/GeneralKnowledge";
import GuessTheCharacter from "./QuestionCategories/GuessTheCharacter";
import NameTheSong from "./NameTheSong";

interface QuestionProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  updateScore: (player: number, amount: number) => void;
  updateGameBoard: (
    category: string,
    genre: string,
    difficulty: string
  ) => void;
  returnToGameBoard: () => void;
}

const backButtonColor = grey[300];
const backButtonColorHover = grey[500];

const BackButton = styled(IconButton)({
  backgroundColor: backButtonColor,
  "&:hover": {
    backgroundColor: backButtonColorHover,
  },
});

const DifficultyPoints: {
  [key: string]: number;
} = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const Question: React.FC<QuestionProps> = ({
  category,
  genre,
  difficulty,
  scores,
  updateScore,
  updateGameBoard,
  returnToGameBoard,
}) => {
  const [waiting, setWaiting] = useState(true);

  const getCategory = (category: string | null): string => {
    switch (category) {
      case "general":
        return "General Knowledge";
      case "character":
        return "Guess the Character";
      case "song":
        return "Name the Anime Song";
      default:
        return "None";
    }
  };

  const onPlayerButtonClick = (player: number) => {
    console.log(player, difficulty);
    updateScore(player, DifficultyPoints[difficulty]);
    returnToGameBoard();
    updateGameBoard(category, genre, difficulty);
  };

  const renderQuestion = () => {
    switch (category) {
      case "general":
        return (
          <GeneralKnowledge
            category={category}
            genre={genre}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "character":
        return (
          <GuessTheCharacter
            category={category}
            genre={genre}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "song":
        return (
          <NameTheSong
            category={category}
            genre={genre}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection={"column"}
      justifyContent="space-around"
      alignItems={"center"}
      margin={3}
    >
      {/*TODO: Make button location fixed in top left corner */}
      <Box width="100%">
        <BackButton size="large" onClick={() => returnToGameBoard()}>
          <ArrowBack />
        </BackButton>
      </Box>
      {waiting ? (
        <>
          <Box width="100%" display="flex" justifyContent="center" margin={3}>
            <Typography variant="h2">{getCategory(category)}</Typography>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-evenly"
            margin={3}
          >
            <Typography variant="h3">
              {/*TODO: Capitalize first letter */}
              {`Difficulty: ${
                genresMap.find((element) => element.value === genre)?.header
              }`}
            </Typography>
            <Typography variant="h3">
              {/*TODO: Capitalize first letter */}
              {`Difficulty: ${difficulty}`}
            </Typography>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" margin={3}>
            <Typography variant="h3">Starting in:</Typography>
          </Box>
          <Box
            width="33%"
            border="3px solid black"
            borderRadius={"20px"}
            display="flex"
            justifyContent="center"
          >
            <CountDown
              seconds={3}
              onCountdownEnd={() => setWaiting(false)}
            ></CountDown>
          </Box>
          <Box width="100%" display="flex" justifyContent="center" margin={3}>
            <Typography variant="h3">Get ready!</Typography>
          </Box>
        </>
      ) : (
        <>{renderQuestion()}</>
      )}
    </Box>
  );
};

export default Question;
