import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface actionModalProps {
  player: any;
  handlePlayerAction: (isDone: boolean) => void;
}

export const ActionModal = ({player, handlePlayerAction}: actionModalProps) => (
  <View style={styles.modalContent}>
    <Text style={styles.modalText}>
      {player.name}, as-tu fait ton action/gage ?
    </Text>
    <View style={styles.playersContainer}>
      <TouchableOpacity
        style={styles.buttonYes}
        onPress={() => handlePlayerAction(true)}>
        <Text style={styles.playerText}>Oui</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonNo}
        onPress={() => handlePlayerAction(false)}>
        <Text style={styles.playerText}>Non</Text>
      </TouchableOpacity>
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
    fontFamily: 'poetsenone_regular',
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
  buttonYes: {
    backgroundColor: '#35c224',
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: '40%',
  },
  buttonNo: {
    backgroundColor: '#FF0000',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
