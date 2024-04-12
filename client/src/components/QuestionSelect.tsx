import { Box, Grid, IconButton, Typography, styled } from "@mui/material";
import { green, red, orange, blue, deepPurple } from "@mui/material/colors";
import React from "react";
import { GameType } from "../App";

const bgMultipleChoice = green[500];
const bgWhichMovie = blue[500];
const bgSong = red[800];
const bgCharacter = deepPurple[500];

const categoryMap: {
  [key: string]: string[];
} ={
  multipleChoice: ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20"],
  whichMovie: ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10", "q11", "q12"],
  nameTheSong: ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10"],
  characterVoice: ["q1","q2","q3","q4","q5","q6", "q7"],
}

const bgMap: {
  [key: string]: any;
} = {
  multipleChoice: bgMultipleChoice,
  whichMovie: bgWhichMovie,
  nameTheSong: bgSong,
  characterVoice: bgCharacter,
}

interface QuestionSelectProps {
  category: string;
  game: any;
  setCurrentQuestion: (
    category: string,
    difficulty: string
  ) => void;
}

const DifficultyButton = styled(IconButton)({
  aspectRatio: "1 / 1",
  width: "50%",
  color: "white",
  "&:disabled": {
    backgroundColor: "lightgray !important",
    color: "gray",
  },
  border: "1px solid black",
  borderRadius: "5px !important",
  zIndex:9999,
});




const QuestionSelect: React.FC<QuestionSelectProps> = ({
  category,
  game,
  setCurrentQuestion,
}) => {
  return (
    <>
      {console.log(game)}
      {game[category] && (
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignContent={"center"}
          justifyContent={"top"}
          width={"100%"}
          height="100%"
        >
          <Grid container>
            {
              categoryMap[category].map(question => (
                <Grid item xs={4}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  margin={2}
                >
                  <DifficultyButton
                    style={{background: bgMap[category]}}
                    onClick={() => setCurrentQuestion(category, question)}
                    disabled={game[category][question] === 0}
                  >
                    <Typography variant="h5">{question.slice(1)}</Typography>
                  </DifficultyButton>
                </Box>
              </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default QuestionSelect;
