import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown";
import { music_questions_action } from "./QuestionCategories/music_action";

interface NameTheSongProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
  question: any;//change
}

const NameTheSong: React.FC<NameTheSongProps> = ({
  category,
  genre,
  difficulty,
  scores,
  onPlayerButtonClick,
  question
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false)
    } else {
        audioRef.current?.play();
        setIsPlaying(true)
    }
  };

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
            <Typography variant="h4" style={{margin: 16}}>
              {`Song: ${question.song}`}
            </Typography>
            <Typography variant="h4"  style={{margin: 16}}>
              {`Artist: ${question.artist}`}
            </Typography>
            <Typography variant="h4"  style={{margin: 16}}> 
              {`Anime: ${question.anime}`}
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
    <audio ref={audioRef} loop src={process.env.PUBLIC_URL + question.url}/>
  </>

  );
};

export default NameTheSong;
