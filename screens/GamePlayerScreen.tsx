import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {useGameManager} from '../model/GameManager';
import {useNavigation} from '@react-navigation/native';

const avatars = [
  require('../assets/icons/players/icône1.png'),
  require('../assets/icons/players/icône2.png'),
  require('../assets/icons/players/icône3.png'),
  require('../assets/icons/players/icône4.png'),
  require('../assets/icons/players/icône5.png'),
  require('../assets/icons/players/icône6.png'),
  require('../assets/icons/players/icône7.png'),
  require('../assets/icons/players/icône8.png'),
  require('../assets/icons/players/icône9.png'),
  require('../assets/icons/players/icône10.png'),
  require('../assets/icons/players/icône11.png'),
  require('../assets/icons/players/icône12.png'),
  require('../assets/icons/players/icône13.png'),
  require('../assets/icons/players/icône14.png'),
  require('../assets/icons/players/icône15.png'),
  require('../assets/icons/players/icône16.png'),
];

const cardColors = [
  '#1647f7',
  '#11ed11',
  '#ebd409',
  '#f043c7',
  '#eb5109',
  '#fff',
];

const PlayerManagementScreen = () => {
  const {players, addPlayer, removePlayer, updatePlayerAvatar} =
    useGameManager();
  const navigation = useNavigation();
  const [playerName, setPlayerName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [startButton, setStartButton] = useState('Commencer la partie');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEditingPlayer, setCurrentEditingPlayer] = useState(null);

  const validatePlayers = () => {
    const names = new Set();
    if (players.length < 2) {
      return false;
    }
    for (let player of players) {
      if (player.name.length < 4) {
        return false;
      }
      names.add(player.name);
    }
    return names.size === players.length;
  };

  const startGame = () => {
    if (validatePlayers()) {
      navigation.navigate('Game');
    } else {
      setStartButton('Conditions non remplies');
    }
  };

  const handleAddPlayer = () => {
    if (
      playerName.trim() !== '' &&
      playerName.length >= 4 &&
      players.length < 12
    ) {
      const newPlayer = {
        id: Date.now(),
        name: playerName.trim(),
        score: 0,
        drinkNumber: 0,
        avatar: selectedAvatar,
        color: cardColors[players.length % cardColors.length],
      };
      addPlayer(newPlayer);
      setPlayerName('');
      setSelectedAvatar(avatars[0]);
    }
  };

  const handleAvatarSelect = (player: {id: number} | null, avatar: any) => {
    if (player) {
      updatePlayerAvatar(player.id, avatar);
      setModalVisible(false);
    }
  };

  const handleOpenAvatarModal = (player: React.SetStateAction<null>) => {
    setCurrentEditingPlayer(player);
    setModalVisible(true);
  };

  // @ts-ignore
  const renderPlayer = ({item}) => (
    <View style={[styles.playerContainer, {borderColor: item.color}]}>
      <TouchableOpacity onPress={() => handleOpenAvatarModal(item)}>
        <Image source={item.avatar} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={[styles.playerName, {color: item.color}]}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => removePlayer(item.id)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/background/4882552_29948.jpg')}
        style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.viewImage}>
          <Text style={styles.titleDark}>Choix des joueurs</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.addPlayerContainer}>
            <TextInput
              style={styles.input}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Nom du joueur"
              placeholderTextColor="#d7e7ff"
            />
            <TouchableOpacity
              onPress={handleAddPlayer}
              style={styles.addButton}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.playerList}
            numColumns={2}
          />
          {validatePlayers() && (
            <TouchableOpacity onPress={startGame} style={styles.startButton}>
              <Text style={styles.buttonText}>{startButton}</Text>
            </TouchableOpacity>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Choisissez un Avatar</Text>
              <FlatList
                data={avatars}
                renderItem={({item: avatar}) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleAvatarSelect(currentEditingPlayer, avatar)
                    }
                    style={[
                      styles.avatarOption,
                      currentEditingPlayer?.avatar === avatar
                        ? styles.selectedAvatar
                        : {},
                    ]}>
                    <Image source={avatar} style={styles.avatarPreview} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.modalList}
              />
              <TouchableHighlight
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>Fermer</Text>
              </TouchableHighlight>
            </View>
          </Modal>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  viewImage: {
    marginTop: 5,
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 0,
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
  addPlayerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#d7e7ff',
  },
  input: {
    height: 40,
    color: '#d7e7ff',
    fontSize: 16,
    paddingHorizontal: 10,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'poetsenone_regular',
  },
  playerList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  playerContainer: {
    backgroundColor: 'rgba(22, 27, 45, 1)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexBasis: '45%',
    height: 200,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  playerName: {
    fontSize: 14,
    fontFamily: 'poetsenone_regular',
  },
  removeButton: {
    position: 'relative',
    width: '95%',
    height: 30,
    backgroundColor: 'red',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 15,
  },
  removeButtonText: {
    color: 'white',
    fontFamily: 'poetsenone_regular',
    alignSelf: 'center',
    alignContent: 'center',
    fontSize: 16,
  },
  startButton: {
    marginBottom: 20,
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    marginTop: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#fff',
    fontFamily: 'poetsenone_regular',
  },
  avatarOption: {
    margin: 5,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPreview: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  modalList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default PlayerManagementScreen;
