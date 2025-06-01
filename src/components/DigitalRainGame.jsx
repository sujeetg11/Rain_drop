import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useMemo } from 'react';

const FallingRainMatrix = () => {
  const [grid, setGrid] = useState([]);
  const [rainDrops, setRainDrops] = useState([]);
  const intervalRef = useRef(null);
  
  // Fixed configuration
  const gridSize = { width: 20, height: 15 };
  const speed = 100;
  const intensity = 0.15;

  // Rain colors
  const rainColors = useMemo(() => [
    '#FF00FF',
    '#FF44FF',
    '#CC00CC',
    '#AA00AA',
    '#8800FF',
    '#BB00BB',
    '#9900CC',
  ], []);

  // Initialize empty grid
  const initializeGrid = useCallback(() => {
    const newGrid = Array(gridSize.height).fill(null).map(() =>
      Array(gridSize.width).fill(null).map(() => ({
        active: false,
        color: '#1a1a1a',
        intensity: 0,
        age: 0
      }))
    );
    setGrid(newGrid);
    setRainDrops([]);
  }, [gridSize.height,gridSize.width]);

  // Create new rain column
  const createRainColumn = useCallback(() => {
    const col = Math.floor(Math.random() * gridSize.width);
    const color = rainColors[Math.floor(Math.random() * rainColors.length)];
    const length = Math.floor(Math.random() * 8) + 3;
    
    return {
      id: Date.now() + Math.random(),
      col: col,
      row: -length,
      length: length,
      color: color,
      speed: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5
    };
  }, [rainColors, gridSize.width]);

  // Update rain animation
  const updateRain = useCallback(() => {
    setRainDrops(prevDrops => {
      let newDrops = [...prevDrops];
      
      // Add new rain drops based on intensity
      if (Math.random() < intensity) {
        newDrops.push(createRainColumn());
      }

      // Move existing drops and filter out completed ones
      newDrops = newDrops.map(drop => ({
        ...drop,
        row: drop.row + drop.speed
      })).filter(drop => drop.row < gridSize.height + drop.length);

      // Update grid based on current drops
      setGrid(prevGrid => {
        const newGrid = prevGrid.map(row => 
          row.map(cell => ({ ...cell, active: false, intensity: 0 }))
        );

        newDrops.forEach(drop => {
          for (let i = 0; i < drop.length; i++) {
            const currentRow = Math.floor(drop.row - i);
            if (currentRow >= 0 && currentRow < gridSize.height) {
              const intensity = (drop.length - i) / drop.length;
              newGrid[currentRow][drop.col] = {
                active: true,
                color: drop.color,
                intensity: intensity * drop.opacity,
                age: i
              };
            }
          }
        });

        return newGrid;
      });

      return newDrops;
    });
  }, [createRainColumn,gridSize.height]);

  useEffect(() => {
    intervalRef.current = setInterval(updateRain, speed);
    return () => clearInterval(intervalRef.current);
  }, [updateRain]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const getCellStyle = (cell) => {
    if (!cell.active) {
      return {
        backgroundColor: '#0a0a0a',
        border: '1px solid #333',
        boxShadow: 'inset 0 0 3px rgba(255,255,255,0.1)'
      };
    }

    const opacity = cell.intensity;
    return {
      backgroundColor: cell.color,
      border: `1px solid ${cell.color}`,
      opacity: opacity,
      boxShadow: `0 0 ${4 + opacity * 6}px ${cell.color}, inset 0 0 3px rgba(255,255,255,0.3)`,
      transition: 'all 0.1s ease'
    };
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    grid: {
      display: 'grid',
      gap: '1px',
      padding: '25px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      borderRadius: '15px',
      border: '2px solid rgba(139, 92, 246, 0.3)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
      gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`
    },
    cell: {
      width: '20px',
      height: '20px',
      borderRadius: '3px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{...styles.cell, ...getCellStyle(cell)}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FallingRainMatrix;

