import React, {createContext, useContext, useState, ReactNode} from 'react';
import {getCards} from '../utils/CardUtils.tsx';

/**
 * Type pour une carte
 * @interface Card
 * @property {number} id - L'identifiant de la carte
 * @property {string} title - Le titre de la carte
 * @property {string} path - Le chemin de la carte
 * @property {boolean} seen - Indique si la carte a été vue
 */
export interface Card {
  id: number;
  title: string;
  description: string;
  path: string;
  seen: boolean;
  drink: number;
  action: CardAction;
  mode: CardGameMode[];
  rarity?: number;
}

export enum CardAction {
  DRINK = 'drink',
  REVERSE = 'reverse',
  PICK = 'pick',
  CHOOSE = 'choose',
  DISTRIBUTE = 'distribute',
  GLOBAL_DRINK = 'global_drink',
  PASS = 'pass',
  SAFE = 'safe',
  DRINK_DICE = 'drink_dice',
  DRINK_DICE_GAME = 'drink_dice_game',
  ACTION = 'action',
  CHOICE = 'choice',
  COUPLE = 'couple',
}

export enum CardGameMode {
  CLASSIC = 'classic',
  HOT = 'hot',
  WHO = 'who',
}

/**
 * Type pour le contexte du gestionnaire de cartes
 * @interface CardManagerContextType
 * @property {Card[]} cards - Les cartes
 * @property {(id: number) => void} markCardAsSeen - Marquer une carte comme vue
 * @property {Card[]} unseenCards - Les cartes non vues
 */
interface CardManagerContextType {
  cards: Card[];
  markCardAsSeen: (id: number) => void;
  unseenCards: Card[];
  getCardWithGameMode: (mode: string) => Card[];
}

export const CardManagerContext = createContext<
  CardManagerContextType | undefined
>(undefined);
export const CardManagerProvider = ({children}: {children: ReactNode}) => {
  const [cards, setCards] = useState<Card[]>(getCards);

  const markCardAsSeen = (id: number) => {
    setCards(prevCards =>
      prevCards.map(card => (card.id === id ? {...card, seen: true} : card)),
    );
  };

  const getCardWithGameMode = (mode: string) => {
    if (cards.length === 0) {
      console.log('No cards found');
      return [];
    }
    switch (mode) {
      case 'CLASSIC':
        return cards.filter(card => card.mode.includes(CardGameMode.CLASSIC));
      case 'HOT':
        return cards.filter(card => card.mode.includes(CardGameMode.HOT));
      case 'WHO':
        return cards.filter(card => card.mode.includes(CardGameMode.WHO));
      case 'ALL':
        return cards;
      default:
        return cards;
    }
  };

  const unseenCards = cards.filter(card => !card.seen);

  return (
    <CardManagerContext.Provider
      value={{cards, markCardAsSeen, unseenCards, getCardWithGameMode}}>
      {children}
    </CardManagerContext.Provider>
  );
};

export const useCardManager = () => {
  const context = useContext(CardManagerContext);
  if (!context) {
    throw new Error('useCardManager must be used within a CardManagerProvider');
  }
  return context;
};
