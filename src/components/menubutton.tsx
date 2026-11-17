import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export function MenuButton({ label, onPress, variant = 'primary' }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        primary ? styles.primary : styles.secondary,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Text style={[styles.text, !primary && styles.textSecondary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 240, padding: 14, borderRadius: 10, alignItems: 'center' },
  primary: { backgroundColor: '#1d4ed8' },
  secondary: { borderWidth: 1.5, borderColor: '#1d4ed8' },
  text: { color: '#fff', fontSize: 18, fontWeight: '700' },
  textSecondary: { color: '#1d4ed8' },
});