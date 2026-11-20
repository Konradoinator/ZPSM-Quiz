// screens/ScoreScreen.tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { findTest } from '../data/tests.ts';
import type { HomeStackParamList } from '../navigation/types.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'Score'>;

export default function ScoreScreen({ route, navigation }: Props) {
  const { testId, score, total } = route.params;
  const test = findTest(testId);
  const [nick, setNick] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        {score} / {total}
      </Text>
      <Text style={styles.testName}>{test ? test.name : testId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Pseudonim"
        value={nick}
        onChangeText={setNick}
        autoCapitalize="words"
      />

      <Pressable
        style={({ pressed }) => [styles.saveButton, pressed && styles.buttonPressed]}
        onPress={() => {}}
      >
        <Text style={styles.saveButtonText}>Zapisz wynik</Text>
      </Pressable>

      <Pressable
        style={styles.backLink}
        onPress={() => navigation.popTo('Home')}
      >
        <Text style={styles.backLinkText}>Wróć do listy testów</Text>
      </Pressable>
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
    gap: 16,
  },
  score: {
    fontSize: 48,
    fontWeight: '700',
    color: '#0f2a44',
  },
  testName: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#0f2a44',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    paddingVertical: 10,
  },
  backLinkText: {
    color: '#0f766e',
    fontSize: 15,
    fontWeight: '600',
  },
});
