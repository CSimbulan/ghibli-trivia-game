import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CountDown from "../CountDown";
import { general_questions_action } from "./general_action";
import { green } from "@mui/material/colors";

interface GeneralKnowledgeProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
  question: any; //change
}

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({
  category,
  genre,
  difficulty,
  scores,
  onPlayerButtonClick,
  question,
}) => {
  const [questionTimer, setQuestionTimer] = useState(true);
  const [reveal, setReveal] = useState(false);

  return (
    <>
      <Box
        border="3px solid black"
        borderRadius={"20px"}
        display="flex"
        justifyContent="center"
        padding={3}
      >
        <Typography variant="h2">{question.question}</Typography>
      </Box>
      {question.type !== "regular" && question.options &&  (
        <Box
          border="3px solid black"
          borderRadius={"20px"}
          display="flex"
          justifyContent="center"
          padding={3}
          width="80%"
        >
          <Grid container>
            {question.options.map(
              (
                option:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined
              ) => (
                <Grid item xs={6} style={{backgroundColor: (reveal && option === question.correct_option) ? green[500] : 'white'  }}>
                  <Typography variant="h3">{option}</Typography>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      )}
      <Box width="100%" display="flex" justifyContent="center">
        {questionTimer ? (
          <>
            <CountDown
              seconds={30}
              onCountdownEnd={() => setQuestionTimer(false)}
            ></CountDown>
          </>
        ) : (
          <Typography variant="h2">Times up!</Typography>
        )}
      </Box>
      {!reveal && question.type !== 'regular' && (
          <Button
          variant="contained"
          onClick={() => setReveal(!reveal)}
          style={{ width: "20%" }}
        >
          Reveal
        </Button>
        )}
      <Box width="100%" display="flex" justifyContent="space-around">
        {scores.map((player) => (
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => onPlayerButtonClick(player.player)}
          >
            {`Player ${player.player}`}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default GeneralKnowledge;
