import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Chatbot UI Mobile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#1e293b',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});
