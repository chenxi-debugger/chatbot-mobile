import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const handleSignOut = () => {
    Alert.alert('Signed out', 'You have been logged out.');
    // 在这里处理 sign out 逻辑
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>chenxizzz</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>example@example.com</Text>
      </View>

      <Button title="Sign Out" onPress={handleSignOut} color="#ef4444" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: 'white',
  },
  infoSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: 'gray',
  },
  value: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});
