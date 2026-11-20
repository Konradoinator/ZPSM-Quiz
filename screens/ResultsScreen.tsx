// screens/ResultsScreen.tsx
import { StyleSheet, Text, View } from 'react-native';

export default function ResultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wyniki</Text>
      <Text style={styles.subtitle}>Brak zapisanych wyników.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f2a44',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
  },
});
