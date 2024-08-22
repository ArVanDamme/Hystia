import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useColorScheme,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import GameModeTile from '../components/Cards/GameModeTile';
import {useGameManager} from '../model/GameManager';
import ScrollView = Animated.ScrollView;

const GameManagementScreen = () => {
  const {setGameMode} = useGameManager();
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  const handleTilePress = (title: string) => {
    setSelectedTile(title);
    setGameMode(title);
  };

  const startGame = () => {
    // @ts-ignore
    navigation.navigate('PlayerManagement');
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('../assets/background/4882552_29948.jpg')}
        style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.viewImage}>
          <Text style={styles.titleDark}>Mode de jeu</Text>
        </View>
        <ScrollView style={styles.container}>
          <GameModeTile
            color={'#11ed11'}
            title={'ALL'}
            description={
              'Le mode ALL comprend toutes les cartes du jeu. Il est idéal pour les parties entre amis ou pour les plus téméraires. Il est déconseillé aux âmes sensibles. Des questions tordues, des gages et des défis vous attendent.'
            }
            trashRating={4}
            funRating={4}
            isSelected={selectedTile === 'ALL'}
            onPress={() => handleTilePress('ALL')}
          />
          <GameModeTile
            color={'#f043c7'}
            title={'CLASSIC'}
            description={
              'Le mode classique est le mode de jeu standard. Il est idéal pour les parties rapides et les débutants, on y retrouves pour tous les goûts. Globalement, il est équilibré et permet de découvrir le jeu.'
            }
            trashRating={1}
            funRating={4}
            isSelected={selectedTile === 'CLASSIC'}
            onPress={() => handleTilePress('CLASSIC')}
          />
          <GameModeTile
            color={'#1647f7'}
            title={'WHO'}
            description={
              'Le mode WHO comprend des cartes sur des questions a choix multiples. On y retrouves beaucoup de questions sur des sujets divers et variés. Il est idéal pour les parties en famille ou entre amis.'
            }
            trashRating={2}
            funRating={3}
            isSelected={selectedTile === 'WHO'}
            onPress={() => handleTilePress('WHO')}
          />
          <GameModeTile
            color={'#f71625'}
            title={'HOT'}
            description={
              'Le mode HOT est surement le plus intense. Il est idéal pour les parties entre amis ou pour les plus téméraires. Il est déconseillé aux âmes sensibles. Des questions tordues, des gages et des défis vous attendent.'
            }
            trashRating={5}
            funRating={4}
            isSelected={selectedTile === 'HOT'}
            onPress={() => handleTilePress('HOT')}
          />
          <View style={{height: 100}} />
        </ScrollView>
        {selectedTile && (
          <TouchableOpacity style={styles.button} onPress={startGame}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  viewImage: {
    marginTop: 5,
    width: '100%',
    height: '10%',
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
    width: '95%',
    alignSelf: 'center',
  },
  titleDark: {
    fontFamily: 'poetsenone_regular',
    fontSize: 28,
    width: '80%',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    borderRadius: 16,
  },
  button: {
    bottom: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default GameManagementScreen;
