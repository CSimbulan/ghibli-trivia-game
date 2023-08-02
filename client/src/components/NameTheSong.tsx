import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CountDown from "./CountDown";

interface NameTheSongProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
}

const NameTheSong: React.FC<NameTheSongProps> = ({
  category,
  genre,
  difficulty,
  scores,
  onPlayerButtonClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(true);

  const audio = new Audio(
    process.env.PUBLIC_URL + "/music/LiSa - Catch the Moment.mp3"
  );

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [isPlaying]);

  return (

    <>
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      padding={3}
      height="50%"
      width="100%"
    >
      <Box
        width="33%"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {questionTimer ? (
          <>
            <CountDown
              seconds={30}
              onCountdownEnd={() => {
                setQuestionTimer(false);
                setReveal(true);
              }}
            ></CountDown>
          </>
        ) : (
          <Typography variant="h2">Times up!</Typography>
        )}
      </Box>

      <IconButton onClick={toggleAudio}>
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButton>

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
            <Typography variant="h3">
              {'Catch the Moment by LiSa'}
            </Typography>
            <Typography variant="h3">
              {'SAO'}
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => setReveal(!reveal)}
            style={{ width: "20%" }}
          >
            Reveal
          </Button>
        )}
      </Box>
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

export default NameTheSong;
