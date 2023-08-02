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
    genre: string;
    difficulty: string;
  };
}

const defaultGameBoard: GameType = {
  playerCount: 0,
  state: "not-started",
  game_board: {
    general: {
      action: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      comedy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },

      fantasy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      sliceoflife: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      romance: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
    },

    character: {
      action: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      comedy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },

      fantasy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      sliceoflife: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      romance: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
    },

    song: {
      action: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      comedy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },

      fantasy: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      sliceoflife: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
      romance: {
        easy: 1,
        medium: 1,
        hard: 1,
      },
    },
  },
  scores: [],
  currentQuestion: {
    category: '',
    genre: '',
    difficulty: 'easy',
  },
};

function App() {
  const [game, setGame] = useState<GameType>(defaultGameBoard);

  const updateGameBoard = (
    category: string,
    genre: string,
    difficulty: string
  ) => {
    setGame((prev) => ({
      ...prev,
      game_board: {
        ...prev.game_board,
        [category]: {
          ...prev.game_board[category],
          [genre]: { ...prev.game_board[category][genre], [difficulty]: 0 },
        },
      },
    }));
  };

  const setCurrentQuestion = (
    category: string,
    genre: string,
    difficulty: string
  ) => {
    setGame((prev) => ({
      ...prev,
      currentQuestion: {
        category,
        genre,
        difficulty,
      },
    }));
  }

  const updateScore = (player: number, amount: number) => {
    const temp = game.scores.map(p => p.player === player ? {...p, score: p.score + amount} : p)
    setGame(prev => ({
      ...prev,
      scores: temp
    }))
  };

  const initializePlayerCount = (count: number) => {
    let scoresArray = []
    for (var i = 1; i <= count; i++){
      scoresArray.push({player: i, score: 0})
  }
    setGame({ ...game, playerCount: count, state: "started", scores: scoresArray });
  };

  const returnToGameBoard = () => {
    setGame(prev => ({
      ...prev,
      currentQuestion: {
        category: '',
        genre: '',
        difficulty: 'easy',
      }
    }))
  }

  return (
    <Box
      height="100vh"
      width="100%"
      margin="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {game.state === "not-started" ? (
        <Initialize initializePlayerCount={initializePlayerCount}></Initialize>
      ) : game.currentQuestion.category ? (
        <Question
          category={game.currentQuestion.category}
          genre={game.currentQuestion.genre}
          difficulty={game.currentQuestion.difficulty}
          scores={game.scores}
          updateScore={updateScore}
          returnToGameBoard={returnToGameBoard}
          updateGameBoard={updateGameBoard}
        />
      ) : (
        <GameBoard game={game} updateGameBoard={updateGameBoard} setCurrentQuestion={setCurrentQuestion}></GameBoard>
      )}
    </Box>
  );
}

export default App;
