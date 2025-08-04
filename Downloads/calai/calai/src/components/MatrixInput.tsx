
import React from 'react';
import { Input } from '@/components/ui/input';

interface MatrixInputProps {
  matrix: number[][];
  setMatrix: (matrix: number[][]) => void;
  rows: number;
  cols: number;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, setMatrix, rows, cols }) => {
  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row, i) =>
      i === rowIndex
        ? row.map((col, j) => (j === colIndex ? Number(value) || 0 : col))
        : row
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="grid gap-2 p-4 bg-muted rounded-lg">
      {Array(rows)
        .fill(0)
        .map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {Array(cols)
              .fill(0)
              .map((_, colIndex) => (
                <Input
                  key={colIndex}
                  type="number"
                  value={matrix[rowIndex]?.[colIndex] || 0}
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
                  onKeyDown={(e) => {
                    // Allow numpad input
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const nextInput = e.currentTarget.parentElement?.parentElement?.nextElementSibling?.children[colIndex]?.children[0] as HTMLInputElement;
                      if (nextInput) {
                        nextInput.focus();
                      }
                    }
                  }}
                  className="w-16 h-16 text-center"
                  inputMode="decimal"
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default MatrixInput;

