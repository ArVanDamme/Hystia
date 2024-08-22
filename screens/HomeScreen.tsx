import React, {useEffect, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  useColorScheme,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  logoWidth25,
  logoWidth80,
  logoHeight20,
  logoBorderRadius,
  logoWidth15,
} from '../utils/DimensionsUtils';
import {useGameManager} from '../model/GameManager.tsx';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const {reset} = useGameManager();

  useEffect(() => {
    // Définir l'animation pour les boutons
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95, // Échelle à laquelle vous souhaitez réduire le bouton
          duration: 5000, // Durée de l'animation en ms
          useNativeDriver: true, // Utiliser le pilote natif pour des performances optimales
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Échelle à laquelle vous souhaitez agrandir le bouton
          duration: 5000, // Durée de l'animation en ms
          useNativeDriver: true, // Utiliser le pilote natif pour des performances optimales
        }),
      ]),
      {iterations: -1}, // Répéter en boucle
    ).start(); // Démarrer l'animation
  }, [scaleAnim]);

  const handleExitPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
  };

  const startGame = () => {
    reset();
    // @ts-ignore
    navigation.navigate('GameManagement');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('../assets/background/4882552_29948.jpg')}
        style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.viewImage}>
          <Image
            source={require('../assets/logos/png/LogoOreilleEmpty.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.up}>
            <TouchableOpacity onPress={startGame}>
              <Animated.View
                style={[
                  styles.card,
                  styles.card1,
                  {transform: [{scale: scaleAnim}]},
                ]}>
                <Image
                  source={require('../assets/icons/play.png')}
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Cards')}>
              <Animated.View
                style={[
                  styles.card,
                  styles.card2,
                  {transform: [{scale: scaleAnim}]},
                ]}>
                <Image
                  source={require('../assets/icons/card-games.png')}
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.down}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Animated.View
                style={[
                  styles.card,
                  styles.card3,
                  {transform: [{scale: scaleAnim}]},
                ]}>
                <Image
                  source={require('../assets/icons/book.png')}
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExitPress}>
              <Animated.View
                style={[
                  styles.card,
                  styles.card4,
                  {transform: [{scale: scaleAnim}]},
                ]}>
                <Image
                  source={require('../assets/icons/exit.png')}
                  style={styles.image}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: logoWidth80,
    height: logoHeight20,
    zIndex: 1,
  },
  homeScreen: {
    fontFamily: 'Anton-Regular',
  },
  viewImage: {
    marginTop: 50,
    width: '100%', // Réduit la largeur de la vue
    height: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDark: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  main: {
    flexDirection: 'column',
    gap: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: logoWidth15,
    height: logoWidth15,
  },
  up: {
    flexDirection: 'row',
    gap: 5,
  },
  down: {
    flexDirection: 'row',
    gap: 5,
  },
  card: {
    width: logoWidth25,
    height: logoWidth25,
    backgroundColor: 'white',
    borderRadius: logoBorderRadius,
    shadowColor: 'rgba(50, 50, 93, 0.25)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  card1: {
    borderRadius: 16,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  card2: {
    borderRadius: 16,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  card3: {
    borderRadius: 16,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  card4: {
    borderRadius: 16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default HomeScreen;
