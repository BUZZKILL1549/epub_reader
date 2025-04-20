import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface ReaderProps {
  content: string;
}

function Reader(props: ReaderProps) {
  const { content } = props;

  return (
    <View style={styles.container}>
      <WebView source={{ html: content }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Reader;
