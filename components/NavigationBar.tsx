import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface NavigationBarProps {
  onNext: () => void;
  onPrevious: () => void;
}

function NavigationBar(props: NavigationBarProps) {
  const { onNext, onPrevious } = props;

  return (
    <View style={styles.container}>
      <Button title="Previous" onPress={onPrevious} />
      <Button title="Next" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default NavigationBar;
