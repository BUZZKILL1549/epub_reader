import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EpubReaderScreen from '../../components/screens/EpubReaderScreen';

function index() {
  return (
    <SafeAreaView style={styles.container}>
      <EpubReaderScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default index;
