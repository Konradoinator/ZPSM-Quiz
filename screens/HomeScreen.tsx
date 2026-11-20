// screens/HomeScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TESTS } from '../data/tests.ts';
import type { HomeNavigation } from '../navigation/types.ts';

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {TESTS.map((test) => (
          <Pressable
            key={test.id}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation.navigate('Quiz', { testId: test.id })}
          >
            <Text style={styles.title}>{test.name}</Text>
            <Text style={styles.description}>{test.description}</Text>
            <Text style={styles.meta}>{test.numberOfTasks} pytań</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.footer,
          { paddingBottom: 18 + insets.bottom },
          pressed && styles.footerPressed,
        ]}
        onPress={() => navigation.navigate('Results')}
      >
        <Text style={styles.footerText}>Wyniki</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 18,
    gap: 6,
  },
  cardPressed: {
    backgroundColor: '#e2e8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f2a44',
  },
  description: {
    fontSize: 15,
    color: '#334155',
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  footer: {
    backgroundColor: '#0f2a44',
    paddingTop: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerPressed: {
    opacity: 0.85,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
