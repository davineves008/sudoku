import { router } from 'expo-router';
import { BackHandler, Platform, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuButton } from '@/components/menubutton';

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>
      <MenuButton label="Iniciar" onPress={() => router.push('/game')} />
      {Platform.OS === 'android' && (
        <MenuButton label="Sair" variant="secondary" onPress={() => BackHandler.exitApp()} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  title: { fontSize: 40, fontWeight: '800', marginBottom: 24 },
});