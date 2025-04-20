import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ePub, { Book } from 'epubjs';
import Reader from '../Reader';
import NavigationBar from '../NavigationBar';
import TOC from '../TOC';
import SettingsModal from '../SettingsModal';

function EpubReaderScreen() {
  const [book, setBook] = useState<Book | null>(null);
  const [content, setContent] = useState<string>('');
  const [toc, setToc] = useState<{ label: string; href: string}[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [isTOCVisible, setIsTOCVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      const loadedBook = ePub('');
      setBook(loadedBook);

      await loadedBook.ready;

      setToc(loadedBook.navigation.toc);

      const firstChapter = loadedBook.navigation.toc[0];
      if (firstChapter?.href) {
        const section = await loadedBook.goto(firstChapter.href);
        setContent(section.document.body.innerHTML);
      }
    };

    loadBook();

    return () => {
      if (book) {
        book.destroy();
      }
    };
  }, []);

  const handleNextPage = async () => {
    if (book) {
      const nextSection = await book.next();
      if (nextSection) {
        setContent(nextSection.document.body.innerHTML);
      }
    }
  };

  const handlePreviousPage = async () => {
    if (book) {
      const prevSection = await book.prev();
      if (prevSection) {
        setContent(prevSection.document.body.innerHTML);
      }
    }
  };

  const handleTOCSelect = async (href: string) => {
    if (book) {
      const section = await book.goto(href);
      setContent(section.document.body.innerHTML);
      setIsTOCVisible(false); 
    }
  };

  const handleFontSizeChange = (size: number) => {
    document.documentElement.style.fontSize = `${size}px`;
  };

  return (
    <View style={styles.container}>
      <Reader content={content} />

      <NavigationBar onNext={handleNextPage} onPrevious={handlePreviousPage} />

      <Button title="Table of Contents" onPress={() => setIsTOCVisible(true)} />

      <Button title="Settings" onPress={() => setIsSettingsVisible(true)} />

      {isTOCVisible && (
        <TOC chapters={toc} onChapterSelect={handleTOCSelect} />
      )}

      <SettingsModal
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
        onFontSizeChange={handleFontSizeChange}
        onThemeChange={(theme) => {
          document.body.style.backgroundColor =
            theme === 'dark' ? '#000' : '#fff';
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default EpubReaderScreen;
