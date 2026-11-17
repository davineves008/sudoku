import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Board } from '@/components/board';
import { NumberPad } from '@/components/numberpad';
import { PauseMenu } from '@/components/pausemenu';
import { Grid, generatePuzzle } from '@/utils/suduku';

type Selected = { row: number; col: number } | null;

function createGame() {
  const { puzzle, solution } = generatePuzzle(40);
  return { puzzle, solution, board: puzzle.map((r) => [...r]) as Grid };
}

export default function GameScreen() {
  const [game, setGame] = useState(createGame);
  const [selected, setSelected] = useState<Selected>(null);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // timer: só conta quando não está pausado nem terminado
  useEffect(() => {
    if (paused || finished) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [paused, finished]);

  function setCell(value: number) {
    if (!selected || finished) return;
    const { row, col } = selected;
    if (game.puzzle[row][col] !== 0) return; // célula fixa

    const board = game.board.map((r) => [...r]);
    board[row][col] = value;
    setGame({ ...game, board });

    const won = board.every((r, i) => r.every((v, j) => v === game.solution[i][j]));
    if (won) setFinished(true);
  }

  function restart() {
    setGame(createGame());
    setSelected(null);
    setSeconds(0);
    setFinished(false);
    setPaused(false);
  }

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>{mm}:{ss}</Text>
        <Pressable onPress={() => setPaused(true)}>
          <Text style={styles.pause}>Pausar</Text>
        </Pressable>
      </View>

      {finished && <Text style={styles.win}>Parabéns! Você completou o Sudoku!</Text>}

      <Board
        board={game.board}
        puzzle={game.puzzle}
        solution={game.solution}
        selected={selected}
        onSelect={(row, col) => setSelected({ row, col })}
      />
      <NumberPad onNumber={setCell} onErase={() => setCell(0)} />

      <PauseMenu
        visible={paused}
        onResume={() => setPaused(false)}
        onRestart={restart}
        onQuit={() => router.replace('/')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 16 },
  header: { width: '100%', maxWidth: 450, flexDirection: 'row', justifyContent: 'space-between' },
  timer: { fontSize: 20, fontWeight: '700' },
  pause: { fontSize: 18, color: '#1d4ed8', fontWeight: '600' },
  win: { fontSize: 18, fontWeight: '700', color: '#16a34a' },
});