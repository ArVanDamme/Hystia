import React from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCardManager} from '../model/CardManager';
import CardItem from '../components/Cards/CardItem.tsx';
import { logoHeight10, logoWidth10, logoWidth5, logoWidth50 } from "../utils/DimensionsUtils.tsx";
const CardsScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const {cards} = useCardManager();

  // @ts-ignore
  const renderItem = ({item}) => (
    <CardItem title={item.title} path={item.path} />
  );

  const numColumns = 3;
  const numCards = cards.length;
  const numEmptyCards = numColumns - (numCards % numColumns);
  const lastRowIsIncomplete = numEmptyCards !== numColumns;

  const completedCards = lastRowIsIncomplete ? [...cards] : cards;

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ImageBackground
        source={require('../assets/background/pink-brick-wall.jpg')} // Assurez-vous que l'image est dans le bon répertoire
        style={styles.background}>
        <View style={styles.overlay} />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.backButton}>
          <Image
            source={require('../assets/icons/back.png')} // Assurez-vous que l'icône de la flèche est dans le bon répertoire
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.viewImage}>
          <Image
            source={require('../assets/icons/collections/Collectionvert.png')}
            style={styles.collectionLogo}
          />
        </View>
        <FlatList
          data={completedCards}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          style={{flex: 1, marginHorizontal: 5}}
          snapToInterval={5}
          decelerationRate="fast"
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  collectionLogo: {
    alignSelf: 'center',
    width: logoWidth50,
    height: logoHeight10,
    zIndex: 1,
  },
  viewImage: {
    width: '100%',
    height: '15%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: logoWidth5,
    height: logoWidth5,
    borderRadius: 25,
    backgroundColor: '#fff', // Couleur de fond inchangée
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  flatListContent: {
    justifyContent: 'center', // Ajout de cette ligne pour centrer horizontalement
    alignSelf: 'center',
    flexGrow: 1,
    margin: 30,
    paddingHorizontal: 5,
    paddingBottom: 50,
  },
});

export default CardsScreen;
