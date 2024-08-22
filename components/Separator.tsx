import React from 'react';
import {View, StyleSheet} from 'react-native';
import { logoHeight4, logoWidth80 } from "../utils/DimensionsUtils.tsx";

const Separator = () => {
  return (
    <View style={styles.separator}>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    alignItems: 'center',
    marginVertical: logoHeight4,
  },
  line: {
    width: logoWidth80,
    height: 2,
    backgroundColor: '#666', // Couleur gris clair
    borderRadius: 5, // Coins arrondis
    shadowColor: '#777', // Couleur de l'ombre
    shadowOffset: {width: 0, height: 2}, // Décalage de l'ombre
    shadowOpacity: 0.8, // Opacité de l'ombre
    shadowRadius: 5, // Flou de l'ombre
    elevation: 5, // Pour Android
  },
});

export default Separator;
