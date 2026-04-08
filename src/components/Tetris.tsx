import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  COLS, 
  ROWS, 
  createEmptyGrid, 
  randomTetromino, 
  checkCollision, 
  rotate, 
  Tetromino,
  TETROMINOS
} from '@/src/lib/tetris-engine';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, RotateCcw, ArrowLeft, ArrowRight, ArrowDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TetrisProps {
  onGameOver: (score: number) => void;
}

export const Tetris: React.FC<TetrisProps> = ({ onGameOver }) => {
  const [grid, setGrid] = useState<(number | string)[][]>(createEmptyGrid());
  const [activePiece, setActivePiece] = useState<{
    pos: { x: number; y: number };
    tetromino: Tetromino;
  } | null>(null);
  const [nextPiece, setNextPiece] = useState<Tetromino>(randomTetromino());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const dropCounterRef = useRef<number>(0);

  const spawnPiece = useCallback(() => {
    const piece = nextPiece;
    setNextPiece(randomTetromino());
    
    const pos = { x: Math.floor(COLS / 2) - Math.floor(piece.shape[0].length / 2), y: 0 };
    
    if (checkCollision(grid, piece, pos)) {
      setGameOver(true);
      onGameOver(score);
      return;
    }
    
    setActivePiece({ pos, tetromino: piece });
  }, [grid, nextPiece, onGameOver, score]);

  const mergePiece = useCallback(() => {
    if (!activePiece) return;
    
    const newGrid = grid.map(row => [...row]);
    activePiece.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const gridY = activePiece.pos.y + y;
          const gridX = activePiece.pos.x + x;
          if (gridY >= 0) {
            newGrid[gridY][gridX] = activePiece.tetromino.color;
          }
        }
      });
    });

    // Check for line clears
    let linesCleared = 0;
    const filteredGrid = newGrid.filter(row => {
      const isFull = row.every(cell => cell !== 0);
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (filteredGrid.length < ROWS) {
      filteredGrid.unshift(new Array(COLS).fill(0));
    }

    if (linesCleared > 0) {
      const linePoints = [0, 100, 300, 500, 800];
      const points = (linePoints[Math.min(linesCleared, 4)] || 800) * level;
      setScore(prev => prev + points);
      setLines(prev => {
        const newLines = prev + linesCleared;
        if (Math.floor(newLines / 10) > Math.floor(prev / 10)) {
          setLevel(l => l + 1);
        }
        return newLines;
      });
    }

    setGrid(filteredGrid);
    spawnPiece();
  }, [activePiece, grid, level, spawnPiece]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!activePiece || isPaused || gameOver) return false;
    
    const newPos = { x: activePiece.pos.x + dx, y: activePiece.pos.y + dy };
    if (!checkCollision(grid, activePiece.tetromino, newPos)) {
      setActivePiece(prev => prev ? { ...prev, pos: newPos } : null);
      return true;
    }
    
    if (dy > 0) {
      mergePiece();
    }
    return false;
  }, [activePiece, grid, isPaused, gameOver, mergePiece]);

  const rotatePiece = useCallback(() => {
    if (!activePiece || isPaused || gameOver) return;
    
    const rotatedShape = rotate(activePiece.tetromino.shape);
    const rotatedPiece = { ...activePiece.tetromino, shape: rotatedShape };
    
    // Wall kick attempt
    let offset = 0;
    while (checkCollision(grid, rotatedPiece, { x: activePiece.pos.x + offset, y: activePiece.pos.y })) {
      offset += offset > 0 ? -(offset + 1) : -(offset - 1);
      if (Math.abs(offset) > activePiece.tetromino.shape[0].length) {
        return; // Rotation not possible
      }
    }
    
    setActivePiece(prev => prev ? { 
      ...prev, 
      tetromino: rotatedPiece,
      pos: { ...prev.pos, x: prev.pos.x + offset }
    } : null);
  }, [activePiece, grid, isPaused, gameOver]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameOver) return;
    
    switch (e.key) {
      case 'ArrowLeft': movePiece(-1, 0); break;
      case 'ArrowRight': movePiece(1, 0); break;
      case 'ArrowDown': movePiece(0, 1); break;
      case 'ArrowUp': rotatePiece(); break;
      case ' ': 
        // Hard drop
        while (movePiece(0, 1));
        break;
      case 'p':
      case 'P':
        setIsPaused(prev => !prev);
        break;
    }
  }, [gameOver, movePiece, rotatePiece]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!activePiece && !gameOver) {
      spawnPiece();
    }
  }, [activePiece, gameOver, spawnPiece]);

  const dropInterval = Math.max(100, 1000 - (level - 1) * 100);

  const update = useCallback((time: number) => {
    if (isPaused || gameOver) return;
    
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    dropCounterRef.current += deltaTime;
    if (dropCounterRef.current > dropInterval) {
      movePiece(0, 1);
      dropCounterRef.current = 0;
    }
    
    gameLoopRef.current = requestAnimationFrame(update);
  }, [dropInterval, gameOver, isPaused, movePiece]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(update);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [update]);

  // Ghost piece calculation
  const getGhostPos = () => {
    if (!activePiece) return null;
    let ghostY = activePiece.pos.y;
    while (!checkCollision(grid, activePiece.tetromino, { x: activePiece.pos.x, y: ghostY + 1 })) {
      ghostY++;
    }
    return { x: activePiece.pos.x, y: ghostY };
  };

  const ghostPos = getGhostPos();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4 h-full">
      {/* Stats Panel */}
      <div className="flex flex-col gap-4 order-2 md:order-1">
        <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1">Score</p>
          <p className="text-3xl font-black italic">{score.toLocaleString()}</p>
        </div>
        <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-purple-400 text-xs font-mono uppercase tracking-widest mb-1">Level</p>
          <p className="text-3xl font-black italic">{level}</p>
        </div>
        <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-1">Lines</p>
          <p className="text-3xl font-black italic">{lines}</p>
        </div>
      </div>

      {/* Main Board */}
      <div className="relative bg-black/60 border-4 border-cyan-500/30 rounded-lg p-1 shadow-[0_0_50px_rgba(34,211,238,0.1)] order-1 md:order-2">
        <div 
          className="grid gap-px bg-white/5"
          style={{ 
            gridTemplateColumns: `repeat(${COLS}, 1.5rem)`,
            gridTemplateRows: `repeat(${ROWS}, 1.5rem)`
          }}
        >
          {grid.map((row, y) => 
            row.map((cell, x) => {
              let color = cell !== 0 ? (cell as string) : 'transparent';
              let isGhost = false;
              let isPiece = false;
              let glow = 'none';

              // Check if active piece is here
              if (activePiece) {
                const pieceY = y - activePiece.pos.y;
                const pieceX = x - activePiece.pos.x;
                if (
                  pieceY >= 0 && pieceY < activePiece.tetromino.shape.length &&
                  pieceX >= 0 && pieceX < activePiece.tetromino.shape[0].length &&
                  activePiece.tetromino.shape[pieceY][pieceX] !== 0
                ) {
                  color = activePiece.tetromino.color;
                  glow = `0 0 10px ${activePiece.tetromino.glowColor}`;
                  isPiece = true;
                }
              }

              // Check if ghost piece is here
              if (!isPiece && ghostPos) {
                const ghostY = y - ghostPos.y;
                const ghostX = x - ghostPos.x;
                if (
                  ghostY >= 0 && ghostY < activePiece!.tetromino.shape.length &&
                  ghostX >= 0 && ghostX < activePiece!.tetromino.shape[0].length &&
                  activePiece!.tetromino.shape[ghostY][ghostX] !== 0
                ) {
                  color = 'rgba(255, 255, 255, 0.1)';
                  isGhost = true;
                }
              }

              return (
                <div 
                  key={`${x}-${y}`}
                  className="w-6 h-6 rounded-sm transition-colors duration-100"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: glow,
                    border: cell !== 0 || isPiece ? '1px solid rgba(255,255,255,0.2)' : 'none'
                  }}
                />
              );
            })
          )}
        </div>

        {/* Pause Overlay */}
        <AnimatePresence>
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg"
            >
              <h2 className="text-4xl font-black italic text-cyan-400 mb-6">PAUSED</h2>
              <Button 
                size="lg" 
                className="bg-cyan-600 hover:bg-cyan-500"
                onClick={() => setIsPaused(false)}
              >
                <Play className="mr-2" /> RESUME
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Piece & Controls */}
      <div className="flex flex-col gap-6 order-3">
        <div className="bg-black/40 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">Next Piece</p>
          <div 
            className="grid gap-px"
            style={{ 
              gridTemplateColumns: 'repeat(4, 1.25rem)',
              gridTemplateRows: 'repeat(4, 1.25rem)'
            }}
          >
            {[0, 1, 2, 3].map(y => 
              [0, 1, 2, 3].map(x => {
                const isPiece = y < nextPiece.shape.length && x < nextPiece.shape[0].length && nextPiece.shape[y][x] !== 0;
                return (
                  <div 
                    key={`next-${x}-${y}`}
                    className="w-5 h-5 rounded-sm"
                    style={{ 
                      backgroundColor: isPiece ? nextPiece.color : 'transparent',
                      boxShadow: isPiece ? `0 0 10px ${nextPiece.glowColor}` : 'none',
                      border: isPiece ? '1px solid rgba(255,255,255,0.2)' : 'none'
                    }}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="border-white/10" onClick={() => movePiece(-1, 0)}><ArrowLeft /></Button>
          <Button variant="outline" className="border-white/10" onClick={() => rotatePiece()}><RotateCw /></Button>
          <Button variant="outline" className="border-white/10" onClick={() => movePiece(1, 0)}><ArrowRight /></Button>
          <div />
          <Button variant="outline" className="border-white/10" onClick={() => movePiece(0, 1)}><ArrowDown /></Button>
          <div />
        </div>

        <Button 
          variant="ghost" 
          className="text-white/40 hover:text-white"
          onClick={() => setIsPaused(prev => !prev)}
        >
          {isPaused ? <Play className="mr-2" /> : <Pause className="mr-2" />}
          {isPaused ? 'RESUME' : 'PAUSE'}
        </Button>
      </div>
    </div>
  );
};
