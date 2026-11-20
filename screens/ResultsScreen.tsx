// screens/ResultsScreen.tsx
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { Result } from '../data/results.ts';
import { getResults } from '../storage/storage.ts';

function ResultRow({ result }: { result: Result }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Text style={styles.nick}>{result.nick}</Text>
        <Text style={styles.meta}>
          {result.type} · {result.date}
        </Text>
      </View>
      <Text style={styles.score}>
        {result.score}/{result.total}
      </Text>
    </View>
  );
}

export default function ResultsScreen() {
  const [results, setResults] = useState<Result[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const data = await getResults();
    setResults(data);
  }, []);

  // Wczytanie wyników przy każdym wejściu na ekran
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  // RefreshControl sam niczego nie odświeża - finally gwarantuje schowanie kółka
  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={
        results.length === 0 ? styles.emptyContainer : styles.listContent
      }
      data={results}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>Nie ma jeszcze żadnych wyników.</Text>
      }
      renderItem={({ item }) => <ResultRow result={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    gap: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
  },
  row: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    gap: 4,
    flex: 1,
  },
  nick: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f2a44',
  },
  meta: {
    fontSize: 13,
    color: '#64748b',
  },
  score: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f2a44',
    marginLeft: 12,
  },
});
