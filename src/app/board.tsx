import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  value: number;
  row: number;
  col: number;
  size: number;
  isGiven: boolean;
  isSelected: boolean;
  isRelated: boolean;
  isError: boolean;
  onPress: () => void;
};

export function Cell({ value, row, col, size, isGiven, isSelected, isRelated, isError, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRightWidth: col % 3 === 2 && col !== 8 ? 2 : StyleSheet.hairlineWidth,
          borderBottomWidth: row % 3 === 2 && row !== 8 ? 2 : StyleSheet.hairlineWidth,
        },
        isRelated && styles.related,
        isSelected && styles.selected,
      ]}
    >
      <Text
        style={[
          { fontSize: size * 0.55 },
          isGiven ? styles.given : styles.user,
          isError && styles.error,
        ]}
      >
        {value !== 0 ? value : ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#333',
    backgroundColor: '#fff',
  },
  related: { backgroundColor: '#eef3fb' },
  selected: { backgroundColor: '#bcd4f6' },
  given: { color: '#111', fontWeight: '700' },
  user: { color: '#1d4ed8' },
  error: { color: '#dc2626' },
});