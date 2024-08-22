import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface choiceModalProps {
  players: any[];
  selectedPlayer: number | null;
  setSelectedPlayer: (index: number) => void;
  handleChoiceValidation: () => void;
}
export const ChoiceModal = ({
  players,
  selectedPlayer,
  setSelectedPlayer,
  handleChoiceValidation,
}: choiceModalProps) => (
  <View style={styles.modalContent}>
    <Text style={styles.modalText}>
      Cette carte vise une seule personne. Qui a bu ?
    </Text>
    <View style={styles.playersContainer}>
      {players.map((player, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.playerOption,
            selectedPlayer === index && styles.selectedPlayerOption,
          ]}
          onPress={() => setSelectedPlayer(index)}>
          <Image source={player.avatar} style={styles.avatar} />
          <Text style={styles.playerText}>{player.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
    {selectedPlayer !== null && (
      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleChoiceValidation}>
        <Text style={styles.modalButtonText}>Valider</Text>
      </TouchableOpacity>
    )}
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
  selectedPlayerOption: {
    borderColor: '#bd47d8',
    borderWidth: 2,
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
});
