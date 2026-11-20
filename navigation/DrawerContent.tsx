// navigation/DrawerContent.tsx
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { StyleSheet, Text } from 'react-native';
import { TESTS } from '../data/tests.ts';

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Dwa ekrany zadeklarowane w Drawer.Navigator */}
      <DrawerItemList {...props} />

      <Text style={styles.sectionHeader}>Testy</Text>

      {TESTS.map((test) => (
        <DrawerItem
          key={test.id}
          label={test.name}
          onPress={() =>
            props.navigation.navigate('Main', {
              screen: 'Quiz',
              params: { testId: test.id },
            })
          }
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 18,
  },
});
