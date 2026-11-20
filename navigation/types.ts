// navigation/types.ts
import type {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

// Ekrany w stosie: jeden nad drugim, z przyciskiem Wstecz między nimi.
export type HomeStackParamList = {
  Home: undefined;
  Quiz: { testId: string };
};

// Główne działy dostępne z szuflady (Drawer).
export type RootDrawerParamList = {
  Main: NavigatorScreenParams<HomeStackParamList>;
  Results: undefined;
};

// Typ nawigacji dla ekranu wewnątrz stosu (widzi trasy stosu i szuflady).
export type HomeNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  DrawerNavigationProp<RootDrawerParamList>
>;

// Globalne typowanie useNavigation() dla najwyższego poziomu.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamList {}
  }
}
