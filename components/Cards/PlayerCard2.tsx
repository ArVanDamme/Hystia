import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Player} from '../../model/GameManager.tsx';

interface PlayerCustomizerProps {
  player: Player;
  onDelete: (id: number) => void;
}

const imageRatio = 98 / 128;
const logoWidth = 20;
const logoHeight = logoWidth / imageRatio;

const PlayerCustomizerCustom = ({player, onDelete}: PlayerCustomizerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    require('../../assets/icons/players/icône1.png'),
    require('../../assets/icons/players/icône2.png'),
    require('../../assets/icons/players/icône3.png'),
    require('../../assets/icons/players/icône4.png'),
    require('../../assets/icons/players/icône5.png'),
    require('../../assets/icons/players/icône6.png'),
    require('../../assets/icons/players/icône7.png'),
    require('../../assets/icons/players/icône8.png'),
    require('../../assets/icons/players/icône9.png'),
    require('../../assets/icons/players/icône10.png'),
    require('../../assets/icons/players/icône11.png'),
    require('../../assets/icons/players/icône12.png'),
    require('../../assets/icons/players/icône13.png'),
    require('../../assets/icons/players/icône14.png'),
    require('../../assets/icons/players/icône15.png'),
    require('../../assets/icons/players/icône16.png'),
  ];
  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <View style={styles.playerContainer}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleNextImage} style={styles.switchButton}>
          <Image
            source={images[currentImageIndex]}
            style={styles.playerImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.playerInfoContainer}>
        <Text style={styles.playerName}>{player.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(player.id)}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderColor: '#5b2c7d',
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    width: '100%',
  },
  imageContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerImage: {
    width: logoWidth,
    height: logoHeight,
  },
  playerInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  switchButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  switchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 20,
  },
  deleteButtonText: {
    fontSize: 25,
    marginRight: 15,
    color: '#ff0000',
  },
});

export default PlayerCustomizerCustom;
