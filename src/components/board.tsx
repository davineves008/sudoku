import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Cell } from '@/components/cell';
import { Grid } from '@/utils/suduku';

type Props = {
  board: Grid;
  puzzle: Grid;
  solution: Grid;
  selected: { row: number; col: number } | null;
  onSelect: (row: number, col: number) => void;
};

export function Board({ board, puzzle, solution, selected, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const size = Math.min(width - 32, 450) / 9;

  return (
    <View style={styles.board}>
      {board.map((rowValues, r) => (
        <View key={r} style={styles.row}>
          {rowValues.map((value, c) => {
            const isSelected = selected?.row === r && selected?.col === c;
            const isRelated =
              !!selected &&
              !isSelected &&
              (selected.row === r ||
                selected.col === c ||
                (Math.floor(selected.row / 3) === Math.floor(r / 3) &&
                  Math.floor(selected.col / 3) === Math.floor(c / 3)));

            return (
              <Cell
                key={c}
                value={value}
                row={r}
                col={c}
                size={size}
                isGiven={puzzle[r][c] !== 0}
                isSelected={isSelected}
                isRelated={isRelated}
                isError={value !== 0 && value !== solution[r][c]}
                onPress={() => onSelect(r, c)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { borderWidth: 2, borderColor: '#333' },
  row: { flexDirection: 'row' },
});