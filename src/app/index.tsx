import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NumberPad } from '@/src/NumberPad';
import { Grid, generatePuzzle } from '@/utils/sudoku';
import { Board } from 'src/Board';

type Selected = { row: number; col: number } | null;

function createGame() {
  const { puzzle, solution } = generatePuzzle(40);
  return { puzzle, solution, board: puzzle.map((r) => [...r]) as Grid };
}

export default function HomeScreen() {
  const [game, setGame] = useState(createGame);
  const [selected, setSelected] = useState<Selected>(null);

  function setCell(value: number) {
    if (!selected) return;
    const { row, col } = selected;
    if (game.puzzle[row][col] !== 0) return; // célula fixa

    const board = game.board.map((r) => [...r]);
    board[row][col] = value;
    setGame({ ...game, board });

    const won = board.every((r, i) => r.every((v, j) => v === game.solution[i][j]));
    if (won) Alert.alert('Parabéns!', 'Você completou o Sudoku!');
  }

  function restart() {
    setGame(createGame());
    setSelected(null);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>
      <Board
        board={game.board}
        puzzle={game.puzzle}
        solution={game.solution}
        selected={selected}
        onSelect={(row, col) => setSelected({ row, col })}
      />
      <NumberPad onNumber={setCell} onErase={() => setCell(0)} />
      <Pressable onPress={restart}>
        <Text style={styles.newGame}>Novo jogo</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 16 },
  title: { fontSize: 28, fontWeight: '800' },
  newGame: { fontSize: 16, color: '#1d4ed8', fontWeight: '600' },
});