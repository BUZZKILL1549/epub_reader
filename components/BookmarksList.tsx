import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BookmarkListProps {
  bookmarks: { label: string; location: string }[];
  onBookmarkSelect: (location: string) => void;
}

function BookmarkList(props: BookmarkListProps) {
  const { bookmarks, onBookmarkSelect } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onBookmarkSelect(item.location)}>
            <Text style={styles.bookmark}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bookmark: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default BookmarkList;
