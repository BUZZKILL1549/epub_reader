import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TOCProps {
  chapters: { label: string; href: string }[];
  onChapterSelect: (href: string) => void;
}

function TOC(props: TOCProps) {
  const { chapters, onChapterSelect } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={chapters}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChapterSelect(item.href)}>
            <Text style={styles.chapter}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  chapter: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default TOC;
