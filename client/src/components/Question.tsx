import React, { useState } from "react";
import CountDown from "./CountDown";
import { Box, IconButton, Typography, styled } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import { grey, red } from "@mui/material/colors";
import { genresMap } from "./GameBoard";
import NameTheSong from "./NameTheSong";
import MultipleChoice from "./MultipleChoice";
import WhichMovie from "./WhichMovie";
import CharacterVoice from "./CharacterVoice";

interface QuestionProps {
  category: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  updateScore: (player: number, amount: number) => void;
  updateGameBoard: (
    category: string,
    difficulty: string
  ) => void;
  returnToGameBoard: () => void;
}

const backButtonColor = grey[300];
const backButtonColorHover = grey[500];

const failButtonColor = red[500];
const failButtonColorHover = red[900];

const BackButton = styled(IconButton)({
  backgroundColor: backButtonColor,
  "&:hover": {
    backgroundColor: backButtonColorHover,
  },
});

const FailButton = styled(IconButton)({
  backgroundColor: failButtonColor,
  "&:hover": {
    backgroundColor: failButtonColorHover,
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
  difficulty,
  scores,
  updateScore,
  updateGameBoard,
  returnToGameBoard,
}) => {
  const [waiting, setWaiting] = useState(false);

  const getCategory = (category: string | null): string => {
    switch (category) {
      case "general":
        return "General Knowledge";
      case "line":
        return "Guess The Next Line";

      case "scene":
        return "What Anime is This?";
      case "character":
        return "Guess the Character";
      case "song":
        return "Name the Anime Song";

        case "voice":
          return "Who's Voice is That?";
      default:
        return "None";
    }
  };

  const onPlayerButtonClick = (player: number) => {
    updateScore(player, 1);
    returnToGameBoard();
    updateGameBoard(category, difficulty);
  };

  const onFailureButtonClick = () => {
    returnToGameBoard();
    updateGameBoard(category, difficulty);
  };

  const renderQuestion = () => {
    // let questionSet = [];

    // switch (true) {

    //   case category == "general" && genre == "action":
    //     questionSet = generalQuestionsAction[difficulty];
    //     break;
    //   case ((category == 'general') && (genre == "comedy")):
    //     questionSet = generalQuestionsComedy[difficulty];
    //     break;
    //   case category == "general" && genre == "fantasy":
    //     questionSet = generalQuestionsFantasy[difficulty];
    //     break;
    //     case category == "general" && genre == "horror":
    //       questionSet = generalQuestionsFantasy[difficulty];
    //       break;
    //   case ((category == 'general') && (genre == "sliceoflife")):
    //     questionSet = generalQuestionsSliceofLife[difficulty];
    //     break;
    //   case category == "general" && genre == "romance":
    //     questionSet = generalQuestionsRomance[difficulty];
    //     break;

    //   case category == "character" && genre == "action":
    //     questionSet = characterQuestionsAction[difficulty];
    //     break;
    //   case ((category == 'character') && (genre == "comedy")):
    //     questionSet = characterQuestionsComedy[difficulty];
    //     break;
    //   case category == "character" && genre == "fantasy":
    //     questionSet = characterQuestionsFantasy[difficulty];
    //     break;
    //   case ((category == 'character') && (genre == "sliceoflife")):
    //     questionSet = characterQuestionsSlifeofLife[difficulty];
    //     break;
    //   case category == "character" && genre == "romance":
    //     questionSet = characterQuestionsRomance[difficulty];
    //     break;

    //   case category == "character" && genre == "action":
    //     questionSet = characterQuestionsAction[difficulty];
    //     break;
    //   case ((category == 'song') && (genre == "comedy")):
    //     questionSet = musicQuestionsComedy[difficulty];
    //     break;
    //   case category == "song" && genre == "fantasy":
    //     questionSet = musicQuestionsFantasy[difficulty];
    //     break;
    //   case ((category == 'song') && (genre == "sliceoflife")):
    //     questionSet = musicQuestionsSliceofLife[difficulty];
    //     break;
    //   case category == "song" && genre == "romance":
    //     questionSet = musicQuestionsRomance[difficulty];
    //     break;
    //   default:
    //     questionSet = musicQuestionsAction[difficulty];
    //     break;
    // }

    // const randomIndex = Math.floor(Math.random() * questionSet.length);

    switch (category) {
      // case "general":
      //   return (
      //     <GeneralKnowledge
      //       category={category}
      //       genre={genre}
      //       difficulty={difficulty}
      //       scores={scores}
      //       onPlayerButtonClick={onPlayerButtonClick}
      //       question={questionSet[randomIndex]}
      //     />
      //   );

      case "multipleChoice":
        return (
          <MultipleChoice
            category={category}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "whichMovie":
        return (
          <WhichMovie
            category={category}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "nameTheSong":
        return (
          <NameTheSong
            category={category}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "characterVoice":
        return (
          <CharacterVoice
            category={category}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      case "voice":
        return (
          <MultipleChoice
            category={category}
            difficulty={difficulty}
            scores={scores}
            onPlayerButtonClick={onPlayerButtonClick}
          />
        );

      default:
        return (
          <MultipleChoice
            category={category}
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
      <Box
        width="100%"
        display="flex"
        alignItems="start"
        justifyContent="center"
        position="relative"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          left={0}
        >
          <BackButton size="large" onClick={() => returnToGameBoard()}>
            <ArrowBack />
          </BackButton>
          {!waiting && (
            <FailButton
              size="large"
              onClick={() => onFailureButtonClick()}
              style={{ marginTop: 16 }}
            >
              <Close />
            </FailButton>
          )}
        </Box>
        {!waiting && (
          <>
            <Box
              position="absolute"
              p={2}
              display="flex"
              justifyContent="center"
              margin={3}
              bgcolor="white"
              border="3px solid black"
              borderRadius={5}
            >
              <Typography variant="h5">
                {genresMap.find((element) => element.value === category)?.header +
                  ": " +
                  difficulty.toUpperCase()}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {waiting ? (
        <>
          <Box
            width="70%"
            p={3}
            display="flex"
            justifyContent="center"
            margin={3}
            bgcolor="white"
            border="3px solid black"
            borderRadius={5}
          >
            <Typography variant="h2">{getCategory(category)}</Typography>
          </Box>
          <Box
            width="70%"
            display="flex"
            justifyContent="space-evenly"
            margin={3}
            p={3}
            bgcolor="white"
            border="3px solid black"
            borderRadius={5}
          >
            <Typography variant="h4">
              {/*TODO: Capitalize first letter */}
              {`Genre: ${
                genresMap.find((element) => element.value === category)?.header
              }`}
            </Typography>
            <Typography variant="h4">
              {/*TODO: Capitalize first letter */}
              {`Question ${difficulty[1]}`}
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
            bgcolor={"white"}
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
