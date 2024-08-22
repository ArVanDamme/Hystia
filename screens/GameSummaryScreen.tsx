import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useGameManager} from '../model/GameManager.tsx';

const GameSummaryScreen = () => {
  const {players, cardsRemaining} = useGameManager();
  const navigation = useNavigation();

  const goToPlayerManagement = () => {
    navigation.navigate('PlayerManagement');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Summary</Text>
      <Text style={styles.summaryText}>Cards Remaining: {cardsRemaining}</Text>
      <Text style={styles.summaryText}>Players:</Text>
      {players.map(player => (
        <Text key={player.id} style={styles.playerSummaryText}>
          {player.name} - Score: {player.score}, Drinks: {player.drinkNumber}
        </Text>
      ))}
      <Button
        title="Back to Player Management"
        onPress={goToPlayerManagement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 10,
  },
  playerSummaryText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default GameSummaryScreen;
