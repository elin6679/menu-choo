/**
 * Tetris Engine Logic
 */

export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  color: string;
  glowColor: string;
}

export const TETROMINOS: Record<TetrominoType, Tetromino> = {
  I: {
    type: 'I',
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: '#22d3ee', // cyan-400
    glowColor: 'rgba(34, 211, 238, 0.5)',
  },
  J: {
    type: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#3b82f6', // blue-500
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  L: {
    type: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#f97316', // orange-500
    glowColor: 'rgba(249, 115, 22, 0.5)',
  },
  O: {
    type: 'O',
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: '#eab308', // yellow-500
    glowColor: 'rgba(234, 179, 8, 0.5)',
  },
  S: {
    type: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: '#22c55e', // green-500
    glowColor: 'rgba(34, 197, 94, 0.5)',
  },
  T: {
    type: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: '#a855f7', // purple-500
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  Z: {
    type: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: '#ef4444', // red-500
    glowColor: 'rgba(239, 68, 68, 0.5)',
  },
};

export const randomTetromino = (): Tetromino => {
  const types: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const type = types[Math.floor(Math.random() * types.length)];
  return TETROMINOS[type];
};

export const COLS = 10;
export const ROWS = 20;

export const createEmptyGrid = () => 
  new Array(ROWS).fill(null).map(() => new Array(COLS).fill(0));

export const checkCollision = (
  grid: (number | string)[][],
  tetromino: Tetromino,
  pos: { x: number; y: number }
): boolean => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newX = pos.x + x;
        const newY = pos.y + y;

        if (
          newX < 0 || 
          newX >= COLS || 
          newY >= ROWS ||
          (newY >= 0 && grid[newY][newX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const rotate = (matrix: number[][]): number[][] => {
  const rotated = matrix[0].map((_, index) =>
    matrix.map(col => col[index]).reverse()
  );
  return rotated;
};
