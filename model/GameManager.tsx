import React, {createContext, useState, useContext, ReactNode} from 'react';

export interface Player {
  id: number;
  name: string;
  score: number;
  avatar: any;
  drinkNumber: number;
}

interface GameManager {
  gameMode: string;
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  removeLastPlayer: () => void;
  updatePlayerName: (id: number, name: string) => void;
  updatePlayerAvatar: (playerId: number, avatar: any) => void;
  incrementCardCount: () => void;
  decrementCardCount: () => void;
  cardsRemaining: number;
  setCardsRemaining: (count: number) => void;
  gameTime: number;
  setGameMode: (mode: string) => void;
  setGameTime: (time: number) => void;
  scores: {[key: number]: number};
  addScore: (playerId: number, amount: number) => void;
  updateDrinkNumber: (playerId: number, amount: number) => void;
  updateAllOtherPlayersDrinkNumber: (playerId: number, amount: number) => void;
  reset: () => void;
  resetPlayer: () => void;
}

const GameManagerContext = createContext<GameManager | undefined>(undefined);

export const GameManagerProvider = ({children}: {children: ReactNode}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [cardsRemaining, setCardsRemaining] = useState(30);
  const [gameTime, setGameTime] = useState(0);
  const [scores, setScores] = useState<{[key: number]: number}>({});
  const [gameMode, setGameMode] = useState<string>('CLASSIC');

  const resetPlayer = () => {
    setPlayers([]);
  };

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter(p => p.id !== id));
  };
  const removeLastPlayer = () => {
    if (players.length > 0) {
      setPlayers(players.slice(0, -1));
    }
  };
  const updatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(p => (p.id === id ? {...p, name} : p)));
  };

  const incrementCardCount = () => {
    setCardsRemaining(cardsRemaining + 1);
  };

  const decrementCardCount = () => {
    setCardsRemaining(cardsRemaining - 1);
  };
  const addScore = (playerId: number, amount: number) => {
    setScores({
      ...scores,
      [playerId]: (scores[playerId] || 0) + amount,
    });
  };
  const updateDrinkNumber = (playerId: number, amount: number) => {
    setPlayers(
      players.map(p =>
        p.id === playerId ? {...p, drinkNumber: p.drinkNumber + amount} : p,
      ),
    );
  };

  const updatePlayerAvatar = (playerId: number, avatar: any) => {
    setPlayers(players.map(p => (p.id === playerId ? {...p, avatar} : p)));
  };
  const updateAllOtherPlayersDrinkNumber = (
    playerId: number,
    amount: number,
  ) => {
    setPlayers(
      players.map(p =>
        p.id !== playerId ? {...p, drinkNumber: p.drinkNumber + amount} : p,
      ),
    );
  };

  const reset = () => {
    setPlayers([]);
    setCardsRemaining(30);
    setGameTime(0);
    setScores({});
  };

  return (
    <GameManagerContext.Provider
      value={{
        players,
        gameMode,
        setGameMode,
        updatePlayerAvatar,
        addPlayer,
        removePlayer,
        removeLastPlayer,
        updatePlayerName,
        cardsRemaining,
        incrementCardCount,
        decrementCardCount,
        setCardsRemaining,
        gameTime,
        setGameTime,
        scores,
        addScore,
        updateDrinkNumber,
        updateAllOtherPlayersDrinkNumber,
        reset,
        resetPlayer,
      }}>
      {children}
    </GameManagerContext.Provider>
  );
};

export const useGameManager = () => {
  const context = useContext(GameManagerContext);
  if (context === undefined) {
    throw new Error('useGameManager must be used within a GameManagerProvider');
  }
  return context;
};
