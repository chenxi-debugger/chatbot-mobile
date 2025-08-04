// app/(tabs)/settings.tsx

import Slider from '@react-native-community/slider';
import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore } from '@/store/themeStore';
import { clearChatHistory } from '@/utils/storage';

export default function SettingsScreen() {
  const {
    apiKey,
    model,
    temperature,
    setApiKey,
    setModel,
    setTemperature,
    load,
  } = useSettingsStore();

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    load();
  }, []);

  const isDark = theme === 'dark';
  const colors = {
    background: isDark ? '#0f172a' : '#fff',
    text: isDark ? '#fff' : '#000',
    inputBackground: isDark ? '#1f2937' : '#f0f0f0',
    borderColor: isDark ? '#444' : '#ccc',
    placeholder: isDark ? '#888' : '#aaa',
    label: isDark ? '#ccc' : '#333',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <Text style={[styles.label, { color: colors.label }]}>OpenAI API Key</Text>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="sk-xxxx"
        placeholderTextColor={colors.placeholder}
        secureTextEntry={true} 
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.borderColor }]}
      />

      <Text style={[styles.label, { color: colors.label }]}>Model</Text>
      <TextInput
        value={model}
        onChangeText={setModel}
        placeholder="gpt-3.5-turbo"
        placeholderTextColor={colors.placeholder}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.borderColor }]}
      />

      <Text style={[styles.label, { color: colors.label }]}>
        Temperature: {typeof temperature === 'number' ? temperature.toFixed(2) : '...'}
      </Text>

      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        value={temperature}
        onValueChange={setTemperature}
        minimumTrackTintColor="#1fb28a"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#b9e4c9"
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.label }]}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <Button
        title="🗑️ Clear Chat History"
        onPress={async () => {
          await clearChatHistory();
          Alert.alert('Success', 'Chat history cleared');
        }}
        color={isDark ? '#ef4444' : '#cc0000'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 14, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
