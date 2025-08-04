import { auth } from '@/lib/firebase';
import { useThemeStore } from '@/store/themeStore';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark';
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert('Signed out', 'You have been logged out.');
      setUser(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // replace this with your actual login page route
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#0f172a' : '#ffffff' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#111827' },
        ]}
      >
        My Account
      </Text>

      {user ? (
        <View style={styles.infoSection}>
          <Text
            style={[
              styles.label,
              { color: isDarkMode ? 'gray' : '#4b5563' },
            ]}
          >
            Username:
          </Text>
          <Text
            style={[
              styles.value,
              { color: isDarkMode ? '#ffffff' : '#111827' },
            ]}
          >
            {user.displayName ?? 'N/A'}
          </Text>

          <Text
            style={[
              styles.label,
              { color: isDarkMode ? 'gray' : '#4b5563' },
            ]}
          >
            Email:
          </Text>
          <Text
            style={[
              styles.value,
              { color: isDarkMode ? '#ffffff' : '#111827' },
            ]}
          >
            {user.email}
          </Text>

          <Button title="Sign Out" onPress={handleSignOut} color="#ef4444" />
        </View>
      ) : (
        <View style={styles.infoSection}>
          <Text
            style={{
              color: isDarkMode ? '#ffffff' : '#111827',
              marginBottom: 12,
            }}
          >
            Not logged in
          </Text>
          <Button
            title="Login / Register"
            onPress={handleLoginRedirect}
            color="#3b82f6"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});
