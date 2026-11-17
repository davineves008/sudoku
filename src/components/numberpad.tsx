import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onNumber: (num: number) => void;
  onErase: () => void;
};

export function NumberPad({ onNumber, onErase }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Pressable key={n} style={styles.button} onPress={() => onNumber(n)}>
            <Text style={styles.buttonText}>{n}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.erase} onPress={onErase}>
        <Text style={styles.eraseText}>Apagar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 450, gap: 12 },
  row: { flexDirection: 'row', gap: 4 },
  button: {
    flex: 1,
    aspectRatio: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  erase: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#999',
  },
  eraseText: { fontSize: 16 },
});