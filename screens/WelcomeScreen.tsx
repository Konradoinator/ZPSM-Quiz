// screens/WelcomeScreen.tsx
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type WelcomeScreenProps = {
  onAccept: () => void;
};

export default function WelcomeScreen({ onAccept }: WelcomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Zanim zaczniemy</Text>
        <Text style={styles.body}>
          Aplikacja przechowuje wyniki quizów wyłącznie na tym urządzeniu.
          Wynik zawiera podany pseudonim, liczbę punktów i nazwę testu.
        </Text>
        <Text style={styles.note}>
          Ten ekran pojawia się tylko przy pierwszym uruchomieniu.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onAccept}
      >
        <Text style={styles.buttonText}>Akceptuję</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f2a44',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  note: {
    fontSize: 14,
    color: '#64748b',
  },
  button: {
    backgroundColor: '#0f2a44',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
