// screens/ScoreScreen.tsx
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { Result } from '../data/results.ts';
import { findTest } from '../data/tests.ts';
import type { HomeStackParamList, ScoreNavigation } from '../navigation/types.ts';
import { saveResult } from '../storage/storage.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'Score'>;

function formatToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function ScoreScreen({ route }: Props) {
  const navigation = useNavigation<ScoreNavigation>();
  const { testId, score, total } = route.params;
  const test = findTest(testId);

  const [nick, setNick] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave(): Promise<void> {
    if (saving) return;
    setSaving(true);
    try {
      const newResult: Result = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        nick: nick.trim() || 'Anonim',
        score,
        total,
        type: test ? test.name : testId,
        date: formatToday(),
      };
      await saveResult(newResult);
      navigation.popTo('Home');
      navigation.navigate('Results');
    } finally {
      setSaving(false);
    }
  }

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
        style={({ pressed }) => [
          styles.saveButton,
          (pressed || saving) && styles.buttonPressed,
        ]}
        disabled={saving}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Zapisywanie...' : 'Zapisz wynik'}
        </Text>
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
