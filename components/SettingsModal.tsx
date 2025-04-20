import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';

interface SettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onFontSizeChange: (size: number) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

function SettingsModal(props: SettingsModalProps) {
  const { isVisible, onClose, onFontSizeChange, onThemeChange } = props;
  const [fontSize, setFontSize] = useState(16);

  function handleFontSizeChange(size: number) {
    setFontSize(size);
    onFontSizeChange(size);
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.label}>Font Size</Text>
        <Slider
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={fontSize}
          onValueChange={handleFontSizeChange}
        />
        <Button title="Light Theme" onPress={() => onThemeChange('light')} />
        <Button title="Dark Theme" onPress={() => onThemeChange('dark')} />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  label: {
    fontSize: 10,
    marginBottom: 10,
  },
});

export default SettingsModal;
