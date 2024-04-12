import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import CountDown from "./CountDown";
import { indexMap } from "./NameTheSong";
import ReactPlayer from "react-player";
import { voiceQuestions } from "../questions/character_voice/character_voice";

interface CharacterVoiceProps {
  category: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
}

const CharacterVoice: React.FC<CharacterVoiceProps> = ({
  category,
  difficulty,
  scores,
  onPlayerButtonClick,
}) => {
  const [reveal, setReveal] = useState(false);
  const [slide, setSlide] = useState(0);

  const questions = voiceQuestions;
  const question = questions.find(q => q.id === difficulty)!!;

  const onClickBack = () => {
    setSlide(slide - 1);
  };

  const onClickNext = () => {
    setSlide(slide + 1);
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
        bgcolor={"white"}
      >
        <Box
          width="33%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >

        </Box>

        <IconButton onClick={onClickBack} disabled={slide === 0}>
          <ArrowBack />
        </IconButton>
        <Box
          height="100%"
          width="60%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {slide == 0 ? (
            <ReactPlayer
              url={`${process.env.PUBLIC_URL + question.video1}`}
              controls
            />
          ) : (
            <ReactPlayer
              url={`${process.env.PUBLIC_URL + question.video2}`}
              controls
            />
          )}
        </Box>
        <IconButton onClick={onClickNext} disabled={slide === 1}>
          <ArrowForward />
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
              <Typography variant="h4" style={{ margin: 16 }}>
                Answer:
              </Typography>

              <Typography variant="h4" style={{ margin: 16 }}>
                {question.character}
              </Typography>
              <Typography variant="h5" style={{ margin: 16 }}>
                {`Source: ${question.source}`}
              </Typography>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setReveal(!reveal);
                onClickNext();
              }}
              style={{ width: "20%" }}
            >
              Reveal
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CharacterVoice;
