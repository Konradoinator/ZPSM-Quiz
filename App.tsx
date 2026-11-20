// App.tsx
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator.tsx';
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import { acceptTerms, hasAcceptedTerms } from './storage/storage.ts';

export default function App() {
  // Trzy stany: null (wczytywanie), false (nie zaakceptowano), true (zaakceptowano)
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    hasAcceptedTerms()
      .then((value) => setAccepted(value === true))
      .catch(() => setAccepted(false));
  }, []);

  async function handleAccept(): Promise<void> {
    await acceptTerms();
    setAccepted(true);
  }

  if (accepted === null) {
    return (
      <SafeAreaProvider>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0f2a44" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (!accepted) {
    return (
      <SafeAreaProvider>
        <WelcomeScreen onAccept={handleAccept} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
