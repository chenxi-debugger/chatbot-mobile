import ChatHeader from '@/components/ChatHeader';
import InputBox from '@/components/InputBox';
import MessageBubble from '@/components/MessageBubble';
import { useThemeStore } from '@/store/themeStore';
import { chatWithOpenAI } from '@/utils/openai';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  const [messages, setMessages] = useState([
    { id: '1', sender: 'assistant', text: 'Hi! How can I help you today?' },
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const historyForAPI = [
        ...messages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        })),
        { role: 'user', content: text },
      ];

      const reply = await chatWithOpenAI(historyForAPI);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? '#0f172a' : '#ffffff' },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <View style={styles.container}>
          <ChatHeader />

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={styles.chatArea}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <InputBox onSend={handleSend} loading={loading} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  chatArea: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
});
