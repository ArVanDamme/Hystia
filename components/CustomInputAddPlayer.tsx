import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import {logoHeight4, logoWidth70} from '../utils/DimensionsUtils.tsx';
import {Player, useGameManager} from '../model/GameManager.tsx';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

interface CustomInputProps {
  playerID: number;
  placeholder: string;
  value: string;
  isButtonAddPresent: boolean;
}

const CustomInput = ({
  playerID,
  placeholder,
  value,
  isButtonAddPresent,
}: CustomInputProps) => {
  const [newPlayerName, setNewPlayerName] = useState(value);
  const {updatePlayerName} = useGameManager();
  const navigation = useNavigation();
  const [playerPlaceholder, setPlayerPlaceholder] = useState(placeholder);

  const {addPlayer, removePlayer} = useGameManager();
  const handleAddPlayer = () => {
    if (!newPlayerName) {
      setPlayerPlaceholder('You must enter a name !');
      return;
    }
    const newPlayer: Player = {
      id: Date.now(),
      name: newPlayerName,
      score: 0,
      drinkNumber: 0,
    };
    addPlayer(newPlayer);
    setPlayerPlaceholder('Player Name');
    setNewPlayerName('');
  };
  const playerNameChange = (name: string) => {
    setNewPlayerName(name);
    if (playerID !== -1 && name == '') {
      removePlayer(playerID);
    }
    if (newPlayerName === '') {
      setPlayerPlaceholder('Player Name');
    }
  };

  // Animation values
  const buttonScale = useRef(new Animated.Value(1)).current;
  const buttonBackgroundColor = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonBackgroundColor, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonBackgroundColor, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.inputField}
        placeholder={playerPlaceholder}
        placeholderTextColor="rgb(184, 184, 184)"
        onChangeText={playerNameChange}
        value={newPlayerName}
      />
      {newPlayerName && isButtonAddPresent && (
        <Animated.View
          style={[styles.submitButton, {transform: [{scale: buttonScale}]}]}>
          <TouchableOpacity
            onPress={handleAddPlayer}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <LinearGradient
              colors={['#FC466B', '#3F5EFB']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradient}>
              <Text style={styles.submitText}>ADD</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: logoWidth70,
    height: logoHeight4,
    borderRadius: 10,
    backgroundColor: '#2E2E2E',
  },
  gradient: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  inputField: {
    flex: 1,
    padding: 8,
    color: 'white',
    fontSize: 24,
    width: '85%',
    height: '100%',
  },
  submitButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
    height: '100%',
    color: 'white',
  },
  submitText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
});

export default CustomInput;
