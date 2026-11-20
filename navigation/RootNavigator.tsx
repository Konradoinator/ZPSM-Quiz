// navigation/RootNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen.tsx';
import QuizScreen from '../screens/QuizScreen.tsx';
import ResultsScreen from '../screens/ResultsScreen.tsx';
import type { HomeStackParamList, RootDrawerParamList } from './types.ts';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ title: 'Test' }}
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={HomeStack}
        options={{ title: 'Ekran główny' }}
      />
      <Drawer.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Wyniki' }}
      />
    </Drawer.Navigator>
  );
}
