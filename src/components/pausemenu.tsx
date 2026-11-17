import { Modal, StyleSheet, Text, View } from 'react-native';
import { MenuButton } from './menubutton';

type Props = {
  visible: boolean;
  onResume: () => void;
  onRestart: () => void;
  onQuit: () => void;
};

export function PauseMenu({ visible, onResume, onRestart, onQuit }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onResume}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Pausado</Text>
          <MenuButton label="Continuar" onPress={onResume} />
          <MenuButton label="Novo jogo" variant="secondary" onPress={onRestart} />
          <MenuButton label="Menu principal" variant="secondary" onPress={onQuit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)', // esconde o tabuleiro durante a pausa
  },
  card: { alignItems: 'center', gap: 14, padding: 24, borderRadius: 16, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 6 },
});