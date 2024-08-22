import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface distributeModalProps {
  players: any[];
  currentCard: any;
  handleDistribute: (index: number) => void;
}

export const DistributeModal = ({
  players,
  currentCard,
  handleDistribute,
}: distributeModalProps) => (
  <View style={styles.modalContent}>
    <Text style={styles.modalText}>
      À qui veux-tu donner ces {currentCard.drink} gorgées ?
    </Text>
    <View style={styles.playersContainer}>
      {players.map((player, index) => (
        <TouchableOpacity
          key={index}
          style={styles.playerOption}
          onPress={() => handleDistribute(index)}>
          <Image source={player.avatar} style={styles.avatar} />
          <Text style={styles.playerText}>{player.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});
