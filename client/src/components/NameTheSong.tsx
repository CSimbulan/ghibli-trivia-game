import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CountDown from "./CountDown";
import { red } from "@mui/material/colors";
import { musicQuestions } from "../questions/name_the_song/nameTheSong";

interface NameTheSongProps {
  category: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
}

export const indexMap: {
  [key: string]: any;
} = {
  q1: 0,
  q2: 1,
  q3: 2,
  q4: 3,
  q5: 4
}



const NameTheSong: React.FC<NameTheSongProps> = ({
  category,
  difficulty,
  scores,
  onPlayerButtonClick,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(true);

  const questions = musicQuestions;
  const question = questions.find(q => q.id === difficulty)!!;

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current?.volume) {
      audioRef.current.volume = 0.6;
    }
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
      width="90%"
      border="3px solid black"
      borderRadius={5}
      bgcolor={'white'}
    >
      <Box
        width="33%"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {/* {questionTimer ? (
          <>
            <CountDown
              seconds={30}
              onCountdownEnd={() => {
                setQuestionTimer(false);
                setReveal(false);
              }}
            ></CountDown>
          </>
        ) : (
          <Typography variant="h2">Times up!</Typography>
        )} */}
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
            {/* <Typography variant="h4"  style={{margin: 16}}>
              {`Artist: ${question.artist}`}
            </Typography>
            <Typography variant="h4"  style={{margin: 16}}> 
              {`Anime: ${question.anime}`}
            </Typography> */}
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
    <audio ref={audioRef} loop src={process.env.PUBLIC_URL + question.url}/>
  </>

  );
};

export default NameTheSong;
