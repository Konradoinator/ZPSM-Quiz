// screens/QuizScreen.tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getTasksForTest } from '../data/tasks.ts';
import { findTest } from '../data/tests.ts';
import type { HomeStackParamList } from '../navigation/types.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { testId } = route.params;
  const test = findTest(testId);
  const tasks = getTasksForTest(testId);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(() => tasks[0]?.duration ?? 0);

  // Reset stanu, jeśli użytkownik otworzy inny test z szuflady na istniejącym ekranie
  useEffect(() => {
    setIndex(0);
    setScore(0);
    setRemaining(tasks[0]?.duration ?? 0);
  }, [testId, tasks]);

  const task = tasks[index];

  const advance = useCallback(
    (gained: number) => {
      const nextScore = score + gained;
      const nextIndex = index + 1;

      if (nextIndex < tasks.length) {
        setScore(nextScore);
        setIndex(nextIndex);
        setRemaining(tasks[nextIndex].duration);
      } else {
        // replace usuwa ekran testu ze stosu, więc Wstecz nie wraca do rozwiązanego testu
        navigation.replace('Score', {
          testId,
          score: nextScore,
          total: tasks.length,
        });
      }
    },
    [index, navigation, score, tasks, testId]
  );

  // Licznik czasu dla bieżącego pytania z obowiązkowym clearInterval przy sprzątaniu
  useEffect(() => {
    if (!task) return;

    const timer = setInterval(() => {
      setRemaining((left) => (left <= 0 ? 0 : left - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [index, task]);

  // Wyczerpany czas liczy się jako odpowiedź błędna (0 pkt) i przechodzi dalej
  useEffect(() => {
    if (task && remaining === 0) {
      advance(0);
    }
  }, [advance, remaining, task]);

  if (!task) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Brak pytań</Text>
        <Text style={styles.emptySubtitle}>
          Ten test nie zawiera jeszcze żadnych pytań.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.progress}>
          {test ? test.name : testId} · {index + 1} z {tasks.length}
        </Text>
        <Text style={[styles.timer, remaining <= 5 && styles.timerLow]}>
          {remaining} s
        </Text>
      </View>

      <Text style={styles.question}>{task.question}</Text>

      <View style={styles.answers}>
        {task.answers.map((answer) => (
          <Pressable
            key={answer.content}
            style={({ pressed }) => [
              styles.answerButton,
              pressed && styles.answerButtonPressed,
            ]}
            onPress={() => advance(answer.isCorrect ? 1 : 0)}
          >
            <Text style={styles.answerText}>{answer.content}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    gap: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  timer: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f2a44',
  },
  timerLow: {
    color: '#dc2626',
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0f172a',
    lineHeight: 30,
  },
  answers: {
    gap: 12,
  },
  answerButton: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#ffffff',
  },
  answerButtonPressed: {
    backgroundColor: '#f1f5f9',
  },
  answerText: {
    fontSize: 16,
    color: '#0f172a',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f2a44',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
  },
});
