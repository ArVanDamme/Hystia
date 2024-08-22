import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGameManager} from '../model/GameManager';
import {Card, CardAction, useCardManager} from '../model/CardManager';
import {imageMap} from '../components/Cards/CardItem';
import {DistributeModal} from '../components/modals/DistributeModal';
import {ChoiceModal} from '../components/modals/ChoiceModal.tsx';
import {ChooseModal} from '../components/modals/ChooseModal.tsx';
import {ActionModal} from '../components/modals/ActionModal';

const {width: screenWidth} = Dimensions.get('window');
const percentageOfScreen = 0.8;
const imageRatio = 768 / 1064;
const imageWidth = screenWidth * percentageOfScreen;
const imageHeight = imageWidth / imageRatio;

const GameScreen = () => {
  const {players, cardsRemaining, setCardsRemaining, gameMode} =
    useGameManager();
  const {getCardWithGameMode} = useCardManager();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardsDeck, setCardsDeck] = useState<Card[] | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [noOneSelected, setNoOneSelected] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!cardsDeck) {
      const deck = getCardWithGameMode(gameMode);
      setCardsDeck(deck);
      drawCard(deck);
    }
  }, [cardsDeck, gameMode, getCardWithGameMode]);

  const drawCard = (deck: Card[] | null, isNewPlayer = true) => {
    if (!deck || cardsRemaining <= 0) {
      navigation.navigate('GameSummary');
      return;
    }
    const drawnCard = deck[Math.floor(Math.random() * deck.length)];
    setCurrentCard(drawnCard);
    setCardsRemaining(cardsRemaining - 1);
    if (isNewPlayer) {
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['0deg', '90deg', '180deg'],
        }),
      },
    ],
    backfaceVisibility: 'hidden' as const,
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['180deg', '270deg', '360deg'],
        }),
      },
    ],
    position: 'absolute' as const,
    top: 0,
    backfaceVisibility: 'hidden' as const,
  };

  const handleNext = () => setIsModalVisible(true);

  const closeModal = () => {
    setIsModalVisible(false);
    if (currentCard?.action === CardAction.PICK) {
      drawCard(cardsDeck, false);
    }
    drawCard(cardsDeck);
  };

  const ModalContent = () => {
    if (!currentCard) {
      return null;
    }

    const handleDistribute = (playerID: number) => {
      players[playerID].drinkNumber += currentCard.drink;
      closeModal();
    };

    const handleChoiceValidation = () => {
      if (selectedPlayer !== null) {
        players[selectedPlayer].drinkNumber += currentCard.drink;
        resetSelections();
        closeModal();
      }
    };

    const handleValidation = () => {
      if (noOneSelected) {
        closeModal();
        setNoOneSelected(false);
        return;
      }
      selectedPlayers.forEach(playerID => {
        players[playerID].drinkNumber += currentCard.drink;
      });
      resetSelections();
      closeModal();
    };

    const handlePlayerAction = (isDone: boolean) => {
      if (isDone) {
        resetSelections();
      } else {
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      }
      closeModal();
    };

    const resetSelections = () => {
      setSelectedPlayer(null);
      setSelectedPlayers([]);
    };

    switch (currentCard.action) {
      case CardAction.DRINK:
        players[currentPlayerIndex].drinkNumber += currentCard.drink;
        closeModal();
        return null;

      case CardAction.DISTRIBUTE:
        return (
          <DistributeModal
            players={players}
            currentCard={currentCard}
            handleDistribute={handleDistribute}
          />
        );

      case CardAction.CHOICE:
      case CardAction.DRINK_DICE_GAME:
      case CardAction.DRINK_DICE:
        return (
          <ChoiceModal
            players={players}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            handleChoiceValidation={handleChoiceValidation}
          />
        );

      case CardAction.CHOOSE:
        return (
          <ChooseModal
            players={players}
            selectedPlayers={selectedPlayers}
            setSelectedPlayers={setSelectedPlayers}
            setNoOneSelected={setNoOneSelected}
            handleValidation={handleValidation}
          />
        );

      case CardAction.ACTION:
        return (
          <ActionModal
            player={players[currentPlayerIndex]}
            handlePlayerAction={handlePlayerAction}
          />
        );

      default:
        return <Text style={styles.modalText}>Carte inconnue.</Text>;
    }
  };

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/background/4882552_29948.jpg')}
        style={styles.background}>
        {currentCard && (
          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={flipCard} style={styles.card2}>
              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <View style={styles.cardInfo}>
                  <Image
                    source={imageMap[currentCard.path]}
                    style={styles.cardImage}
                  />
                </View>
              </Animated.View>
              <Animated.View style={[styles.card, backAnimatedStyle]}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>
                    {currentCard.description}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ModalContent />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 16,
    width: imageWidth,
    height: imageHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 27, 45, 1)',
    borderColor: '#bd47d8',
    borderWidth: 2,
    backfaceVisibility: 'hidden',
  },
  card2: {
    marginVertical: 20,
    padding: 10,
    borderRadius: 16,
    width: imageWidth,
    height: imageHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: '90%',
    borderRadius: 12,
  },
  cardImage: {
    borderRadius: 10,
    width: imageWidth,
    height: imageHeight,
  },
  cardTitle: {
    fontFamily: 'poetsenone_regular',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(22, 27, 45, 1)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'poetsenone_regular',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(22, 27, 45, 1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  playerOption: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedPlayerOption: {
    borderColor: '#bd47d8',
    borderWidth: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 30,
    marginBottom: 10,
  },
  playerText: {
    fontSize: 16,
    color: '#ffffff',
  },
  modalButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#bd47d8',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'poetsenone_regular',
  },
  buttonYes: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonNo: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default GameScreen;
