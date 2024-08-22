import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {logoHeight8, logoWidth70} from '../../utils/DimensionsUtils.tsx';

interface NeonRadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

const NeonRadioButton = ({label, selected, onPress}: NeonRadioButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.radioButton]}>
      <Text style={[styles.radioLabel, selected && styles.radioLabelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface NeonRadioGroupProps {
  onPress: (value: number) => void;
}

const NeonRadioGroup = (onPress: NeonRadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState('30 Cartes');
  const [translateX] = useState(new Animated.Value(0));

  const handlePress = (value: string, index: number) => {
    setSelectedValue(value);
    if (selectedValue === '30 Cartes') {
      onPress.onPress(30);
    }
    if (selectedValue === '60 Cartes') {
      onPress.onPress(60);
    }
    if (selectedValue === '90 Cartes') {
      onPress.onPress(90);
    }
    Animated.spring(translateX, {
      toValue: (logoWidth70 / 3) * index,
      useNativeDriver: true,
    }).start();
  };

  const options = [
    {label: '30 Cartes', value: '30 Cartes'},
    {label: '60 Cartes', value: '60 Cartes'},
    {label: '90 Cartes', value: '90 Cartes'},
  ];

  return (
    <View style={styles.radioGroup}>
      <Animated.View style={[styles.selection, {transform: [{translateX}]}]} />
      {options.map((option, index) => (
        <NeonRadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={() => handlePress(option.value, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#bd47d8', // border in purple
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 20,
    width: logoWidth70,
    height: logoHeight8,
    alignSelf: 'center',
    position: 'relative',
  },
  radioButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  radioLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
    borderRadius: 10,
    textAlign: 'center',
  },
  radioLabelSelected: {
    color: '#FFF',
    backgroundColor: 'transparent',
  },
  selection: {
    position: 'absolute',
    height: '102%',
    width: logoWidth70 / 3 + 4,
    backgroundColor: '#bd47d8',
    zIndex: -1,
    top: 0,
    borderRadius: 15,
    shadowColor: '#bd47d8',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
});

export default NeonRadioGroup;
