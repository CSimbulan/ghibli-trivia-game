import React, { useState } from "react";
import CountDown from "./CountDown";
import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { genresMap } from "./GameBoard";
import GeneralKnowledge from "./QuestionCategories/GeneralKnowledge";
import GuessTheCharacter from "./QuestionCategories/GuessTheCharacter";
import NameTheSong from "./NameTheSong";
import { music_questions_action } from "./QuestionCategories/music_action";
import { music_questions_comedy } from "./QuestionCategories/music_comedy";
import { music_questions_fantasy } from "./QuestionCategories/music_fantasy";
import { music_questions_romance } from "./QuestionCategories/music_romance";
import { music_questions_sliceoflife } from "./QuestionCategories/music_sliceoflife";
import { character_questions_action } from "./QuestionCategories/character_action";
import { character_questions_comedy } from "./QuestionCategories/character_comedy";
import { character_questions_fantasy } from "./QuestionCategories/character_fantasy";
import { character_questions_romance } from "./QuestionCategories/character_romance";
import { character_questions_sliceoflife } from "./QuestionCategories/character_sliceoflife";
import { general_questions_action } from "./QuestionCategories/general_action";
import { general_questions_sliceoflife } from "./QuestionCategories/general_sliceoflife";
import { general_questions_comedy } from "./QuestionCategories/general_comedy";
import { general_questions_fantasy } from "./QuestionCategories/general_fantasy";
import { general_questions_romance } from "./QuestionCategories/general_romance";

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

const generalQuestionsAction: {
  [key: string]: any;
} = general_questions_action;
const generalQuestionsComedy: {
  [key: string]: any;
} = general_questions_comedy;
const generalQuestionsFantasy: {
  [key: string]: any;
} = general_questions_fantasy;
const generalQuestionsSliceofLife: {
  [key: string]: any;
} = general_questions_sliceoflife;
const generalQuestionsRomance: {
  [key: string]: any;
} = general_questions_romance;

const characterQuestionsAction: {
  [key: string]: any;
} = character_questions_action;
const characterQuestionsFantasy: {
  [key: string]: any;
} = character_questions_fantasy;
const characterQuestionsComedy: {
  [key: string]: any;
} = character_questions_comedy;
const characterQuestionsSlifeofLife: {
  [key: string]: any;
} = character_questions_sliceoflife;
const characterQuestionsRomance: {
    [key: string]: any;
  } = character_questions_romance;

const musicQuestionsAction: {
  [key: string]: any;
} = music_questions_action;
const musicQuestionsComedy: {
  [key: string]: any;
} = music_questions_comedy;
const musicQuestionsFantasy: {
  [key: string]: any;
} = music_questions_fantasy;
const musicQuestionsSliceofLife: {
  [key: string]: any;
} = music_questions_sliceoflife;
const musicQuestionsRomance: {
  [key: string]: any;
} = music_questions_romance;

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
    updateScore(player, DifficultyPoints[difficulty]);
    returnToGameBoard();
    updateGameBoard(category, genre, difficulty);
  };

  const renderQuestion = () => {
    let questionSet = [];

    switch (true) {


      case category == "general" && genre == "action":
        questionSet = generalQuestionsAction[difficulty];
        break;
      case ((category == 'general') && (genre == "comedy")):
        questionSet = generalQuestionsComedy[difficulty];
        break;
      case category == "general" && genre == "fantasy":
        questionSet = generalQuestionsFantasy[difficulty];
        break;
      case ((category == 'general') && (genre == "sliceoflife")):
        questionSet = generalQuestionsSliceofLife[difficulty];
        break;
      case category == "general" && genre == "romance":
        questionSet = generalQuestionsRomance[difficulty];
        break;

      case category == "character" && genre == "action":
        questionSet = characterQuestionsAction[difficulty];
        break;
      case ((category == 'character') && (genre == "comedy")):
        questionSet = characterQuestionsComedy[difficulty];
        break;
      case category == "character" && genre == "fantasy":
        questionSet = characterQuestionsFantasy[difficulty];
        break;
      case ((category == 'character') && (genre == "sliceoflife")):
        questionSet = characterQuestionsSlifeofLife[difficulty];
        break;
      case category == "character" && genre == "romance":
        questionSet = characterQuestionsRomance[difficulty];
        break;

      case category == "character" && genre == "action":
        questionSet = characterQuestionsAction[difficulty];
        break;
      case ((category == 'song') && (genre == "comedy")):
        questionSet = musicQuestionsComedy[difficulty];
        break;
      case category == "song" && genre == "fantasy":
        questionSet = musicQuestionsFantasy[difficulty];
        break;
      case ((category == 'song') && (genre == "sliceoflife")):
        questionSet = musicQuestionsSliceofLife[difficulty];
        break;
      case category == "song" && genre == "romance":
        questionSet = musicQuestionsRomance[difficulty];
        break;
      default:
        questionSet = musicQuestionsAction[difficulty];
        break;
    }

    const randomIndex = Math.floor(Math.random() * questionSet.length);

    switch (category) {
      case "general":
        return (
          <GeneralKnowledge
            category={category}
            genre={genre}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
            question={questionSet[randomIndex]}
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
            question={questionSet[randomIndex]}
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
            question={questionSet[randomIndex]}
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
              {`Genre: ${
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
