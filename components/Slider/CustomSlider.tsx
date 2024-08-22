import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

interface CustomSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const CustomSlider = ({label, value, onValueChange}: CustomSliderProps) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <Slider
        style={styles.slider}
        minimumValue={20}
        maximumValue={100}
        step={5}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="#FF6464"
        maximumTrackTintColor="#47C9FF"
        thumbTintColor="#00ffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
    textAlign: 'center',
  },
  slider: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default CustomSlider;
