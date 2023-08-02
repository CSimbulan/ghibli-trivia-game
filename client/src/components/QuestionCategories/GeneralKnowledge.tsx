import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CountDown from "../CountDown";

interface GeneralKnowledgeProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
}

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({
  category,
  genre,
  difficulty,
  scores,
  onPlayerButtonClick,
}) => {
  const [questionTimer, setQuestionTimer] = useState(true);

  return (
    <>
      <Box
        border="3px solid black"
        borderRadius={"20px"}
        display="flex"
        justifyContent="center"
        padding={3}
      >
        <Typography variant="h1">Q: Name an Anime Action Series</Typography>
      </Box>
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
