import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import Initialize from "./components/main/Initialize";
import GameBoard from "./components/GameBoard";
import Question from "./components/Question";

export interface GameType {
  playerCount: number;
  state: string;
  game_board: any;
  scores: { player: number; score: number }[];
  currentQuestion: {
    category: string;
    difficulty: string;
  };
}

const defaultGameBoard: GameType = {
  playerCount: 0,
  state: "started",
  game_board: {

    multipleChoice: {
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
      q8: 1,
      q9: 1,
      q10: 1,
      q11: 1,
      q12: 1,
      q13: 1,
      q15: 1,
      q16: 1,
      q17: 1,
      q18: 1,
      q19: 1,
      q20: 1,
    },

    whichMovie: {
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
      q8: 1,
      q9: 1,
      q10: 1,
      q11: 1,
      q12: 1,
    },

    nameTheSong: {
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
      q8: 1,
      q9: 1,
      q10: 1,
    },

    characterVoice: {
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
    },
  },
  scores: [],
  currentQuestion: {
    category: "",
    difficulty: "easy",
  },
};

function App() {
  const [game, setGame] = useState<GameType>(defaultGameBoard);

  const updateGameBoard = (
    category: string,
    difficulty: string
  ) => {
    setGame((prev) => ({
      ...prev,
      game_board: {
        ...prev.game_board,
        [category]: {
          ...prev.game_board[category], [difficulty]: 0 ,
        },
      },
    }));
  };

  const setCurrentQuestion = (
    category: string,
    difficulty: string
  ) => {
    setGame((prev) => ({
      ...prev,
      currentQuestion: {
        category,
        difficulty,
      },
    }));
  };

  const updateScore = (player: number, amount: number) => {
    const temp = game.scores.map((p) =>
      p.player === player ? { ...p, score: p.score + amount } : p
    );
    setGame((prev) => ({
      ...prev,
      scores: temp,
    }));
  };

  const restartScore = () => {
    const temp = game.scores.map((p) => ({ ...p, score: 0 }));
    setGame((prev) => ({
      ...prev,
      scores: temp,
    }));
  };

  const addPlayer = () => {
    const temp = game.scores;
    temp.push({ player: temp.length + 1, score: 0 });
    setGame((prev) => ({
      ...prev,
      scores: temp,
    }));
  };

  const removePlayer = () => {
    const temp = game.scores.slice(0, -1);
    setGame((prev) => ({
      ...prev,
      scores: temp,
    }));
  };

  const initializePlayerCount = (count: number) => {
    let scoresArray = [];
    for (var i = 1; i <= count; i++) {
      scoresArray.push({ player: i, score: 0 });
    }
    setGame({
      ...game,
      playerCount: count,
      state: "started",
      scores: scoresArray,
    });
  };

  const returnToGameBoard = () => {
    setGame((prev) => ({
      ...prev,
      currentQuestion: {
        category: "",
        genre: "",
        difficulty: "easy",
      },
    }));
  };

  return (
    <Box
      height="100vh"
      width="100%"
      margin="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/logo-color.png)`,
        backgroundSize: '10%'
      }}
    >
      {game.state === "not-started" ? (
        <Initialize initializePlayerCount={initializePlayerCount}></Initialize>
      ) : game.currentQuestion.category ? (
        <Question
          category={game.currentQuestion.category}
          difficulty={game.currentQuestion.difficulty}
          scores={game.scores}
          updateScore={updateScore}
          returnToGameBoard={returnToGameBoard}
          updateGameBoard={updateGameBoard}
        />
      ) : (
        <GameBoard
          game={game}
          updateGameBoard={updateGameBoard}
          setCurrentQuestion={setCurrentQuestion}
          updateScore={updateScore}
          restartScore={restartScore}
          addPlayer={addPlayer}
          removePlayer={removePlayer}
        ></GameBoard>
      )}
    </Box>
  );
}

export default App;
