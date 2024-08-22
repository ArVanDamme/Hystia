import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  logoHeight3,
  logoHeight4, logoHeight5, logoHeight8,
  logoWidth30, logoWidth40, logoWidth50
} from "../utils/DimensionsUtils.tsx";

interface PlayerCounterProps {
  addPlayer: () => void;
  removePlayer: () => void;
}
const PlayerCounter = ({addPlayer, removePlayer}: PlayerCounterProps) => {
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const increasePlayers = () => {
    setNumberOfPlayers(prev => prev + 1);
    addPlayer();
  };

  const decreasePlayers = () => {
    if (numberOfPlayers > 1) {
      setNumberOfPlayers(prev => prev - 1);
      removePlayer();
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.number}>Nombre de Joueurs</Text>
      <View style={styles.containerPlayerCount}>
        <TouchableOpacity onPress={decreasePlayers} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.separator}>
          <Text style={styles.number}>{numberOfPlayers}</Text>
        </View>
        <TouchableOpacity onPress={increasePlayers} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  containerPlayerCount: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: logoWidth50,
    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#DDDDDD',
    width: logoHeight5,
    height: logoHeight5,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  separator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: logoHeight8,
    marginHorizontal: 20,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#eee',
  },
});

export default PlayerCounter;
