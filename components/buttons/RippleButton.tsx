import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RippleButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <View style={styles.animation} />
        <Text style={styles.text}>BUTTON</Text>
        <View style={styles.animation} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#40B3A2',
    minWidth: 200,
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  animation: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: 'transparent',
  },
});

export default RippleButton;
