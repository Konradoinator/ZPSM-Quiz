// screens/QuizScreen.tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { findTest } from '../data/tests.ts';
import type { HomeStackParamList } from '../navigation/types.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'Quiz'>;

export default function QuizScreen({ route }: Props) {
  const test = findTest(route.params.testId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{test ? test.name : 'Nieznany test'}</Text>
      <Text style={styles.subtitle}>ID testu: {route.params.testId}</Text>
      {test && (
        <Text style={styles.info}>
          {test.description} ({test.numberOfTasks} pytań)
        </Text>
      )}
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
    gap: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f2a44',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
  },
  info: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
});
