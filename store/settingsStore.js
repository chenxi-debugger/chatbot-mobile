// store/settingsStore.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import Constants from 'expo-constants';

const STORAGE_KEY = 'chatSettings';

const DEFAULT_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY || '';


export const useSettingsStore = create((set, get) => ({
  apiKey: DEFAULT_API_KEY,
  model: 'gpt-3.5-turbo',
  temperature: 0.7,

  setApiKey: async (key) => {
    set({ apiKey: key });
    await save();
  },

  setModel: async (model) => {
    set({ model });
    await save();
  },

  setTemperature: async (temp) => {
    set({ temperature: temp });
    await save();
  },

  load: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      set(JSON.parse(raw));
    }
  },
}));

const save = async () => {
  const store = useSettingsStore.getState();
  const data = {
    apiKey: store.apiKey,
    model: store.model,
    temperature: store.temperature,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
