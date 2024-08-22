import React, {useState} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Player} from '../../model/GameManager.tsx';
import {logoWidth25} from '../../utils/DimensionsUtils.tsx';

interface PlayerCustomizerProps {
  player: Player;
  playerNameChange: (id: number, name: string) => void;
  selectedPlayerId: number | null;
  onSelectPlayer: (id: number) => void;
}

const PlayerCustomizer = ({
  player,
  playerNameChange,
  selectedPlayerId,
  onSelectPlayer,
}: PlayerCustomizerProps) => {
  const [playerName, setPlayerName] = useState(player.name);
  const [modalVisible, setModalVisible] = useState(false);

  const select = () => {
    onSelectPlayer(player.id);
    setModalVisible(true);
  };

  const handleNameChange = (text: string) => {
    setPlayerName(text);
    playerNameChange(player.id, text);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        player.id === selectedPlayerId && styles.selectedContainer,
      ]}
      onPress={select}>
      <Image
        source={require('../../assets/icons/trekker.png')}
        style={styles.image}
      />
      <TextInput style={styles.input} value={playerName} editable={false} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.modalInput}
                value={playerName}
                onChangeText={handleNameChange}
              />
              <Button
                title="Fermer"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: logoWidth25,
    height: logoWidth25,
    borderRadius: 300,
    borderColor: 'rgba(189, 71, 216, 0.2)',
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    margin: 15,
  },
  selectedContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(189, 71, 216, 1)',
  },
  image: {
    marginTop: '10%',
    alignSelf: 'center',
    width: '40%',
    height: '40%',
  },
  input: {
    width: '80%',
    textAlign: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
  modalInput: {
    width: '80%',
    color: 'black',
    textAlign: 'center',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
});

export default PlayerCustomizer;
