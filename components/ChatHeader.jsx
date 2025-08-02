import { useThemeStore } from '@/store/themeStore';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatHeader() {
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.header, { backgroundColor: isDarkMode ? '#1e293b' : '#f3f4f6' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#111827' }]}>
        Chatbot
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
