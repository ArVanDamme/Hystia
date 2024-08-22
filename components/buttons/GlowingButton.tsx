// components/GlowingButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// @ts-ignore
function GlowingButton({onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <LinearGradient
        colors={['rgba(191, 123, 255, 0.781)', 'rgba(217, 176, 255, 0)']}
        style={styles.glow}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'rgb(217, 176, 255)',
    borderWidth: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'rgb(100, 61, 136)',
    borderRadius: 20,
    position: 'relative',
    shadowColor: 'rgb(217, 176, 255)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: 'rgb(217, 176, 255)',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'rgb(217, 176, 255)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  glow: {
    position: 'absolute',
    top: '120%',
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(191, 123, 255, 0.781)',
    opacity: 0.7,
    transform: [{perspective: 10}, {rotateX: '35deg'}, {scaleY: 0.6}],
    zIndex: -1,
  },
});

export default GlowingButton;
