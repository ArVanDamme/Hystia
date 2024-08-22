import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { logoHeight5, logoWidth60, logoWidth70 } from "../../utils/DimensionsUtils.tsx";

interface CustomizePlayersButtonProps {
  onPress: () => void;
  value: string;
}
const CustomizePlayersButton = ({
  onPress,
  value,
}: CustomizePlayersButtonProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.startGameButton,
        {backgroundColor: isDarkMode ? '#840dad' : '#840dad'},
      ]}
      onPress={onPress}>
      <Text style={styles.startGameText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  startGameButton: {
    position: 'relative',
    height: logoHeight5,
    width: logoWidth60,
    backgroundColor: '#840dad',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#840dad',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 7,
    elevation: 7,
  },
  startGameText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomizePlayersButton;
