import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'chatHistory';

export const saveChatHistory = async (messages) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error('❌ Failed to save chat history:', e);
  }
};

export const loadChatHistory = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('❌ Failed to load chat history:', e);
    return [];
  }
};

export const clearChatHistory = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('❌ Failed to clear chat history:', e);
  }
};
