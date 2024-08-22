import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

// Sample data with Lottie JSON or GIF paths
const rules = [
  {
    text:
      'Bienvenue dans le guide des règles de Hystia !\n' +
      '\n' +
      'Avant de commencer, voici un aperçu rapide des règles fondamentales des différents jeux. Faites défiler les pages pour explorer chaque règle en détail et les mécanismes du jeu.\n' +
      '\n' +
      "Faites glisser l'écran pour avancer ou revenir sur les pages des règles.\n" +
      '\n' +
      'Bonne lecture !',
    animation: require('../assets/animations/animation1.json'), // Lottie JSON
    gif: null, // If you have a GIF, use `require('../assets/animations/animation1.gif')`
  },
  {
    text:
      'Règle 1 :\n' +
      '\n' +
      "Dans chaque jeux, différentes cartes seront piochés dans un ordre aléatoire ou fixe selon les paramètres préalablement défini. Chaque carte désignera un joueur qui devra éfféctué l'action sur la carte.\n" +
      '\n' +
      "- Si le joueur effectue l'action alors rien ne change et c'est a la personne suivante de jouer\n" +
      "- Si celui-ci ne fait pas l'action alors une pénalité de 3 gorgées lui sera donnée\n",
    animation: require('../assets/animations/animation2.json'),
    gif: null, // If you have a GIF, use `require('../assets/animations/animation1.gif')`
  },
  {
    text:
      'Règle 2 & 3 :\n' +
      '\n' +
      "Les créateurs ont pleines autorités sur le jeu donc ceux qui râlent faites pas les malins (Ah et le maître du jeu de la partie a pleine autorité en l'abscence des créateurs :) )\n" +
      '\n' +
      "Dernières et plus importantes règles : Si la majorité des joueurs sont témoins d'un délit de mauvaise fois ou de triche, le joueur en question devra boire 3 gorgées en pénalité.\n",
    animation: require('../assets/animations/animation2.json'), // Lottie JSON
    gif: null, // If you have a GIF, use `require('../assets/animations/animation1.gif')`
  },
  {
    text: 'Maintenant que vous avez pris connaissance des règles, vous êtes prêt à jouer !\n',
    animation: require('../assets/animations/animation3.json'), // Lottie JSON
    gif: null, // If you have a GIF, use `require('../assets/animations/animation1.gif')`
  },
];

const SettingsScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const onViewRef = React.useRef((viewableItems: {changed: {index: any}[]}) => {
    const index = viewableItems.changed[0].index;
    setCurrentPage(index);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/background/4882552_29948.jpg')}
        style={styles.background}>
        <FlatList
          data={rules}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.page}>
              {item.animation ? (
                <LottieView
                  source={item.animation}
                  autoPlay
                  loop
                  style={styles.animation}
                />
              ) : (
                item.gif && (
                  <Image
                    source={item.gif}
                    style={styles.animation}
                    resizeMode="contain"
                  />
                )
              )}
              <Text style={styles.ruleText}>{item.text}</Text>
            </View>
          )}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />

        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            {rules.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {backgroundColor: i === currentPage ? '#fff' : '#888'},
                ]}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  page: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ruleText: {
    fontSize: 18,
    fontFamily: 'poetsenone_regular',
    color: '#fff',
    textAlign: 'center',
    marginTop: 20, // Add some space between the animation and text
  },
  animation: {
    width: 200,
    height: 200,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  arrow: {
    marginTop: 5,
  },
});

export default SettingsScreen;
