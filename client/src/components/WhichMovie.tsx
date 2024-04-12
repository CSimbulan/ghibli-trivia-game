import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CountDown from "./CountDown";
import { green } from "@mui/material/colors";
import { whichMovieQuestions } from "../questions/which_movie/which_movie";

interface WhichMovieProps {
  category: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
}

const questions = whichMovieQuestions;

const WhichMovie: React.FC<WhichMovieProps> = ({
  category,
  difficulty,
  scores,
  onPlayerButtonClick,
}) => {
  const [questionTimer, setQuestionTimer] = useState(true);
  const [reveal, setReveal] = useState(false);

  const [hint, setHint] = useState(false);

  const question = questions.find(q => q.id === difficulty);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={"column"}
        alignItems="center"
        padding={3}
        height="70%"
        width="90%"
        border="3px solid black"
        borderRadius={5}
        bgcolor={"white"}
        position={"relative"}
      >
        <Box
          width="33%"
          display="flex"
          justifyContent="right"
          alignItems="center"
          position={"absolute"}
          bottom={0}
          right={0}
          padding={1}
        >
          {questionTimer ? (
            <>
              <CountDown
                seconds={30}
                onCountdownEnd={() => {
                  setQuestionTimer(false);
                  setReveal(reveal);
                }}
              ></CountDown>
            </>
          ) : (
            <Typography variant="h2">Times up!</Typography>
          )}
        </Box>
        <Box height="50%">
        <img
          src={process.env.PUBLIC_URL + '/questions_media/ghibli_picture/' + question?.image}
          height="100%"
        />
        </Box>
        <Box>
            <Grid container>
                <Grid item xs={6} padding={3}>
                    <Typography variant="h3" color={reveal && question?.correct === 0 ? green[500] : "black"}>
                        {"A.) " + question?.answers[0]}
                    </Typography>
                </Grid>
                <Grid item xs={6} padding={3}>
                    <Typography variant="h3" color={reveal && question?.correct === 1 ? green[500] : "black"}>
                        {"B.) " + question?.answers[1]}
                    </Typography>
                </Grid>
                <Grid item xs={6} padding={3}>
                    <Typography variant="h3" color={reveal && question?.correct === 2 ? green[500] : "black"}>
                        {"C.) " + question?.answers[2]}
                    </Typography>
                </Grid>
                <Grid item xs={6} padding={3}>
                    <Typography variant="h3" color={reveal && question?.correct === 3 ? green[500] : "black"}>
                        {"D.) " + question?.answers[3]}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width="33%"
        >
          {reveal ? (
            <>
              <Typography variant="h3" style={{ marginBottom: 32 }}>
              </Typography>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => setReveal(!reveal)}
                style={{ width: "20%", marginBottom: 32 }}
              >
                Reveal
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default WhichMovie;
