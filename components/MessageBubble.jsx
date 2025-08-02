import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.assistant]}>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 12
  },
  user: {
    backgroundColor: '#2563eb',
    alignSelf: 'flex-end'
  },
  assistant: {
    backgroundColor: '#475569',
    alignSelf: 'flex-start'
  },
  text: {
    color: 'white'
  }
});
