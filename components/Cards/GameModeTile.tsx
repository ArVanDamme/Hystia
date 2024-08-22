import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {imageMap} from './CardItem.tsx';

interface GameModeTileProps {
  color: string;
  title: string;
  description: string;
  trashRating: number;
  funRating: number;
  isSelected: boolean;
  onPress: () => void;
}

const setColorMatch = (color: string) => {
  switch (color) {
    case '#f71625':
      return '🔴';
    case '#1647f7':
      return '🔵';
    case '#11ed11':
      return '🟢';
    case '#ebd409':
      return '🟡';
    case '#f043c7':
      return '🟣';
    case '#eb5109':
      return '🟠';
    default:
      return '⚪';
  }
};

const setImages = (path: string) => {
  switch (path) {
    case 'CLASSIC':
      return require('../../assets/mode/mode_CLASSIC.png');
    case 'WHO':
      return require('../../assets/mode/mode_WHO.png');
    case 'HOT':
      return require('../../assets/mode/mode_HOT.png');
    case 'ALL':
      return require('../../assets/mode/mode_ALL.png');
    default:
      return require('../../assets/mode/mode_CLASSIC.png');
  }
};

const GameModeTile = ({
  color,
  title,
  description,
  trashRating,
  funRating,
  isSelected,
  onPress,
}: GameModeTileProps) => {
  const [dot, setDot] = useState('⚫');

  useEffect(() => {
    setDot(setColorMatch(color));
  }, [color, title]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        {borderColor: color},
        isSelected && styles.selectedCard,
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={setImages(title)}
          style={styles.titleImage}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.description, {color: color}]}>{description}</Text>
      <View style={{height: 20}} />
      <View style={styles.ratingContainer}>
        <Text style={[{color: color}, styles.ratingText]}>Trash Rating:</Text>
        <Text style={styles.ratingText}>
          {Array.from({length: trashRating}, (_, i) => (
            <Text key={i}>{dot}</Text>
          ))}
          {Array.from({length: 5 - trashRating}, (_, i) => (
            <Text key={i}>⚪</Text>
          ))}
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={[{color: color}, styles.ratingText]}>Fun Rating:</Text>
        <Text style={styles.ratingText}>
          {Array.from({length: funRating}, (_, i) => (
            <Text key={i}>{dot}</Text>
          ))}
          {Array.from({length: 5 - funRating}, (_, i) => (
            <Text key={i}>⚪</Text>
          ))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    backgroundColor: 'rgba(22, 27, 45, 1)',
  },
  selectedCard: {
    backgroundColor: 'rgba(9, 17, 20, 1)',
  },
  imageContainer: {
    alignItems: 'flex-start', // Align the image to the start of the container
    marginBottom: 10,
  },
  titleImage: {
    height: 25, // Fixed height
    width: '100%', // Let the width adjust automatically
  },
  description: {
    fontSize: 14,
    fontFamily: 'poetsenone_regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'poetsenone_regular',
  },
});

export default GameModeTile;
