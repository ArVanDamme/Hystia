import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {logoHeight5, logoWidth20} from '../../utils/DimensionsUtils.tsx';
import {useGameManager} from '../../model/GameManager.tsx';

const listCardNumber = [
  {label: '10 Cartes', value: 10},
  {label: '20 Cartes', value: 20},
  {label: '30 Cartes', value: 30},
  {label: '50 Cartes', value: 60},
  {label: '100 Cartes', value: 90},
];
const RadioGroup = () => {
  const [index, setIndex] = useState(0);
  const {setCardsRemaining} = useGameManager();

  const handleNextTitle = () => {
    setIndex(prevIndex =>
      prevIndex === listCardNumber.length - 1 ? 0 : prevIndex + 1,
    );
    setCardsRemaining(listCardNumber[index].value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.radio} onPress={() => handleNextTitle()}>
        <Text style={styles.label}>{listCardNumber[index].label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  radio: {
    position: 'relative',
    height: logoHeight5,
    width: logoWidth20,
    backgroundColor: '#1b0030',
    borderColor: '#840dad',
    borderWidth: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#840dad',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 7,
    elevation: 7,
  },
  label: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RadioGroup;
