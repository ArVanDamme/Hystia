import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {logoHeight22, logoWidth30} from '../../utils/DimensionsUtils.tsx';

export const imageMap = {
  'Card1.jpg': require('../../assets/cards/Card1.jpg'),
  'Card2.jpg': require('../../assets/cards/Card2.jpg'),
  'Card3.jpg': require('../../assets/cards/Card3.jpg'),
  'Card4.jpg': require('../../assets/cards/Card4.jpg'),
  'Card5.jpg': require('../../assets/cards/Card5.jpg'),
  'Card6.jpg': require('../../assets/cards/Card6.jpg'),
  'Card7.jpg': require('../../assets/cards/Card7.jpg'),
  'Card8.jpg': require('../../assets/cards/Card8.jpg'),
  'Card9.jpg': require('../../assets/cards/Card9.jpg'),
  'Card10.jpg': require('../../assets/cards/Card10.jpg'),
  'Card11.jpg': require('../../assets/cards/Card11.jpg'),
  'Card12.jpg': require('../../assets/cards/Card12.jpg'),
  'Card13.jpg': require('../../assets/cards/Card13.jpg'),
  'Card14.jpg': require('../../assets/cards/Card14.jpg'),
  'Card15.jpg': require('../../assets/cards/Card15.jpg'),
  'Card16_2.jpg': require('../../assets/cards/Card16_2.jpg'),
  'Card16_3.jpg': require('../../assets/cards/Card16_3.jpg'),
  'Card16_4.jpg': require('../../assets/cards/Card16_4.jpg'),
  'Card16_5.jpg': require('../../assets/cards/Card16_5.jpg'),
  'Card17.jpg': require('../../assets/cards/Card17.jpg'),
  'Card18.jpg': require('../../assets/cards/Card18.jpg'),
  'Card19.jpg': require('../../assets/cards/Card19.jpg'),
  'Card20.jpg': require('../../assets/cards/Card20.jpg'),
  'Card21.jpg': require('../../assets/cards/Card21.jpg'),
  'Card22.jpg': require('../../assets/cards/Card22.jpg'),
  'Card23.jpg': require('../../assets/cards/Card23.jpg'),
  'Card24.jpg': require('../../assets/cards/Card24.jpg'),
  'Card25.jpg': require('../../assets/cards/Card25.jpg'),
  'Card26.jpg': require('../../assets/cards/Card26.jpg'),
  'Card27.jpg': require('../../assets/cards/Card27.jpg'),
  'Card28.jpg': require('../../assets/cards/Card28.jpg'),
  'Card29.jpg': require('../../assets/cards/Card29.jpg'),
  'Card30.jpg': require('../../assets/cards/Card30.jpg'),
  'Card31.jpg': require('../../assets/cards/Card31.jpg'),
  'Card32.jpg': require('../../assets/cards/Card32.jpg'),
  'Card33.jpg': require('../../assets/cards/Card33.jpg'),
  'Card34.jpg': require('../../assets/cards/Card34.jpg'),
  'Card35.jpg': require('../../assets/cards/Card35.jpg'),
  'Card36.jpg': require('../../assets/cards/Card36.jpg'),
  'Card37.jpg': require('../../assets/cards/Card37.jpg'),
  'Card38.jpg': require('../../assets/cards/Card38.jpg'),
  'Card39.jpg': require('../../assets/cards/Card39.jpg'),
  'Card40.jpg': require('../../assets/cards/Card40.jpg'),
  'Card41.jpg': require('../../assets/cards/Card41.jpg'),
  'Card42.jpg': require('../../assets/cards/Card42.jpg'),
  'Card43.jpg': require('../../assets/cards/Card43.jpg'),
  'Card44.jpg': require('../../assets/cards/Card44.jpg'),
  'Card45.jpg': require('../../assets/cards/Card45.jpg'),
  'Card46.jpg': require('../../assets/cards/Card46.jpg'),
  'Card47.jpg': require('../../assets/cards/Card47.jpg'),
  'Card48.jpg': require('../../assets/cards/Card48.jpg'),
  'Card49.jpg': require('../../assets/cards/Card49.jpg'),
  'Card50.jpg': require('../../assets/cards/Card50.jpg'),
  'Card51.jpg': require('../../assets/cards/Card51.jpg'),
  'Card52.jpg': require('../../assets/cards/Card52.jpg'),
  'Card53.jpg': require('../../assets/cards/Card53.jpg'),
  'Card54.jpg': require('../../assets/cards/Card54.jpg'),
  'Card55.jpg': require('../../assets/cards/Card55.jpg'),
  'Card56.jpg': require('../../assets/cards/Card56.jpg'),
  'Card57.jpg': require('../../assets/cards/Card57.jpg'),
  'Card58.jpg': require('../../assets/cards/Card58.jpg'),
  'Card59.jpg': require('../../assets/cards/Card59.jpg'),
  'Card60.jpg': require('../../assets/cards/Card60.jpg'),
  'Card61.jpg': require('../../assets/cards/Card61.jpg'),
  'Card62.jpg': require('../../assets/cards/Card62.jpg'),
  'Card63.jpg': require('../../assets/cards/Card63.jpg'),
  'Card64.jpg': require('../../assets/cards/Card64.jpg'),
  'Card65.jpg': require('../../assets/cards/Card65.jpg'),
  'Card66.jpg': require('../../assets/cards/Card66.jpg'),
  'Card67.jpg': require('../../assets/cards/Card67.jpg'),
  'Card68.jpg': require('../../assets/cards/Card68.jpg'),
  'Card69.jpg': require('../../assets/cards/Card69.jpg'),
  'Card70.jpg': require('../../assets/cards/Card70.jpg'),
  'Card71.jpg': require('../../assets/cards/Card71.jpg'),
  'Card72.jpg': require('../../assets/cards/Card72.jpg'),
  'Card73.jpg': require('../../assets/cards/Card73.jpg'),
  'Card74.jpg': require('../../assets/cards/Card74.jpg'),
  'Card75.jpg': require('../../assets/cards/Card75.jpg'),
  'Card76.jpg': require('../../assets/cards/Card76.jpg'),
  'Card77.jpg': require('../../assets/cards/Card77.jpg'),
  'Card78.jpg': require('../../assets/cards/Card78.jpg'),
  'Card79.jpg': require('../../assets/cards/Card79.jpg'),
  'Card80.jpg': require('../../assets/cards/Card80.jpg'),
  'Card81.jpg': require('../../assets/cards/Card81.jpg'),
  'Card82.jpg': require('../../assets/cards/Card82.jpg'),
  'Card83.jpg': require('../../assets/cards/Card83.jpg'),
  'Card84.jpg': require('../../assets/cards/Card84.jpg'),
  'Card85.jpg': require('../../assets/cards/Card85.jpg'),
  'Card86.jpg': require('../../assets/cards/Card86.jpg'),
  'Card87.jpg': require('../../assets/cards/Card87.jpg'),
  'Card88.jpg': require('../../assets/cards/Card88.jpg'),
  'Card89.jpg': require('../../assets/cards/Card89.jpg'),
  'Card90.jpg': require('../../assets/cards/Card90.jpg'),
  'Card91.jpg': require('../../assets/cards/Card91.jpg'),
  'Card92.jpg': require('../../assets/cards/Card92.jpg'),
  'Card93.jpg': require('../../assets/cards/Card93.jpg'),
  'Card94.jpg': require('../../assets/cards/Card94.jpg'),
  'Card95.jpg': require('../../assets/cards/Card95.jpg'),
  'Card96.jpg': require('../../assets/cards/Card96.jpg'),
  'Card97.jpg': require('../../assets/cards/Card97.jpg'),
  'Card98.jpg': require('../../assets/cards/Card98.jpg'),
  'Card99.jpg': require('../../assets/cards/Card99.jpg'),
  'Card100.jpg': require('../../assets/cards/Card100.jpg'),
  'Card101.jpg': require('../../assets/cards/Card101.jpg'),
  'Card102.jpg': require('../../assets/cards/Card102.jpg'),
  'Card103.jpg': require('../../assets/cards/Card103.jpg'),
  'Card104.jpg': require('../../assets/cards/Card104.jpg'),
  'Card105.jpg': require('../../assets/cards/Card105.jpg'),
  'Card106.jpg': require('../../assets/cards/Card106.jpg'),
  'Card107.jpg': require('../../assets/cards/Card107.jpg'),
  'Card108.jpg': require('../../assets/cards/Card108.jpg'),
  'Card109.jpg': require('../../assets/cards/Card109.jpg'),
  'Card110.jpg': require('../../assets/cards/Card110.jpg'),
  'Card111.jpg': require('../../assets/cards/Card111.jpg'),
  'Card112.jpg': require('../../assets/cards/Card112.jpg'),
  'Card113.jpg': require('../../assets/cards/Card113.jpg'),
  'Card114.jpg': require('../../assets/cards/Card114.jpg'),
  'Card115.jpg': require('../../assets/cards/Card115.jpg'),
  'Card116.jpg': require('../../assets/cards/Card116.jpg'),
  'Card117.jpg': require('../../assets/cards/Card117.jpg'),
  'Card118.jpg': require('../../assets/cards/Card118.jpg'),
  'Card119.jpg': require('../../assets/cards/Card119.jpg'),
  'Card120.jpg': require('../../assets/cards/Card120.jpg'),
  'Card121.jpg': require('../../assets/cards/Card121.jpg'),
  'Card122.jpg': require('../../assets/cards/Card122.jpg'),
  'Card123.jpg': require('../../assets/cards/Card123.jpg'),
  'Card124.jpg': require('../../assets/cards/Card124.jpg'),
  'Card125.jpg': require('../../assets/cards/Card125.jpg'),
  'Card126.jpg': require('../../assets/cards/Card126.jpg'),
  'Card127.jpg': require('../../assets/cards/Card127.jpg'),
  'Card128.jpg': require('../../assets/cards/Card128.jpg'),
  'Card129.jpg': require('../../assets/cards/Card129.jpg'),
  'Card130.jpg': require('../../assets/cards/Card130.jpg'),
  'Card131.jpg': require('../../assets/cards/Card131.jpg'),
  'Card132.jpg': require('../../assets/cards/Card132.jpg'),
  'Card133.jpg': require('../../assets/cards/Card133.jpg'),
  'Card134.jpg': require('../../assets/cards/Card134.jpg'),
};

interface CardItemProps {
  title: any;
  path: any;
}

const CardItem: React.FC<CardItemProps> = ({title, path}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <TouchableOpacity onPress={flipCard} style={styles.card}>
      <Animated.View
        style={[isFlipped ? backAnimatedStyle : frontAnimatedStyle]}>
        <LinearGradient
          colors={['#f6d365', '#fda085']}
          style={[styles.cardBefore, styles.gradient]}
        />
        <LinearGradient
          colors={['#84fab0', '#8fd3f4']}
          style={[styles.cardAfter, styles.gradient]}
        />
        <View style={styles.cardInfo}>
          {isFlipped ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <Image source={imageMap[path]} style={styles.cardImage} />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
    borderRadius: 16,
    width: logoWidth30, // Fixer la largeur de la carte à 200
    height: logoHeight22,
    overflow: 'visible',
    position: 'relative',
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  cardBefore: {
    transform: [{rotate: '2deg'}],
    zIndex: -1,
  },
  cardAfter: {
    transform: [{rotate: '-2deg'}],
    zIndex: -1,
  },
  cardInfo: {
    backgroundColor: '#292b2c',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    borderRadius: 12,
    position: 'relative',
    zIndex: 2,
  },
  cardImage: {
    width: '80%',
    height: '95%',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#fff',
    textAlign: 'center', // Centrer le texte horizontalement
  },
});

export default CardItem;
