import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface choooseModalProps {
  players: any[];
  selectedPlayers: number[];
  setSelectedPlayers: (index: (prevSelected: any) => any) => void;
  setNoOneSelected: (noOneSelected: boolean) => void;
  handleValidation: () => void;
}
export const ChooseModal = ({
  players,
  selectedPlayers,
  setSelectedPlayers,
  setNoOneSelected,
  handleValidation,
}: choooseModalProps) => {
  const togglePlayerSelection = (playerID: number) => {
    setSelectedPlayers(prevSelected =>
      prevSelected.includes(playerID)
        ? prevSelected.filter((i: number) => i !== playerID)
        : [...prevSelected, playerID],
    );
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>
        Cette carte vise plusieurs personnes. Qui a bu ?
      </Text>
      <View style={styles.playersContainer}>
        {players.map((player, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.playerOption,
              selectedPlayers.includes(index) && styles.selectedPlayerOption,
            ]}
            onPress={() => togglePlayerSelection(index)}>
            <Image source={player.avatar} style={styles.avatar} />
            <Text style={styles.playerText}>{player.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          key={-2}
          style={[styles.playerOption]}
          onPress={() => {
            setNoOneSelected(true);
            handleValidation();
          }}>
          <Text style={styles.playerText}>Personne !</Text>
        </TouchableOpacity>
      </View>
      {selectedPlayers.length > 0 && (
        <TouchableOpacity style={styles.modalButton} onPress={handleValidation}>
          <Text style={styles.modalButtonText}>Valider</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

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
